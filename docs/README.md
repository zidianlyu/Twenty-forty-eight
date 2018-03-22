## 2048

### Background

2048 was a hot game back in 2013. This game only require a single player to touch the up, down, left, right keys.

Here are the rules of the games:

1) Player can move either "up", "down", "left" or "right", after each move there are numbers "2" and "4" randomly generated on the direction the user chosen.
2) For any two boxed with the same number, they collapse and generate a new box; the new box's value is equal to the sum of those two boxes collapsed
3) Until all the space on the board are occupied and no collapse can be made, the game is over.


### Functionality & MVP  

With this 2048 game, users will be able to:

- [ ] Start the game board
- [ ] Toggle the screen in four direction

In addition, this project will include:

- [ ] A index.html file, which will be used to render the game
- [ ] A README.md file, which give a direction to the plan
- [ ] A production README

### Wireframes

This app will consist of a single screen with a 4 x 4 game board,
game controls, and nav links to the Github, and my LinkedIn.

![wireframes](images/2048_proposal.png)

### Architecture and Technologies


This project will be implemented with the following technologies:

There will be only only script involved in this project

`game.js`: this script will handle the following things:
  initialize the game board
  generate random tiles
  move the tiles
  merge two same tiles and generate another one
  handle game over

### Implementation Timeline

**Day 1**: Build board and be able to create tiles

Building the board of the game, have a show page on the site
Goals for the day:
Need to build out the

- build the menu at `index.html`
- show have all the menus that needed in the homepage
- be able to generate the tile on the board
- `Tile` object

**Day 2**: Figure out the tiles merge calculate(backend)

Get the game playable
Goals for the day:
Need to build out the

- Complete the `game.js` module (constructor, update functions, buttons case function, game over function)
- Make each Tile on the board collapsable
- Be able to post the Game Over information if game ended

**Day 3**: Styling the game board and Tile(frontend)

Make sure the game perfectly render, and beautiful
Goals for the day:

- get the last minute bugs fixed
- styling the grid to make it looks more stunning
- add audio/visual effects when collapsing


**Day 4**: Try to build the AI features on the game

Try to initialize a automatic player to play the game
Goals for the day:

- make sure the AI can keep playing util game over


### Bonus features

There are many directions this game could eventually go.  
Some anticipated updates are:

- [ ] Add music to the background
- [ ] add a firework effect when collapse happened
- [ ] add a AI to play the game automatically
