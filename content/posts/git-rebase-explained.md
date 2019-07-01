---
type: "post"
title: "Git Rebase Demystified- Explained for Beginners"
postImage: ./img/trevor-wilson--canyon-unsplash.jpg
slug: /blog/git-rebase-explained-for-beginners
date: 2019-07-01
category: tutorial
metaDescription: Git rebase is a command that seems complicated at first, but is a great and easy way to keep a clean commit history without merges.
---

If you're like me, you're a fan of "trunk based" git repos with lots of small branches for individual features. This is a great way to work, but if you use traditional merges, soon there are hundreds of irrelevant merge commits in the `main` branch.

While at first `rebase` can seem daunting, it's a great way to "merge" in changes from small feature branches. It's also easy to use, even if you're new to git!

This is a quick tutorial covering `rebase` that I hope you'll find helpful!

_Photo by Trevor Wilson on Unsplash_

## What the Heck is a Rebase, Anyways?

While a traditional `merge` of a branch pushes changes into another branch with a merge commit, a `rebase` actually _reapplies_ the commits on top of a different branch.

This might sound convoluted, but think of it as changing whenever you checked out from `master` to how `master` looks now. All your changes in your development branch get applied _on top of_ the current `HEAD` in `master`. It's almost like rewriting history!

You also _do not_ need to use `--force` when pushing, even though you are rewriting history. More on that in a minute.

## So How Do I Rebase?

You don't have to do anything fancy to use `rebase`- your regular branch-based workflow will be just fine!

```bash
git checkout -b my-branch
# Hack Hack Hack...
git commit -m "Added a slick new feature."
```

It's `git` as usual.

When your changes are ready to be merged, you `rebase` `master` into your development branch. Don't `rebase` your branch into `master`, that leads to nothing but frustration. 😉

```bash
# On my-branch, rebasing with master in interactive mode
git rebase -i master
```

This converts your branch to be based on the latest commit in `master`, which means you can `merge` into `master` with a fast forward merge (so no merge commit).

```bash
git checkout master
git merge --ff-only my-branch
```

A fast-forward merge is why you rebase your branch on top of the current `master`: if you went the opposite way, the history of the `master` branch would change. This breaks the repo for everyone else who's checked out anre requires a `--force` to push- not good at all.

And that's it! Congrats! Your git commit history is super clean. 🎉

## There's Conflicts and Everything Is Backwards!

If your branch and `master` both change the same file, don't worry! You can resolve conflicts in a similar way to traditional merging.

Due to a quirk of how `rebase` works, it's important to know that `--ours` and `--theirs` are _reversed_ when you use `rebase` this way. That is, `--ours` checks out from `master`, and `--theirs` checks out from your branch.

```bash
# Keeps changes in the development branch.
git checkout --theirs somefile.txt

# Keeps changes in master
git checkout --ours someotherfile.txt
```

It's counterintuitive, but easy to remember after you know what's going on!

## That's It?

That's the basics! I hope that if you have never tried `rebase` before, you'll check it out now. Even if you don't adopt it for all your repositories, it is a handy trick for experimenting with features on other branches.

Plus Github has a "rebase and merge" button now, so really, it can't be that hard to use can it?

Thanks for reading! See you around!
