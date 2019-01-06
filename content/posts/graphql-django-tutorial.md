---

type: "post"
title: "Build a GraphQL API with Django and Python3"
category: "tutorial"
date: "2019-01-06"
slug: "/graphql-django-tutorial"
postImage: "./img/trees-road-autumn.jpg"
metaDescription: "GraphQL is a powerful alternative to RESTFUL communication, giving clients flexibility and options. You can easily create a GraphQL server with Django and Python3"

---

GraphQL APIs are becoming commonplace with the rise of React and modern Javascript. NodeJS is the backend for most GraphQL Servers. But if you are like me and love Python, you will love to know that Django has support for GraphQL in Graphene!

In this tutorial I will be using commands for a Linux/Mac host. If you are on Windows, you can still follow along!

**In a hurry?** Check out the code [on Github!](https://github.com/madelyneriksen/graphql-django-tutorial)

## Getting Started

To follow along with the tutorial, you will need to have Python 3.5+ and `virtualenv` installed on your system. On Linux, you can find packages for both in your system package manager.

(**Note:** At the time of writing (early 2019), there are issues with current SQLite versions and the Django version used by Graphene. On Ubuntu 16.04 LTS, you should be good!)

Bootstrapping a Django project is extremely easy, thanks to the tool `django-admin`. To create a new project, you'll need to make a directory, then run the bootstrapping tool:

```bash
# Create and enter the directory
mkdir graphblog && cd graphblog
# Build the virtual env
virtualenv .env
source .env/bin/activate
# Install dependencies
pip install django graphene graphene-django django-filter
# Bootstrap the project in the current directory
django-admin startproject graphblog .
```

Your directory will now have an environment for dependencies and your Python code. It should look something like this:

```
.
├── graphblog
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py

1 directory, 5 files
```

## Configuring Settings

Currently, our application has all the base packages we will need, but none are in Django. We need to add a few packages to our `graphblog/settings.py` file:

```python
# graphblog/settings.py

INSTALLED_APPS = [
    # A lot of default apps...
    graphene_django
    django_filters
    blog
]
```

`graphene_django` is the framework for integrating GraphQL with Django. `django_filters` is a filter that is compatible with Graphene. `blog` is the name of the app we will add in the next step!

## Adding Models

Our GraphQL API will need blog posts and information to query. Create our blog app with the following command:

```bash
python manage.py startapp blog
```

Now we can edit `blog/models.py` and create the schema for our blog:

```python
# blog/models.py
from django.db import models

class BlogPost(models.Model):
    """A blog post model."""
    title = models.CharField(max_length=255)
    body = models.TextField()
    author = models.CharField(max_length=255)

    def __str__(self):
        """Return the title."""
        return self.title
```

Register the blog post you created in the admin with the following code in `blog/admin.py`:

```python
# blog/admin.py
from django.contrib import admin
from blog.models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    """Admin for the blog post."""
    pass
```

We need data to query, so let's set up the admin and database so we can save our blog posts. Create your migrations and apply them like this:

```bash
python manage.py makemigrations
python manage.py migrate
```

Next, add a superuser. You'll need to remember this log in information for later!

```bash
python manage.py createsuperuser
```

Now we can start our server and edit the blog posts.

```bash
python manage.py runserver
```

Open `localhost:8000/admin` in your browser, and you should be able to log in with the superuser to create blog posts. Go ahead and create a couple of blog posts for when we test out our API!

We have finished the database work! All we need to do is hook up our model to Graphene, the Python GraphQL Client.

## Adding GraphQL

So far, we have created a blog post model and saved some entries. In this second half of the tutorial, we'll add a GraphQL API as well as a _GraphiQL_ interface.

Make a new file at the path `blog/schema.py` and add the following content:

```python
# blog/schema.py
"""All the graphql magic for our blog."""


import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from blog.models import BlogPost


class PostType(DjangoObjectType):
    """Defines a graphql type for our blogpost."""
    class Meta:
        model = BlogPost
        filter_fields = ['author', 'title']
        interfaces = (graphene.Node, )


class Query(graphene.ObjectType):
    """Create the main query interface."""
    posts = DjangoFilterConnectionField(PostType)

    def resolve_posts(self, info, **kwargs):
        return BlogPost.objects.all()
```

We've finally started adding GraphQL code! Let's take a look at our code here.

In this block, we're defining a GraphQL _type_ for a post. GraphQL is strongly typed, which means if we want custom types we need to define them ourselves. To create a type for a Django model, subclass the `DjangoObjectType` metaclass from `django_graphene`.

Defining the interfaces allows the client to see information for pagination. Our client will be able to use GraphQL cursors for selecting posts.

We also define two filter fields, which will let us filter by the fields `author` and `title`. The plugin `django-filter` powers these filters.

```python
class PostType(DjangoObjectType):
    """Defines a graphql type for our blogpost."""
    class Meta:
        model = BlogPost
        filter_fields = ['author', 'title']
        interfaces = (graphene.Node, )
```

If you've ever used GraphQL, you're likely familiar with Queries. Queries are requests that return information and usually have no side effects.

In our Query class, we create a connection for posts, and create a resolve method for it. The resolve method applies arguments from the client's query to return filtered information.

You can change or customize your resolve methods! The important thing is to always return a Django queryset of the model (or similar).

```python
class Query(graphene.ObjectType):
    """Create the main query interface."""
    posts = DjangoFilterConnectionField(PostType)

    def resolve_posts(self, info, **kwargs):
        return BlogPost.objects.all()
```

## Adding The View

We need to add a view for our GraphQL API to query it. Start by creating a new file at `graphblog/schema.py` with the following content:

```python
# graphblog/schema.py
"""Schema for the main application."""


import graphene
import blog.schema


QUERIES = (
    # Place all future query classes here.
    blog.schema.Query,
)

class Query(*QUERIES):
    """Top level query class that inherits from all others."""
    pass


schema = graphene.Schema(query=Query)
```

We've created a class called `Query` which inherits from our `Query` class in `blog/schema.py`. Later on, we can add on to the constant `QUERIES` to expand our schema. You can add Mutations in the same way.

(Psst: The asterisk in `class Query(*QUERIES)` unpacks `QUERIES` into arguments.)

Next, we can add the schema to `graphblog/urls.py`:

```python
# graphblog/urls.py
"""graphblog URL Configuration"""


from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True)))
]
```

Aside from the new imports, we have added a path for our GraphQL API. We wrap it with the `csrf_exempt` decorator to prevent errors from lack of CSRF cookies.

You might notice we're not importing the schema from `graphblog/schema.py`, so there's no way our URLs can use it. Rather, `graphene_django` defines the top level schema in your settings file. Let's add in configuration for it to the end of our `graphblog/settings.py` file:

```python
# graphblog/settings.py

GRAPHENE = {
    "SCHEMA": "graphblog.schema.schema",
}
```

At this point, you can fire up the server, and visit `localhost:8000/graphql` in your browser. You should see the GraphiQL interface. Try writing your first query!

```javascript
query {
  posts {
    edges {
      node {
        author
        title
        body
      }
    }
  }
}
```

The server will respond with a list of posts that you created earlier!

## Conclusion & Next Steps

We've created a simple but complete GraphQL server for a blog post using Python. While Node is a first class citizen for GraphQL, Python and Django are capable and a joy to work with.

Interested in continuing your exploration of GraphQL and Django? There's a lot of great resources out there! Here's a list of my favorites:

* [How to GraphQL](https://www.howtographql.com/graphql-python/0-introduction/), a guide to GraphQL APIs in six languages, including Python.
* [GrapheneDjango Documentation](https://docs.graphene-python.org/projects/django/en/latest/) for a summary of GraphQL and Django together.
* [GrapheneDjango JWT](https://django-graphql-jwt.domake.io/en/stable/index.html), a handy wrapper for adding testable authentication.

Because GrapheneDjango is only an extension, it's worth learning vanilla Django too. My go to resources for learning Django are:

* [The Django Documentation](https://docs.djangoproject.com/en/2.1/) is well written and covers everything about Django.
* [The Django Girls Tutorial](https://tutorial.djangogirls.org/) is an awesome tutorial for getting started with Django. It's how I got started working with the Django framework.

If you liked this tutorial or have questions and need help, you can [contact me here](/contact) or [open an issue on Github.](https://github.com/madelyneriksen/graphql-django-tutorial). I'll get back to you as soon as I can.

If this tutorial was helpful for you, please let me know!
