---

type: 'post'
title: "A Lazy Girl's Guide to Python's Multiprocessing"
category: "tutorial"
date: "2021-04-03"
slug: "/blog/simple-concurrency-python-multiprocessing"
postImage: null
metaDescription: "A few code snippets to easily turn single-threaded Python code into concurrent Python code."

---

I write a lot of Python code in my day to day life to help me with things I need to get done. Looking up data, scraping web pages, basic number crunching, or anything else. Well, I'm also impatient and don't like waiting. Here's a quick tip with some code snippets you can use to speed up synchronous Python code using the `multiprocessing` library.

## IO Bound Code

When you're waiting on IO (Input and Output) in your programs, some of your best options (in the Python standard library) are threads or asyncio. However, asyncio usually requires you to rewrite your code to some degree to leverage things like coroutines, and I don't use `threading` in one-off scripts. So I like using `multiprocessing.dummy`:

```python
import multiprocessing.dummy as mp
import requests

sites = ["https://example.com", ...]

def fetch(url: str):  # Or what have you
    return requests.get(url)

with mp.Pool(16) as pool:
    results = [x for x in pool.imap_unordered(func, sites, chunksize=16)
```

Unlike its process-based cousin, `multiprocessing.dummy` uses threads. In Python, threads are great for IO bound tasks, like waiting on network. You can also just wrap the entire setup we did above into its own generator function like I did for my package [Topix](https://github.com/madelyneriksen/topix). Here's an example of how you'd do that:

```python
import multiprocessing.dummy as mp
import typing as t

T = t.TypeVar("T")
A = t.TypeVar("A")

def concurrently(fn: t.Callable[[T], A], iterable: t.Iterator[T], threads: int = 4) -> t.Iterator[A]:
    """Concurrently map `fn` to an `iterable`.

    Example Usage:
    >>> import requests
    >>> urls = ["https://www.madelyneriksen.com"] * 16
    >>> results = concurrently(requests.get, urls)

    Arguments:
        fn: Function to apply concurrently.
        iterable: Iterator to move through.
    Keyword Arguments:
        threads: Number of threads to use. Also sets chunksize to a corresponding amount.
    Returns:
        Iterable of the function's output.
    """
    with mp.Pool(threads) as p:
        yield from p.imap_unordered(fn, iterable, chunksize=threads)
```

I use a function like this _a lot_ in random one-off scripts or even in production at work, because frankly it's good enough in most cases. Usually I'll just use `map` and compose more functions on top of the IO heavy part to do whatever processing of the results I need.

You can drop that into a script you're writing and then do whatever IO-heavy thing you're doing faster. Set the number of threads to _roughly_ the number of CPUs you have. Just don't do anything too CPU heavy in a thread, because the GIL will get in your way.

## CPU Bound Code

You can adapt the above code by using the process based pool from `multiprocessing` (note the lack of `dummy`) to work OK for CPU bound code. However, if you're CPU bound and need better performance... Python might not be the language for the task at hand. Either try a library that wraps some code in another language (ex. `numpy` and `pandas`) or just pick up and use a language like Rust for this one task.
