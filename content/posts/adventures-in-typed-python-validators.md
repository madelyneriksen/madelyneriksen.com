---
type: "post"
title: "Custom Validated Types in Python for MyPy and Pydantic"
slug: "/blog/validated-container-types-python-pydantic"
postImage: "./img/evergreen-trees.jpg"
date: "2019-11-17"
category: "tutorial"
metaDescription: |
  Python is not a statically typed language and doesn't have runtime type safety guarantees- but we can fake it with a little bit of work.
---

In a few side projects, I have been using [Pydantic](https://github.com/samuelcolvin/pydantic/) with [MyPy](https://mypy.readthedocs.io/en/latest/), to provide static type checking and runtime validation or serialization for objects. Static typing and strong validation guarantees cut down on bugs; it's a lot harder for your program to enter an invalid state.

However, defining custom _types_ for using in Pydantic is a bit frustrating out of the box. Here are a few tricks I used to implement a generic, validated container type for use with Pydantic.


## What's the Problem?


For starters, one of the benefits of strong, static type systems is making invalid states _impossible_ for the program to enter, as guaranteed by the compiler or mechanism implementing the checks. In Python, we of course have no such protections- there's nothing you can do to prevent a determined programmer from misusing your types or objects. However, the goal of tools like Pydantic or MyPy is to fake this level of safety to cut down on bugs.

Lets hop into an example from e-commerce: Products, Quantities, and Prices. Consider a Product class:


```python

from pydantic import BaseModel

class Product(BaseModel):
    # ...general product stuff here, titles, skus, price, etc.
    quantity: int
```

What's the issue here? Well, this is valid:


```python
product = Product(quantity=-1, ...)
```

It doesn't make any sense to have negative amounts of product in stock! Using Pydantic, we can add a lower bound for our integer:

```python
from pydantic import BaseModel, conint

class Product(BaseModel):
    quantity: conint(ge=0)
```

...but problems creep in here too. What if we want a `Quantity` somewhere else? Not _all_ of our code uses Pydantic, surely. `Quantity` is really a type of its own, and could conceivably have different interactions with different types.

There's also no guarantees for our quantity when it's used in other places. And since our product quantity is just an integer, we can do all sorts of useful or nonsensical things with it:

```python
# This is fine- we could calculate our estimated stock value
product.quantity * product.price

# What??? Why is this allowed? oh, because integers...
product.quantity / product.price
```

It's worth noting that subclassing `int` doesn't help us here either- unless you explicitly went in and disabled the respective operator methods on your custom integer, which sounds like a lot of work to me.

> There is no problem that can't be solved by wrapping it in another type.

Really, `Quantity` is a validated value with specific semantics within the context of our _business domain_. We should be able to (and can!) represent that with our type system, to prevent bugs and accurately reflect our real-world values.

In Python, we could express this as a class:

```python
class Quantity:

    def __init__(self, val: int) -> None:
        if val < 0:
            raise ValueError("Must be more than 0")
        self.value = val
```

Which is honestly fine, but then you end up needing to repeat this same pattern for a bunch of types, add `__get_validators__` class methods for Pydantic, for potentially lots of types. Thinking about e-commerce, imagine having to do `ZipCode`, `Province`, `Country` for strings, `Price` and `Quantity` types, and the list goes on.

What if there was a better way...?

## Oh no, it's Generics, huh?


We want a _container_ to hold a validated value of any type. However, once the container type is declared, that container should only accept types of that type (say that five times fast). This type is called a _Generic Type_, because it works with any type specified.

You're probably already familiar with the built-in generics like `List` or `Dict`. It's also easy to make your own generics:

```python
import typing as t

T = t.TypeVar("T")

class Container(t.Generic[T]):
    """Technically, that's it."""

    def __init__(self, val: T) -> None:
        self.value = val
```

## Pydantic Compatibility Protocol

Pydantic checks custom types for a `__get_validators__` method, which should `yield` validators used on the type's value. Let's look at what a validator will look like for our validated container:

```python
Validator = t.Callable[[T], T]
```

That is, a `Validator` function should take something of type `T`, and return something of type `T`. Since this is Python, we won't get too Haskell-ish by making it return an `Either` type: if something goes wrong, we'll just throw a `ValueError` or `TypeError`.

Equiped with this information, we can create a generic [protocol](https://mypy.readthedocs.io/en/latest/protocols.html) to represent a type that has Pydantic-compatible validators:

```python
import typing as t
from typing.extensions import Protocol

class Validated(Protocol[T]):
    """A type that implements __get_validators__"""

    @classmethod
    def __get_validators__(cls) -> t.Iterator[Validator[T]]:
        """Yield an iterator of validators."""
        ...
```

With this protocol, we can define a function that validates any value of type `T` against all the validators in the `Validated` type. We can `reduce` our validators onto our value of type `T`:

```python
from functools import reduce

def validate(validated_type: t.Type[Validated[T]], val: T) -> T:
    """Validate a value for a ValidatedType"""
    return reduce(lambda x, y: y(x), validated_type.__get_validators__(), val)
```

Each function that is yielded from the validators of the type will be called on the value. If the value passes through them all, we know it's a valid value. Otherwise, we'll get an error which the caller can handle.

## Creating Our Generic Type

With the Pydantic compatibility out of the way, we can finally make a generic type to help us cut down on code duplication. Let's call our generic type `ValidatedValue` because, well, it's... a validated value.

```python
class ValidatedValue(t.Generic[T]):
    """A container for a validated value."""

    __validators__: t.List[Validator[T]]

    @classmethod
    def __get_validators__(cls) -> t.Iterator[Validator[T]]:
        yield from cls.__validators__

    def __init__(self, val: T) -> None:
        self.value: T = validate(type(self), val)
```

Now, we can create a `Quantity` type that has our specific semantics:


```python
def is_positive(val: int) -> int:
    if int(val) < 0:
        raise ValueError("Must be more than zero")
    return int(val)

class Quantity(ValidatedValue[int]):

    __validators__ = [is_positive]

    def __int__(self):
        return int(self.value)

    def __mul__(self, price: 'Price') -> 'Price':
        return Price(int(self) * int(price))

class Price(ValidatedValue[int]):

    __validators__ = [is_positive]

    def __int__(self):
        return int(self.value)

    def __str__(self):
        return "{:0.2f}".format(int(self) / 100)
```

This isn't every constraint a Price or Quantity type would have, but for a demo this is enough. Let's try out our new types!

```python
>>> quantity = Quantity(10)
>>> price = Price(199)
>>> # We can't do this kind of nonsense anymore.
>>> try:
>>>     quantity / price
>>> except TypeError as err:
>>>     print(err)
TypeError: unsupported operand type(s) for /: 'Quantity' and 'Price'
>>> # But this works!
>>> inventory_value = quantity * price
>>> print(inventory_value)
$19.90
>>> # However, if we want to live dangerously, we can cast to an int
>>> as_int = int(quantity)
```

## Improving Our Type with Join

There's one more thing we should probably support with our types: a way of "joining" them down. What this means is calling `Price` on a `Price` should just return the same price, without re-validating the entries.

```python
# valdiate() is called twice here.
price = Price(Price(1999))
```

We can use a conditional and clever usage of the `type` function, however it's worth noting that MyPy doesn't understand what this block of code does just yet.

```python
class ValidatedValue(t.Generic[T]):
    """A container for a validated value."""

    __validators__: t.List[Validator[T]]

    @classmethod
    def __get_validators__(cls) -> t.Iterator[Validator[T]]:
        yield from cls.__validators__

    def __init__(self, val: t.Union[T, 'ValidatedValue[T]') -> None:
        if isinstance(val, type(self)):
            # Don't double validate- flatten.
            self.value: T = val.value
        else:
            # The line MyPy has some trouble with.
            self.value: T = validate(type(self), val)  # type: ignore
```

With proper pattern matching, we can avoid the use of `type: ignore` and make this a type-safe operation. However, with MyPy it's currently required. If you know a way around that, let me know!

At any rate, our generic `ValidatedValue` container is complete! The best part? It works with Pydantic and provides great error messages. ✨

## TL;DR Where is the Code?

If you just want to use this in your project _right now_, you can use the complete snippet below. The entire implementation is less than 50 lines:

```python
import typing as t
from functools import reduce

from typing_extensions import Protocol


__all__ = ["ValidatedValue"]


T = t.TypeVar("T")
Validator = t.Callable[[T], T]


class Validated(Protocol[T]):
    """Any type that implements __get_validators__"""

    @classmethod
    def __get_validators__(cls) -> t.Iterator[Validator[T]]:
        """Retrieve validators for this item."""
        ...


class ValidatedValue(t.Generic[T]):
    """A container for a validated value of some type."""

    __validators__: t.List[Validator[T]]

    @classmethod
    def __get_validators__(cls) -> t.Iterator[Validator[T]]:
        """Retrieve validators for this value's type."""
        yield from cls.__validators__

    def __init__(self, val: t.Union[T, 'ValidatedValue[T]']) -> None:
        if isinstance(val, type(self)):
            self.value: T = val.value
        else:
            self.value: T = validate(type(self), val)  # type: ignore


def validate(validated_type: t.Type[Validated[T]], val: T) -> T:
    """Validate the value against the Pydantic __get_validators__ method."""
    return reduce(lambda x, y: y(x), validated_type.__get_validators__(), val)
```

## Conclusions and Caveats

**What's Awesome**

We've created a generic type to represent a value with specific semantics, that we can reuse all over our application. For ensuring safety, this is pretty awesome- we're reasonably well protected both during runtime and by static analysis with MyPy. It's going to be a _lot_ harder to get our application into a bad state!

**Downsides**

Unlike a lot of compiled languages with static typing, this is not zero cost. Comparing a plain integer to a custom type made this way, I have noticed a **significant** slowdown:

* Time to create 1 million values with this type: 1.816 seconds.
* Time to create 1 million plain integers: 0.145 seconds.

As additional validators are added, the times get worse. You are going to get better performance in Python by skipping this level of safety. Then again, this is _Python_. if you care that much about performance and type safety, you're probably looking for a language called [Rust](https://www.rust-lang.org/).

Finally, there is nothing stopping someone from grabbing `.value` directly. There isn't a way to avoid that in Python when using type inheritance (For "single level". You _can_ name it `._value` to indicate it shouldn't be used, but someone can use it anyways. The Python philosophy about private variables is ["We are all adults here"](https://mail.python.org/pipermail/tutor/2003-October/025932.html), which translates to "Don't use private APIs unless you like breaking code and no support".

---

Thanks for reading through this! I hope you found this interesting or even informative; lately I have had a lot of fun hacking on Python's typing support and have learned a whole bunch. If you have questions or want to point out something I missed, feel free to [contact me](/contact) and let me know what's on your mind!
