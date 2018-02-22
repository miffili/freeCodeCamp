### Simon Game for [freeCodeCamp](https://www.freecodecamp.org/challenges/build-a-simon-game)

#### Assignment
Build a Simon Game. Use whichever libraries or APIs you need. Give it your own personal style.  
Fulfill the below **user stories**:
- as a user, I am presented with a random series of button presses  
- each time I input a series of button presses correctly, I see the same series of button presses but with an additional step  
- I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button  
- if I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again  
- I can see how many steps are in the current series of button presses  
- if I want to restart, I can hit a button to do so, and the game will return to a single step  
- I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses  
- I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over

#### Implementation
This final project was a great one. I've had the design in my head way before starting this game & with a ton of work it came to life. :blush:  
Other than the original game, I opted for spheres in different colors, that play a piano tone & glow up, when hit. All tones together result in G major.  
The key learning from this project is the usage of setTimeout() in JavaScript. But because of my ambitious styling, I learned a lot about CSS animations & other CSS features as well.
*Note*: The game, other than described in the user stories, starts not over after the user is notified of the win. Instead it is reset & the user can either play freely with the spheres or starts a new game actively.

#### Made with
- HTML, CSS, vanilla JavaScript  
- Piano sounds from [University of Iowa Electronic Music Studios](/theremin.music.uiowa.edu/MISpiano.html)  
- Buzzer & gameover sounds from [www.orangefreesounds.com](https://www.orangefreesounds.com) (licensed by CC BY-NC 4.0)  
- Favicon made by Freepik from [www.flaticon.com](https://www.flaticon.com) (licensed by CC 3.0 BY)  
♥

#### Preview

Check out the [live preview](https://miffili.github.io/freeCodeCamp/FED-simongame)

![Screenshot of the Simon Game for freeCodeCamp](https://raw.githubusercontent.com/Miffili/freeCodeCamp/4205b6ceac78b9108df5c0159dbe8e6839618909/FED-simongame/preview/SimonGame.png "Screenshot of the Simon Game for freeCodeCamp")
