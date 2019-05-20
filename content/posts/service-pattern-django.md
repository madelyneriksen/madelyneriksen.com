---
type: "post"
title: "Tackling Complexity - Using the Service Pattern in Django"
category: "tutorial"
date: 2019-05-20
slug: "/blog/service-pattern-in-django"
postImage: "./img/rosey-succulents.jpg"
metaDescription: "Large Django applications can be monstrously complex. Cut through complexity with well-factored services."
---

It's the year 2019. You're working on a new Django project for a client, a team-based Todo app. The app still has a lot of velocity and you're churning out features at a great rate. You've fully embraced the best practice of "fat-models" as encouraged by the Active Record pattern. But there is a (not so) small issue creeping in: complexity.

Maybe you have a `Todo` model that needs to be marked as done. You add a method, `Todo.complete()` and that works well enough. But then what if you need to send users an email when a `Todo` is made complete? Now your `Todo` model knows how to send emails, which seems counter-intuitive. Hey, maybe team leaders need to be notified, too...

This cycle continues and the painful conclusion is a monolithic, all powerful model if you're lucky, or worse: an untestable ball of methods that do _way too much_. The model has consumed your application, which is now nothing except merge conflicts on the same few files.

Enter the `Service` object.

_Photo by [@yespanioly](https://unsplash.com/@yespanioly) on Unsplash._

## The Inspiration

A [great article](https://mitchel.me/2017/django-service-objects/) from 2017 by Mitchel Cabuloy discussed Rails-like service objects in Django based on the core forms framework. This is where I personally got started with using the service pattern (and domain driven design in general).

[You can check out](https://github.com/mixxorz/django-service-objects) this really great module, but I have found in some applications it may not be sufficient, especially if you are using Django Rest Framework, Graphene, or (ironically) Django forms.

The problem stems from Single Responsibility Principle (SRP). `service_objects` as implemented in the model are both how to present and how to preform an action. You _should_ be able to change your controller layer without changing or breaking the underlying service.

If your application is simple enough, `service_objects` is a great way to break business logic out of your models. But if you need more flexibility or compatibility at a deeper level with other modules (like `rest_framework`), you might want to roll your own.

## Breaking It Out

There's three components to any Service we need to create:

1. The actual data that goes into the Service that will be operated on,
2. A handler that _actually_ executes the action, containing all side effects, and,
3. Some way to represent that handler to a user of the app, with a form, serializer, CLI, or what have you.

Let's talk implementation. Personally, I prefer representing these components in distinct classes: one command, one handler, (sometimes) many ways to create commands for the handler.

A `Command` can be pretty easily represented with a `@dataclass` in 3.7...

```python
from dataclasses import dataclass


@dataclass
class CreateUserCommand:
    """Command class for creating a new user."""
    email: str
    username: str
    password: str
```

...or with a `NamedTuple`:

```python
from typing import NamedTuple


class CreateUserCommand(NamedTuple):
    """Command class for creating a new user."""
    email: str
    username: str
    password: str
```

A `Service` (or handler) can be represented as a class for easy extension:

```python
class Service:
    """A service takes a command and performs an action with it."""
    def __init__(self, cmd, manager=transaction.atomic, signal=None):
        self.cmd = cmd
        self.manager = manager
        # Django has the neat signals framework for message busses.
        self.signal = signal

    def execute(self):
        """Runs self.process() inside the manager object."""
        # The default manager is django.db.transaction.atomic
        with self.manager():
            return self.process()

    def process(self):
        """Run inside the manager object. Performs the action."""
        raise NotImplemenetedError()
```

Our service named `CreateUser` might look something like this:

```python
class CreateUser(Service):
    def process(self):
        """Creates a user and sends self.signal."""
        user = User.objects.create_user(
            username=self.cmd.username,
            email=self.cmd.email,
            password=self.cmd.password,
        )
        # Using a message bus helps us avoid breaking SRP.
        self.signal.send_robust(
            sender=self.__class__,
            email=self.cmd.email,
        )
```

A note on using `signals`: if you want your signal's errors to cause the transaction to fail, use `.send()`. If you do _not_ want the transaction to fail, use `.send_robust()`. Protect critical changes from trivial failures, like email delivery, by using `.send_robust()`.

## Stop Writing Classes

You _can_ use this pattern with a functional service handler. Here's a more functional implementation of `CreateUser`:

```python
def create_user(cmd, manager=transaction.atomic, signal=user_created):
    """Create a user."""
    with manager():
        # As CreateUser above
```

This mostly comes down to personal preference. Either way, it's easier to test components in isolation when you can inject a different `manager` or `signal`, so I do suggest keeping them as keyword arguments with sensible defaults.

## Writing Tests

Strong unit test coverage is critical to maintaining a large codebase. A typical downfall in large Django apps is that it can be hard to write _fast_ tests because of the reliance on models/the database.

However, with a Service pattern, it's simple to write fast unit tests that do not use the database.

```python
# This example uses pytest.

# Mocking our user model.
@mock.patch('mybaseapp.models.User.create_user')
def test_create_user_calls_creation_method(user_mock):
    manager_mock = mock.MagicMock()
    signal_mock = mock.MagicMock()
    cmd = CreateUserCommand(
        email="some@email.com",
        username="houseplantmom777",
        password="password secured"
    )

    CreateUser(
        cmd,
        manager=manager_mock,
        signal=signal_mock
    ).execute()

    user_mock.assert_called_once_with(
        email="some@email.com",
        username="houseplantmom777",
        password="password secured",
    )
    signal_mock.send_robust.assert_called_once_with(
        sender=CreateUser,
        email="some@email.com",
    )
```

## Adding Another C to MVC

By design, `Commands` have no way to gather data for themselves. `Services` have no way to make or validate their commands. Instead, your `Controller` will handle creating `Commands` to send to your `Service`.

In vanilla Django, a great representation of a `Controller` for a service is a `Form`:

```python
from django import forms

class ServiceForm(forms.Form):

    @property
    def command(self):
        """Getter for commands."""
        if self.Meta.command is None:
            raise AttributeError("Set Meta.command to be a command.")
        return self.Meta.command

    def to_command(self, **kwargs):
        """Creates a command from the form data.

        Arguments:
            **kwargs: Injected into self.Meta.command during creation.
        """
        self.cleaned_data.update(kwargs)
        return self.command(**self.cleaned_data)

    class Meta:
        command = None
```

A `ServiceForm` is extended to accept specific fields, and its `.to_command()` method is called to create the new command from the cleaned data and any extra arguments (`request.user` is common).

Using it is easy:

```python
class CreateUserForm(ServiceForm):
    email = forms.EmailField()
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

    # Add your clean methods, etc...

    class Meta:
        command = CreateUserCommand
```

Choosing a `forms.Form` as the controller is entirely arbitrary. Actions don't care about where they are from, that's the view and controller's jobs. If you are using Django Rest Framework, a `Serializer` class works well. Similarly, if you're using [the fabulous Graphene Django](/graphql-django-tutorial), a `Mutation` class is the logical way to control `Services`.

> Actions don't care about where they are from. That's the View and Controller's job.

Typically, your choice of view usually dictates what controllers will create commands for services. In vanilla Django, I personally prefer sublassing the generic `FormView` to create a `ServiceView`. With Django Rest Framework, try creating a version of `APIView` that calls services.

Creating a generic view for building commands from controllers to call out to services is a _fantastic_ way to save time. This is a great way to add velocity back into your projects, without making a mess of the code.

## Wrapping Up

For just calling `User.objects.create_user`, this is _certainly_ over-engineered. But don't discount the pattern because of a contrived example: Services are a great way to create code bases that are open to expansion and crystal clear. In reality, your business logic will be *much* more complicated than just creating a `User` or two, and that's where services shine.

And best of all, your `models.py` file isn't 1k lines anymore.

---

I hope you feel inspired to try out the service pattern in Django or (Python in general)! If you have tried it out before, I'd love to [hear your thoughts](/contact) and how it did or didn't work out for you. Thanks for reading!
