---

type: "post"
title: "Testing External Resources With unittest.mock in Python"
category: "tutorial"
date: "2019-05-06"
slug: "/blog/python-unittest-mocking-tutorial"
postImage: "./img/joshua-tree.jpg"
metaDescription: "The death of all test doubles? Not always, but unittest.mock is a flexible tool that will help you write better tests."

---

Python has an amazing community built around testing, with libraries like [pytest](https://docs.pytest.org/en/latest/) or [hypothesis](https://hypothesis.readthedocs.io/en/latest/) complimenting the standard library. However, I have met a few Python programmers who've never used `unittest.mock` for their tests, even though it's built right into the language.

This serves as a quick introduction to using mocks for external resources aimed at beginners. In my examples, I will be using `pytest` style tests. Of course, `mock` also works with `unittest` style class based tests!

_Photo by [@elliotengelmann](https://unsplash.com/@elliottengelmann) on Unsplash._

## What's a Mock?

If you're not familiar, a mock serves as a stand-in for an external resource. Oftentimes, an external resource is a database, a REST API, or another service over the network.

Mocking external resources is beneficial to your tests for a few different reasons, including:

* Mocks speed up your tests by removing expensive external resource calls.
* You can more easily test edge cases. For example, a mock can raise a 500 Internal Error on command.
* Using a mock isolates what you are testing. Without using a mock, you are both testing your code and the resource, and that's **not** a unit test.

So mocking sounds good, right? Right. Let's get started!

## Using MagicMock

Looking at a simple example, lets see how we can test a class that interacts with `redis-py`. This class is a toy example, but it follows a common pattern for objects that use external resources: references or interfaces to the external object are placed into the instance.

```python
class RedisCache:
    """Cache the view data in Redis."""

    def __init__(self, redis=Redis()):
        self.redis = redis

    def cache_view(self, path: str, rendered: str, ttl=30):
        """Cache a view at `path` on redis."""
        self.redis.set(path, rendered, ex=ttl)
```

With mocks, this pattern becomes _trivially_ easy to test. We can just swap out the `Redis()` instance with our mock when we create our instance of `RedisCache()`:

```python
from unittest import mock


def test_redis_cache_stores_view():
    """Tests set() is called on the redis instance."""
    redis_mock = mock.MagicMock()
    redis_cache = RedisCache(redis_mock)

    redis_cache.cache_view("/", "<h1>Index</h1>")
    redis_mock.set.assert_called_once()
```

Wow, magical. 🌈✨

`MagicMock` is a subclass of `Mock` that's already setup to use. In most cases, `MagicMock` will work fine. Plus, it has helpful methods like `.assert_called_once()`, which we are using above.

It's important to note this test doesn't _really_ test anything. In reality, you should be focusing on testing your business logic. Use mocks to remove large, expensive, or unrelated resources and focus on what matters.

## Patching Resources

"This is all great, Maddie, but I have a bunch of functions that use `requests`. There's no way I'm adding keyword arguments to all of them just for tests."

That's what `mock.patch` is for. In some cases, you can't access the object being used (barring `import` shenanigans). Instead, `mock.patch` enables you to inject a mock object into whatever module or code you are testing.

Here is an example function that uses `requests` to grab an external resource:

```python
import requests

def pull_url(url: str) -> str:
    """This is literally requests.get(url).text"""
    return requests.get(url).text
```

Now we can patch this in our test code. Here's an example:

```python
# Make sure to replace requests in your file/module.

@mock.patch('mymodule.requests.get')
def test_get_url(requests_mock):
    mock_resp = mock.MagicMock()
    mock_resp.text = "<h1>Hello world</h1>"
    requests_mock.return_value = mock_resp

    assert get_url("some path") == "<h1>Hello world</h1>"
```

Patch can also be used as a context manager, so the above can be rewritten like this if you're not a fan of decorators:


```python
def test_get_url(requests_mock):
    """Context syntax."""
    with mock.patch('mymodule.requests.get') as mock_resp:
        mock_resp = mock.MagicMock()
        mock_resp.text = "<h1>Hello world</h1>"
        requests_mock.return_value = mock_resp

        assert get_url("some path") == "<h1>Hello world</h1>"
```

For `requests` specifically, it can be annoying to mock many different responses that are all similar. If you repeat this pattern a lot in your code, it can be helpful to make a small constructor:

```python
def resp_mock(resp: str, resp_type="TEXT"):
    """Construct your response.

    Probably want to change this depending on what responses you frequently need.

    Used like this:
        @mock.patch('mymodule.requests.get', return_value=resp_mock("<html>"))
    """
    if resp_type == "TEXT":
        mock_resp = mock.MagicMock()
        mock_resp.text = resp
        return mock_resp
    elif resp_type == "JSON":
        # You can also construct your json objects, etc.
```

However, you don't _need_ to, especially if you only use requests in one or two places. I personally prefer to keep my tests mostly self-contained, to keep things easy to reason about.

Creating `mock` constructors is also a bit suspicious. If you need mocks that complicated, maybe you should reach for a conventional test double.

> Simple is better than complex.
>
> \- Tim Peters, "The Zen of Python"

## Testing Exceptions

Some exceptions, such as a resource timing out or an authentication error, are difficult to test without mocks. However, `mock` makes testing exceptions a breeze with side effects:

```python
import pytest
from unittest import mock


def test_mocks_raise_exceptions():
    """Demonstrates how mocks can raise exceptions."""
    my_mock = mock.MagicMock()
    my_mock.side_effect = ValueError

    with pytest.raises(ValueError):
        my_mock()
```

Combined with the above techniques, it's simple to test uncommon exceptions with external resources. Coverage increases because your error handling code is tested, and you get peace of mind.

## Conclusion and Further Reading

Mocking resources is often necessary to thoroughly unit test code. I hope this article either served as a introduction to `mock` to beginners,  or a helpful review!

To learn more about mocking resources in Pythom, the [documentation](https://docs.python.org/3/library/unittest.mock.html) is always a great resource. Thanks for reading!
