---

type: 'post'
title: 'Build Your Own Insta with React and Django - Part 1'
category: "tutorial"
date: "2019-05-28"
slug: "/blog/build-instagram-with-django-and-react-part-1"
postImage: './img/cactus_grass.jpg'
metaDescription: "Create a backend RESTful service in Django for a frontend React client."

---

In this series, we'll be creating a simple version of a photo sharing social network using React and Django Rest Framework. Creatively, we'll call the project "_Djangogram_".

_Photo by [@throughmyaperture](https://unsplash.com/@throughmyaperture) on Unsplash._

This is a long, multi-part tutorial. In each part, we will cover:

* Part 1 (you're here!): Starting a new Django Project and building database models.
* Part 2: Creating an API for our models.
* Part 3: Using React with Mobx for our frontend.
* Part 4: Creating the UI for our web app.

If you haven't used Django or React before, this might not be the best introduction to either! However, I will still explain things thoroughly. If you feel up to a deep dive, follow along!

## Launching A New Django App

Since Django is a web framework for Python, you'll need a few Python tools to get started.

* `python3`, at least version 3.6.8 for this tutorial.
* `virtualenv` or `venv` for creating isolated and locale environments.
* `pip` in your `virtualenv` for installing Python packages (like Django!)

Let's start our new project by creating a folder `djangogram` and adding a `requirements.txt` file with the following contents:

```none
django
djangorestframework
```

Now you can create your virtual environment, and install the dependencies. Run the following commands in [your shell](/blog/shell-yeah):

```bash
python -m virtualenv .env -p python3
# Or .env\scripts\activate on Windows
source .env/bin/activate
pip install -r requirements.txt
```

Since we didn't version our dependencies, `pip` will automatically install the latest versions of each. For a serious application, you should version your dependencies, but here we're just skipping it.

Finally, we can create our Django project using the built-in `django-admin` command. Again in your shell, run the following command:

```bash
django-admin startproject gram .
```

This command bootstraps a new Django project in the current working directory. It creates a root project folder and all required files! Your project folder should look like this by now:

```none
djangogram
├── gram
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
└── requirements.txt

1 directory, 6 files
```

Let's fire up the development server and see if everything worked. To launch a Django dev server, you can use the `manage.py` file and the `runserver` command:

```bash
python manage.py runserver
```

Open up your favorite web browser to [http://localhost:8000/](http://localhost:8000) and you should see the Django rocket.

![Success! It worked!](/img/django_rocket.png)

If you see the rocket, you're all set. Let's start writing some code!

## Social App and Settings

We need to create the `social` application that we'll build our API on. The `social` app will contain models for users, photos, comments, and more. Our new application is started with the following shell command:

```bash
python manage.py startapp social
```

Your directory's file structure should look like the following:

```none
djangogram
├── gram
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── requirements.txt
└── social
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py

4 directories, 18 files
```

`manage.py` has created a directory named `social` with required Django files for models, the admin, etc. You also need to install the application in `gram/settings.py`, otherwise Django won't "pick up" the app.

```python
# gram/settings.py

# The rest of your settings file above here

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'social',
]
```

With the `social` app installed, we can create our base model and custom `User` model for the application. Open `social/models.py` and add the following two, new models:

```python
# social/models.py
"""Models for the social application."""

import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser


class BaseModel(models.Model):
    """Base model for the application. Uses UUID for pk."""
    id = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4,
    )

    class Meta:
        """Metadata."""
        abstract = True


class User(BaseModel, AbstractUser):
    """Custom user model."""
```

The newly created `BaseModel` class is an _abstract_ model that adds a UUID primary key to all models that inherit from it. Our `User` class inherits from `BaseModel` and `django.contrib.auth.models.AbstractUser` to create the custom user model for our backend application. Ever since Django added custom user model support, it has been recommended to start each new project with a custom user.

However, you need to point the Django authentication system at your user model. Add the following line to `gram/settings.py`:

```python
# gram/settings.py
AUTH_USER_MODEL = 'social.User'
```

Finally, you need to make migrations for the application and then run a migration. This sets up the database for the rest of your app!

```bash
python manage.py makemigrations
python manage.py migrate
```

And that's it! Let's add our other models to the project.

## Photo and Media Settings

When working with photos in Django, there's a great library that I almost always reach for named [Django Imagekit](https://github.com/matthewwithanm/django-imagekit). Django Imagekit adds super helpful image processing tools that save lots of development time. We're going to install it alongside `Pillow`, and then add the former to our `INSTALLED_APPS` setting:

```none
# requirements.txt
django
djangorestframework
pillow
django-imagekit
```

Run `pip install -r requirements.txt` to install the new dependencies. You also need to add `imagekit` to your `INSTALLED_APPS` setting:

```python
# gram/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'imagekit', # New
    'social',
]
```

While we're modifying `gram/settings.py`, we can add standard media settings. After adding these, all uploaded photos/files in development will get stored in a new `media` directory.

```python
# gram/settings.py

# Add this near the end
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = 'media/'
```

Since we're using `DEBUG = True` and just developing, let's add a media endpoint to our `gram/urls.py` file too. This URL will only work in development, but it will let us see uploaded photos while working on the site. In production, you should be using either a web server like Nginx/Apache or a service like AWS S3 with Cloudfront to serve static files.

```python
# gram/urls.py
"""gram URL Configuration"""

from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Our media settings are good to go! Let's add our photo model.

## Adding Our First (Real) Model

Finally we can add in our photo model! In your `social/models.py` file, add the following code:

```python
# social/models.py
"""Models for the social application."""

import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser

from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit


# === BaseModel and User ===

class Photo(BaseModel):
    """A photo posted by a user."""

    user = models.ForeignKey(
        User, verbose_name="Created By", on_delete=models.CASCADE, related_name="photos"
    )

    caption = models.TextField()
    photo = ProcessedImageField(
        upload_to="photos",
        format="JPEG",
        options={"quality": 90},
        processors=[ResizeToFit(width=1200, height=1200)],
    )

    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}'s Photo on {self.date_created}"

    class Meta:
        """Metadata."""

        ordering = ["-date_created"]
```

We've added two imports from the new `imagekit` library, `ProcessedImageField` and `ResizeToFit`. Our `photo` field will automatically resize any uploaded files to be 1200px times 1200px or less, while preserving aspect ratio. This isn't _required_, and you can make your photos be larger or smaller.

Our `Photo` model extends the `BaseModel` model, and has some standard fields like who created it, when it was created, and the last time it was edited. Finally, we also defined a default ordering for photos as well as a magic method for displaying it as a string. You can now create the model with `manage.py makemigrations` and `manage.py migrate`, which will create it in the database!

While we're here, let's add it to the administration panel in `social/admin.py`:

```python
# social/admin.py
"""Administration for our social app."""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from . import models


@admin.register(models.Photo)
class PhotoAdmin(admin.ModelAdmin):
    """Admin for photos."""


@admin.register(models.User)
class CustomUserAdmin(UserAdmin):
    """Custom user admin."""
```

If you create a superuser with `python manage.py createsuperuser`, you should be able to navigate to `admin/` when the server is running and create a new photo under "Social > Photos".

![Creating a photo in the admin](/img/photo-admin-panel.png)

> Thankfully this isn't our end user interface.

If you check the `media/` directory in your project, you'll see the uploaded photo is stored in there and resized if necessary. If everything looks good, then congrats! We've got about 1/100th feature parity with Instagram.

## Adding Likes and Comments

We want our users to be able to like photos that interest them and share constructive feedback in comments. Moderation may be an unsolved problem, but we can at least add `Like` and `Comment` models. In your `social/models.py` file, add the following code for a `Like` model.

```python
# social/models.py

# === Imports and other models. ===

class Like(BaseModel):
    """A 'like' on a photo."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name="likes")

    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} Like"

    class Meta:
        """Metadata."""

        unique_together = (("user", "photo"),)
        ordering = ["-date_created"]
```

A `Like` is a _many to many_ relationship between users and photos, but rather than use a `ManyToMany` field we are implementing it ourself. By creating the model explicitly we get more control, like being able to specify unique together constraints. Plus, we don't really need the syntax sugar created by a `ManyToMany` field with `through` in Django.

Our comment model will look remarkably similar:

```python
# social/models.py

# === Imports and other models. ===

class Comment(BaseModel):
    """A comment on a post."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    photo = models.ForeignKey(Photo, on_delete=models.CASCADE, related_name="comments")

    content = models.TextField(max_length=2000)

    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        """Metadata."""

        ordering = ["-date_created"]
```

As above, we are avoiding a traditional `ManyToMany` field. Our comment also (obviously) stores the text content written by the user. In contrast to the `Like` model, a `User` can create any number of `Comment` objects on any `Photo` because there is no uniqueness constraints.

Create your new models with a migration command:

```bash
python manage.py makemigrations
python manage.py migrate
```

If you'd like, you can also add them to the `social/admin.py` file:

```python
@admin.register(models.Like)
class LikeAdmin(admin.ModelAdmin):
    """Admin for Likes."""


@admin.register(models.Comment)
class CommentAdmin(admin.ModelAdmin):
    """Admin for Comments."""
```

And that's all the models we will be creating for our application. You're at the end of this section of the tutorial!

## Wrapping Up

With this tutorial you have created a solid foundation for a basic photo sharing application. The next part will be creating a RESTful API layer for our React-based client to consume. Be sure to check back, watch for updates on [github](https://github.com/madelyneriksen/madelyneriksen.com/), or [follow my RSS feed](/rss.xml)

If you found this tutorial helpful or hit some problems, please feel free to [contact me](/contact/) and let me know! Thanks for reading!
