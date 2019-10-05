---

type: "post"
title: "MapReduce in Python With Dramatiq And Docker - in Less Than 50 Lines!"
date: "2019-10-04"
postImage: "./img/fiddleLeafFig.jpg"
slug: "/blog/batch-processing-python-mapreduce-docker"
metaDescription: "Using a similar process to MapReduce, it's possible to speed up batch Python dramatically- and it's easier than you think!"

---

Lots of great, high-power tools already exist for working with massive batch jobs, such as Hadoop and Apache Spark. However, maybe you're like me and want to use just plain Python for a few batch jobs, and don't want to stand up a whole Spark cluster for a side project. If that sounds familiar, this blog post is for you.

In this post, I am using a pre-trained machine model from [spacy](https://spacy.io/) in combination with [Dramatiq](https://dramatiq.io) to create a distributed, machine learning batch job system. The best part is it's dead simple and less than 50 lines of code.

Photo by [@bellehunt](https://unsplash.com/@bellehunt) on Unsplash.

## Okay Maddie, but Why?

Most machine learning workloads are CPU (or GPU) bound, so you quickly hit bottlenecks on one machine. Thankfully, like a lot of other expensive computations, you can break up a huge job into reasonable jobs, and send them out to different machines for processing. Later, you gather the results and work with them further.

This is the idea behind [MapReduce](https://en.wikipedia.org/wiki/MapReduce), and it's great for an expensive task that can be run in parallel. You skirt around CPU limitations by fanning out to multiple machines. A lot of MapReduce implementations rely on sprawling, multi-machine tools like Hadoop or Spark that can be expensive and time consuming to set up. For small teams or solo devs, this can be a deal breaker.

However, the concept behind MapReduce _doesn't_ require complicated infrastructure. In fact, you can get a functional distributed computing system for batch jobs up and running with a couple containers and less than 50 lines of Python code. Sounds great right?

## Adding Some Drama(tiq)

Consider the following code using `spacy`. In this sample, we take a pre-trained model and extract all entities of the type `PERSON`. On it's own, this doesn't take too long, but we'll quickly hit performance issues on lots of paragraphs.

```python
nlp = spacy.load("en_core_web_sm")


def extract_ents(paragraph: str):
    """Extract entities from the paragraph."""
    doc = nlp(paragraph)
    ents = []
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            ents.append(ent.text)
    return ents
```

Like almost every other problem in Python, there's a library for that. [Dramatiq](https://dramatiq.io/) allows us to turn our function into an _actor_, a task executed on another machine asynchronously. Isn't the Python ecosystem magical? ✨

Using Dramatiq is as easy as adding the `@dramatiq.actor` decorator:

```python
@dramatiq.actor(store_results=True)
def extract_ents(paragraph: str):
    # ...snip
```

Now we can run a whole group of these at once and collect the results:


```python
group = dramatiq.group([
    extract_ents.message("hello Maddie"),
    extract_ents.message("hello Madelyn"),
]).run()

results = group.get_results(block=True, timeout=10_000)
```

That's the core of the code! Everything else is connection settings and setup for the batch job. The full source is on [Github](https://github.com/madelyneriksen/dramatiq-batch-jobs-python/blob/master/app.py) for your reading enjoyment.

To process in parallel, we just need to spawn more Docker containers on a cluster of multiple machines. It's that fast. 🚀

## Wait, What About...

In a real batch job in a data pipeline, you'd handle node failures, non-responsive actors, and a myriad of other problems. Distributed computing is packed full of potential pitfalls when done at great scale.

However, if you only need parallel processing on many machines, and your code is _already_ Python code, it might be good enough. There's no need to prematurely optimize by choosing a heavyweight solution like Spark if you can get the job done a simpler way. You might even have success writing your own batch job system using Redis or RabbitMQ directly!

Relying on Docker, Redis, and Python also makes this solution a lot more compatible with existing stacks. It's trivial to stand up Dramatiq workers on an existing Kubernetes or Nomad cluster.

## Additional Resources

* [The Source on Github](https://github.com/madelyneriksen/dramatiq-batch-jobs-python/), including the Docker container and a `compose` file.
* [Dramatiq](https://dramatiq.io), the actor system used.
* [Spacy](https://spacy.io), the NLP toolkit used in this post.

Thanks for reading! I hope you enjoyed this short blog post. If you have any thoughts, corrections, or comments, please feel free to [contact me](/contact) and let me know what you think!
