---

type: "post"
title: "Conway's Game of Life With Pure Python"
category: "tutorial"
date: "2019-02-02"
slug: "/python-game-of-life"
postImage: "./img/life.jpg"
metaDescription: "Conway's Game of Life takes place in an infinite matrix of cells. We can implement this in pure Python using dictionaries (hashmaps)."

---

_The Game of Life_ (or _Life_) is a simple cellular automata created by John Conway. _Life_ takes place on an infinite matrix of cells, that may either be alive or dead.

_Life_ is a _sparse matrix_, meaning most cells at any given time are dead. Array implementations for _Life_ will waste a lot of space storing dead cells. Also, array implementations that use iteration over all cells are slow, at O(_n_) Enter the Hashmap!

In lower level languages, a hashmap is a value store with a function that maps keys to indexes. It does this with a hashing function that stores values in an array, based on a key that gets hashed. There are more considerations, like hash collisions, but that's the basics. The Python equivalent is a dictionary. Dictionaries are even implemented as hashmaps in CPython!

"What does this have to do with _Life_?" Don't worry, we're getting there. Let's look at some code:

```python
my_var = {
    ('hello', 'world'): "my value"
}
print([my_var['hello', 'world'])
```

Yep, this is valid Python3 code; you can store tuples in dictionaries! I bet you can already guess where this is going.

We'll store live cells in the dictionary under their X and Y coordinates, and any cell not stored is dead.

(**Note:** for other sparse matrices, positions might be important if you want to iterate in order. In _Life_, cells get checked in any order, so we're good.)

Consider this Life `class` implementation:

```python

class Life(dict):
    """Conway's Game of Life."""
    def __init__(self, *args, **kwargs):
        super(Life, self).__init__(*args, **kwargs)

    def __missing__(self):
        return 0

game = Life(
    {
        (100, 101): 1
    }
)
```

Cool, so we can represent a huge grid of dead cells. We've already got a leg up on traditional matrix representations! Even better, it's pretty fast. Checking if cells are alive, adding cells, and deleting cells are all O(1) operations.

If you've used Python for a bit, you might notice we're not using `defaultdict`. This is intentional; `defaultdict` creates missing values. Instead, we can override the methods of a regular dictionary.

## Implementing The Game

As a refresher, the rules for _Life_ are:

* Any live cell with fewer than two live neighbors dies.
* Any live cell with two or three live neighbors lives.
* Any live cell with more than three live neighbors dies.
* Any dead cell with exactly three live neighbors becomes a live cell.

**Checking For Life**

Because our `life` class only stores live values, we need a way of finding their neighbors. Traditional iteration through elements won't work.

Instead, from each cell we will calculate the coordinates of all neighbors. At the end, we'll apply the rules for whether cells live or die by checking the sum.

Here's a code example for checking if a cell should live or die:

```python
def check_cell(self, x: int, y: int):
    """Generation step for a cell. Determine if it lives or dies."""
    x_coords = (x-1, x, x+1)
    y_coords = (y-1, y, y+1)
    total = 0

    for x_coord in x_coords:
        for y_coord in y_coords:
            total += self[x_coord, y_coord]

    live, dead = [], []
    cell = self[x, y]
    if total == 3 and not cell:
        # Dead cell with three neighbors becomes alive.
        live.append((x, y))
    elif total < 3 or total > 4 and cell:
        # Live cells with too many or too few neigbors die.
        dead.append((x, y))
    elif cell:
        # Goldilox live cells live.
        pass
    return live, dead
```

**Checking All Cells**

A core mechanic of _Life_ is that dead cells can become live cells in the right conditions. We need to write a method that will collect all cells that could change. Then, we'll check if any of those cells do change.

I settled on doing this in a similar way to the `check_cell` method up above. Coordinate pairs grab all neighbors and we'll check those. Thankfully, _Life_ won't let cells spread past direct neighbors in one generation.

```python
def queue_cells(self):
    """Get a list of all cells that need to be checked this generation."""
    cells = []
    for x, y in self.keys():
        x_coords = (x-1, x, x+1)
        y_coords = (y-1, y, y+1)
        for x_coord in x_coords:
            for y_coord in y_coords:
                cells.append((x_coord, y_coord))
    return cells
```

**Making a Generation**

Once we have a list of all cells to check, we need to apply the `check_cell` method to them all. Dead cells then get removed from the grid, while new cells are born.

We can write a method to handle a generation of the game:

```python
def play_game(self):
    """Play one generation in Life."""
    live, dead = [], []
    for x, y in self.queue_cells():
        step_live, step_dead = self.check_cell(x, y)
        live += step_live
        dead += step_dead
    # Apply all changes.
    for x, y in dead:
        if self[x, y]:
            del self[x, y]
    for x, y in live:
        self[x, y] = 1
```

At this point, you have finished! _Life_ is fully implemented, and your dictionary-based implementation should be super fast!

## Bonus Points: Creating a UI

You're probably thinking something like, "Great, but how do I _see_ it?". Let's build a simple GUI with `curses`! The observer will be able to move a viewport around the grid.

Add some extra imports to the top of your file:

```python
import curses
import time
```

Our game loop is a function called `loop`. This function will be called in the `curses.wrapper` helper, and takes a screen as an argument.

We also save the screen origin X and Y coordinates relative to the board. These values are `adjust_x` and `adjust_y`, as they adjust the viewport's position.

```python
def loop(screen):
    """Main Game Loop"""
    # We initialize our board with an r-pentomino
    game = Life(
        {
            (25, 25): 1,
            (26, 25): 1,
            (25, 26): 1,
            (24, 26): 1,
            (25, 27): 1,
        }
    )
    screen.nodelay(True)
    adjust_x, adjust_y = 0, 0
```

Let's add the loop, as well as the ability to move around! Still in your `loop` function, add the following:

```python
def loop(screen):
    # ...snip
    while True:
        move = screen.getch()
        if move == ord("h"):
            adjust_x += -1
        elif move == ord("l"):
            adjust_x += 1
        elif move == ord("k"):
            adjust_y += -1
        elif move == ord("j"):
            adjust_y += 1
        elif move == ord("q"):
            exit(0)
        else:
            pass
```

Now we can save player moves according to their directions. Also, if the player presses "q", we break the loop and exit the game.

We can render the screen at the end of the `while` loop with the following code:

```python
def loop(screen):
    # ...snip
    while True:
        # ...snip
        screen.clear()
        game.play_game()
        max_y, max_x = screen.getmaxyx()
        for x, y in game.keys():
            visible_x = (0 + adjust_x) < x < (max_x + adjust_x)
            visible_y = (0 + adjust_y) < y < (max_y + adjust_y)
            if visible_x and visible_y:
                # The try/except here catches an error from printing
                # at the bottom right corner.
                try:
                    screen.addstr(
                        y - adjust_y,
                        x - adjust_x,
                        "X"
                    )
                except curses.error:
                    pass
        curses.curs_set(0)
        screen.refresh()
        time.sleep(.1)
```

Now, add a call to `curses.wrapper` at the end of your file, and you have an awesome implementation of _Life_. The best part? This was all written in pure Python!

```python

if __name__ == "__main__":
    curses.wrapper(loop)
```

## Conclusion and Next Steps

Hopefully, you've learned a little bit about either _Life_ or picking more effective data structures for problems. _Life_ is a great exercise for programmers, and everyone should create their own version at least once!

To read more on _Life_ or sparse matrices, try the following resources:

* [LifeWiki](http://www.conwaylife.com/wiki/Main_Page) has almost every discovered pattern in _Life_.
* [Hashlife](https://en.wikipedia.org/wiki/Hashlife) is a _very_ advanced implementation of _Life_ that uses a quadtree to store patterns. It's what inspired me to write this simple Python implementation.
* [Wikipedia's page](https://en.wikipedia.org/wiki/Sparse_matrix) on sparse matrices is very informative, and covers alternate ways to represent them.

If you found this article interesting or informative, feel free to [contact me](/contact) and let me know! Alternatively, if there was an issue with the article or the code, you can [open an issue](https://github.com/madelyneriksen/game-of-life) over on Github.
