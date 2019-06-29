---

type: "post"
title: "5 Awesome Tools for Python Code Quality"
date: "2019-06-29"
slug: "/blog/awesome-python-code-quality-tools/"
postImage: './img/matt-gross-mesa.jpg'
metaDescription: "In software engineering projects, it's essential to have tools that ensure a high quality codebase. This is a list of the best testing, source analysis, and code quality tools for Python."

---

_Alternate Title: A developer adds five lines to her `.travis.yml` file. You won't believe what happens next!_

Code quality is critical to keeping large projects healthy and progressing, but it's hard to maintain consistent quality by hand. However, there are a bunch of tools for Python code that will make this so much easier.

Like several other topics in software development, what tools to use comes down to preference. Do you use a tool not on this list? Feel free to [let me know](/contact/) what I am missing! What follows is my personal preference in tools as of 2019.

_Photo by [Matt Gross](https://unsplash.com/@mattkgross) on Unsplash_

## 1. Pytest - Essential Unit Testing

Python has a built in unit testing toolkit in the `unittest` module, but it's not always the right fit for every project. I prefer using [Pytest](https://pytest.org) whenever possible because the experience is so simple.

**Why It's Good**

When it's easier to write unit tests, you'll write more of them. Pytest makes it a _breeze_ to create new tests. Just add a new Python file that starts with `test`, write a few functions, and you're already done.

There are a massive amount of plugins for Pytest that can be configured through a `pytest.ini` file. It's also easy and painless to write your own plugins too! And of course, Pytest "just works" with class based tests from `unittest`, too.

**How To Use It**

Say you were writing a test to see if addition works, and in this alternate universe it also didn't bother you this exercise seemed so contrived. You might write a pytest file like this in a `tests` directory:

```python
"""An Example Pytest Test"""

import time
import pytest

def test_plus_one():
    """Test some addition."""
    x = 8 + 1
    assert x == 9

@pytest.mark.integration
def slow_test():
    """A really slow integration test."""
    time.sleep(5)
    assert 1 == 1
```

You would also write up a `pytest.ini` file to register the "slow" marker, otherwise you will get an unpleasant warning:

```ini
[pytest]
markers =
    integration: Integration test.
```

And... that's it. That's all it takes to create new Pytest tests. You can run them by installing Pytest from PyPi and running the `pytest` command.

```bash
pip install pytest
pytest
```

It's that easy. 🎉

## 2. Pylint - Style Checking and Error Spotting

[Pylint](https://www.pylint.org/) is an _intelligent_ code analysis tool that understands your Python code. It catches common errors like misspelled variable names, to sneakier problems like non-returning branches.

**Why It's Good**

Unlike a lot of other tools for linting Python code, Pylint can spot some logical errors or code that will result in exceptions. It also enforces a lot of best practices, such as keeping `try ... except` blocks focused on a few _specific_ exception classes, and avoiding bad default arguments like empty lists or dictionaries.

Pylint is unrivaled in strictness- it has a _lot_ of checks for everything from superfluous warnings to serious errors. The downside to using Pylint is sometimes the check is just wrong; you'll want to keep your `.pylintrc` file close when you know you're right.

**How to Use It**

Like most Python tools, you can download Pylint from PyPi using `pip`:

```bash
pip install pylint
# Lint your project with the module (folder) name
pylint my_project
```

You might want to also create a `.pylintrc` file for your project. This file should be checked into source control, as well. Pylint can generate a default `.pylintrc` file for you, too:

```bash
pylint --generate-rcfile > .pylintrc
```

There are also plugins to integrate Pylint with Pytest, if you don't feel like using a task runner or builder like [GNU Make](/blog/gnu-make-for-beginners).

## 3. Black - Code Formatting for Python

Why spend energy beautifying your code, when you can outsource the work to a computer? [Black](https://github.com/python/black) is a code formatter for Python that's fast and 100% static- it doesn't import code to format it.

**Why It's Good**

Personally, while I love clean and pretty Python code, it is **exhausting** to format code by hand. It's so much easier to just throw lines into a source file without worrying about line wrapping, indentation, or long function signatures.

Black takes away all this responsibility from the programmer, instead formatting the code itself. It's fast and efficient with defaults that reduce "diff" sizes. I have no complaints about Black- I love it.

**How To Use It**

Just install Black from PyPi and format your files. You're good to go! 🚀

```bash
pip install black
# Format everything in my_project/
black my_project
```

For CI/CD pipelines, you might want to check that all code is formatted with Black. That's what the check option is for:

```bash
black my_project --check
```

`--check` will fail the tests if the code isn't all formatted already.

## 4. Coverage - Easy Code Coverage for Python

If you're going to the trouble of writing unit tests, you might as well check if you missed a spot. [Coverage](https://coverage.readthedocs.io/) is an easy way to check code coverage using almost any existing tool.

**Why It's Good**

Test coverage, while not a silver bullet, is a great way to maintain a quality code base. It becomes easy to see what the weakest test areas in the project are- just check the reports!

When you are writing new features, a lackluster coverage report can help nudge you in the right direction. I find having a target number helps a lot with my motivation to test.

**How To Use It**

Like everything else on this list, Coverage is installed from PyPy using `pip`:

```bash
pip install coverage
```

To measure coverage of your source code, pass in the directory to `coverage run`:

```bash
# With Pytest
coverage run --source my_project pytest
# View the reports!
coverage report
```

There's also a great [plugin](https://pypi.org/project/pytest-cov/) for Pytest that will run `coverage` alongside Pytest. This is great because you can see the coverage numbers every test. 😎

## 5. MyPy - Type Checking for Python

This is a relatively new addition to my list, but so far I like [MyPy](http://mypy-lang.org/) for typechecking Python. Sometimes there are "gotchyas" if your code (ab)uses the dynamic features of Python, but for the most part it gets things right.

**Why It's Good**

Having good unit test coverage can prevent a lot of `TypeErrors`, but MyPy can augment a good test suite by double checking how you use your types. Type annotations in Python also serve as a form of documentation, showcasing what **exactly** each function and class expects.

The only downside to MyPy is mostly the fact that Python is a dynamic language: MyPy needs types to be defined in external modules if you want to check how you use their code too, plus it doesn't handle things like dynamic class creation.

**How To Use It**

MyPy is also easy to use. You should create a `mypy.ini` file, plus install it from PyPi.

```bash
pip install mypy
```

Run MyPy against your source code directory using the `mypy` command.

```bash
mypy my_project
```

If you don't see anything (and the exit code is zero 😉), congrats- it's working just fine, and your code passed!

## Wrapping Up

Code quality in big projects can be a serious pain, but in a lot of areas our tools can help out. Drop a few of these tools into you CI/CD pipeline, it's easy to get started! A great CI/CD pipeline can save a lot (A LOT) of headache down the road.

**PSST:** I created a [cookiecutter](https://github.com/madelyneriksen/cookiecutter-python-goodstuff/) that shows an example of how I integrate all these into my projects. If you are interested, check it out!

See you around! Cheers.
