---

type: "post"
title: "Vagrant Multimachine With Ansible"
category: "tutorial"
date: "2019-03-22"
slug: "/blog/vagrant-ansible-multimachine-setup"
postImage: "./img/green-houseplants.jpg"
metaDescription: "Vagrant Multimachine? Cooperating with Ansible? It's more likely than you think."

---

_Alternative title: How to stop `ansible.limit` and enjoy parallel provisioning._

I use Vagrant and Ansible together almost every day for creating quick development environments. It's a really powerful combo, but Vagrant with Virtualbox does not support parallel provisioning.

Basically, if you don't optimize anything, it's _painfully_ slow to make multimachine environments. Here's a couple tricks to use parallel Ansible provisioning with Virtualbox!

## Setting Up the Vagrantfile

Recently, I've been using Multimachine to provision a local Kubernetes cluster using `kubeadm` for experimenting and hacking on. The same techniques will work if you're just creating, say, a web and database server.

Regardless of what you are building, your starter Vagrantfile probably looks something like this:


```ruby
# Vagrantfile

Vagrant.configure("2") do |config|
  config.vm.box = 'ubuntu/bionic64'
  config.vm.define :master do |master|
    master.vm.network = "private_network", ip: "192.168.10.33"
    master.vm.hostname = "k8s-master"
  end
  config.vm.define :node do |node|
    node.vm.network = "private_network", ip: "192.168.10.34"
    node.vm.hostname = "k8s-node"
  end
end
```

We have two machines here set up on a private network, both based on the `ubuntu/bionic64` image. Running `vagrant up` at this point will spin them both up, but we haven't included Ansible yet. Thankfully, just adding Ansible is pretty easy!

## Adding Ansible

Your project directory can be arranged however you'd like. Mine usually looks like this for starters:

```
.
├── ansible
│   ├── playbook.yml
│   └── roles
│       └── base
│           └── tasks
│               └── main.yml
└── Vagrantfile

5 directories, 4 files
```

Now we have to make some edits to the Vagrantfile, and this is where it gets interesting.

Vagrant does a fair bit of magic to create Ansible host files, build groups for all machines, and run the provisioner on only the active machine. With a single node setup, this magic does the right thing... and on multiple machines it runs them all in series.

We can tell Vagrant to do the right thing, however (with a little bit of a hack):

```ruby
# Vagrantfile

Vagrant.configure("2") do |config|
  config.vm.box = 'ubuntu/bionic64'
  config.vm.define :master do |master|
    master.vm.network = "private_network", ip: "192.168.10.33"
    master.vm.hostname = "k8s-master"

    # Here's our counterspell for Vagrant's magic
    master.vm.provision :k8s, type: "ansible", run: "never" do |ansible|
      ansible.compatibility_mode = "2.0"
      ansible.limit = "all"
      ansible.extra_vars = { ansible_python_interpreter:"/usr/bin/python3" }
      ansible.playbook = "ansible/playbook.yml"
    end
  end
  config.vm.define :node do |node|
    node.vm.network = "private_network", ip: "192.168.10.34"
    node.vm.hostname = "k8s-node"
  end
end
```

We've added a _named_ provisioner for creating Kubernetes clusters. By setting `ansible.limit` to `all`, Vagrant does the right thing and provisions _all_ the machines from the auto generated hosts file.

This provisioner is using `run: "never"` because we want to wait for all machines to be up. Once all machines are active from `vagrant up`, you can provision them all at once with `vagrant provision --provision-with k8s`. Cool right?

Finally, the provisioner is put in the master node because if it was placed in the top level, it would run _multiple times_, and that's probably not what anyone wants.

## Using Ansible Groups

More than likely you need to run different provisioning steps for each machine. Adding Ansible groups into our Vagrantfile is straightforward:

```ruby
# Modify your ansible provisioner
master.vm.provision :k8s, type: "ansible", run: "never" do |ansible|
  ansible.compatibility_mode = "2.0"
  ansible.limit = "all"
  ansible.extra_vars = { ansible_python_interpreter:"/usr/bin/python3" }

  # Groups here
  ansible.groups = {
    "masters" => ["master"],
    "workers" => ["node"],
  }
  ansible.playbook = "ansible/playbook.yml"
end
```

Now you can group your tasks in Ansible, just like you would in a regular playbook!

```yaml
---
# ansible/playbook.yml

- name: Stuff for All Machines
  hosts: all
  remote_user: vagrant
  tasks:
    - base

- name: Stuff for Master Machines
  hosts: masters
  remote_user: vagrant
  tasks:
    - master
```

You're all set up! Just to recap, to create your machines, run:

```bash
vagrant up
vagrant provision --provision-with ansible
```

Ansible will run in parallel on all of your machines, just like it's designed to.

## Conclusions and Further Reading

There is a lot of information around the web on using Ansible and Vagrant effectively:

* [The Ansible Documentation](https://docs.ansible.com/) is comprehensive and useful when writing new playbooks.
* [The Vagrant Documentation](https://www.vagrantup.com/docs/provisioning/ansible.html) has a section on Vagrant-Ansible specifc options and tips for effective usage.
* And if you've never used Vagrant, [there is a great guide](https://www.vagrantup.com/intro/getting-started/index.html) at the documentation too.

I hope you found this quick tip helpful! Please feel free to [contact me](/contact) if you have any questions or feedback!
