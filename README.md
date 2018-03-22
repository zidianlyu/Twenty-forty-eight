## Twenty-forty-eight

[live][Twenty-forty-eight]

[Twenty-forty-eight]:
https://zidianlyu.github.io/Twenty-forty-eight/

### Background
This game only require a single player to touch the up, down, left, right keys.

Here are the rules of the games:

1) Player can move either "up", "down", "left" or "right", after each move there are numbers "2" and "4" randomly generated on the direction the user chosen.
2) For any two boxed with the same number, they collapse and generate a new box; the new box's value is equal to the sum of those two boxes collapsed
3) Until all the space on the board are occupied and no collapse can be made, the game is over.

## Features & Implementation
### Game Start Page

On the game page, user can press the start button to start game, the score board will reset to zero and start counting
![image of game start page](https://github.com/zidianlyu/Twenty-forty-eight/blob/master/docs/wireframes/game_start_page.png)

### Update game board

Through pressing the arrow buttons, the player will receive scores from tile moving and merging.
![image of game board update](https://github.com/zidianlyu/Twenty-forty-eight/blob/master/docs/wireframes/game_board_update.png)

By applying the backtracking algorithm, the player will receive the optimized merging result in each step.
```javascript
for(let i = 1; i < this.tiles.length; i++){
  j = i;
  while(j % 4 != 0){
    this.merge(this.tiles[j - 1], this.tiles[j]);
    j -= 1;
  }
}
```

### Styling
import Couldflare fontawesome library and GoogleApi to stylize fonts in the game
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Josefin+Slab">
```

## Future Directions for the Project

### AI Implementation

A button with Auto Play will be added to the game so that the game will render itself automatically and achieve a certain score.
