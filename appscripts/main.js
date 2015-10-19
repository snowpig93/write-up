// To use the sound on a web page with its current parameters (and without the slider box):
require.config({
    paths: {"jsaSound": "http://animatedsoundworks.com:8001"}
});

//http://speckyboy.com/demo/windmill-demo/index.html
require(
    ["jsaSound/jsaModels/jsaFMnative2"],

    function (sound1Factory) {
            
        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));
        
        var bgmusic = new Audio("resources/halloween.mp3");
        //bgmusic.play();

        var pWidth = paper.canvas.offsetWidth;
        var pHeight = paper.canvas.offsetHeight;

        //Instruction box
        var insBox = paper.rect(100,100,400,200);
        insBox.attr({
            stroke: "black",
            fill:"#FFB2B2",
        });
        //Instructions
        var insText = paper.text(300,180,"Welcome!!!\nThis is a game that tests your reactions.\nTo start, click on the start button =.=\nYoull see a box.\nClick on it.\nClick on it again...\nand again...\nand again...");       
        insText.attr({
        'font-size': 15,
        stroke: "black",
        });

        var counter = 0;
        var starttime;
        var totaltime = 10;

        var startButton = paper.circle(300, 300, 40);
        startButton.attr({
            stroke: "black",
            fill: "red",
            strokeWidth: "5"
        });


        var startText = paper.text(300, 300, 'START');
        startText.attr({
            'font-size': 15,
            stroke: "black",
        });

        startButton.hide();
        startText.hide();
        insBox.hide();
        insText.hide();

        var ready = function(){
        	startButton.show();
        	startText.show();
            insBox.show();
            insText.show();
        }

        //Start function. Hides button and instruction, shows prompt box.
        var start = function (){
            // Prompt box & message to allow plays to enter difficulty levels.
            var prompt1 = prompt("Before you OFFICIALLY start, please set a difficulty level by entering a number between 1 to 50. (1 is more difficult)", "1");
           
            if (prompt1 > 50){
                //promt msg to tell players to re-enter difficulty level
                confirm("Do you NOT read ENGLISH?! I said choose a number BETWEEN 1 and 50!");
                var prompt1 = prompt("Before you OFFICIALLY start, please set a difficulty level by entering a number between 1 to 50.", "1");
            }

            if (prompt1 < 1){
                //promt msg to tell players to re-enter difficulty level
                confirm("Sorry, you cannot set the difficulty level by entering your IQ. ");
                var prompt1 = prompt("Before you OFFICIALLY start, please set a difficulty level by entering a number between 1 to 50.", "1");
            }

            console.log("You have set a difficulty level of " + prompt1);
            
            // Size of rect1 changes with the difficulty set^^
            rect1.attr({
                width: prompt1,
                height: prompt1,
            });

            console.log("Game is starting!");
            startButton.hide();
            startText.hide();
            insBox.hide();
            insText.hide();
            starttime ;

            counter = -1;
            starttime = Date.now();
            console.log("time = " + starttime);

            moveSquare();

        }
        //Start button. Prompt box appear when start button is clicked
        //When the game is starts, the instruction will disappear.
        startButton.node.addEventListener('click', start) 

        //-----------------------------------------

        var rect1 = paper.rect(-100,-100,50,50);
        rect1.attr({
            'fill': "hsl(240, 50, 50)",
            'stroke': '#3b4449',
            'stroke-width': 10,
            'stroke-linejoin': 'round',
            'opacity': .75
        });
        

         var randInt = function( m, n ) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        var moveSquare = function(){
            var posX, posY;

            var sound1 = sound1Factory();

            sound1.setParam("play", 1);    //or// sound1.setParamNorm("play", 0.500);
            sound1.setParam("Carrier Frequency", 535.44);    //or// sound1.setParamNorm("Carrier Frequency", 0.419);
            sound1.setParam("Modulation Index", 18.42);    //or// sound1.setParamNorm("Modulation Index", 0.184);
            sound1.setParam("Modulator Frequency", 67.72);    //or// sound1.setParamNorm("Modulator Frequency", 0.339);
            sound1.setParam("Gain", 0.25);    //or// sound1.setParamNorm("Gain", 0.250);
            sound1.setParam("Attack Time", 0.05);    //or// sound1.setParamNorm("Attack Time", 0.050);
            sound1.setParam("Release Time", 1);    //or// sound1.setParamNorm("Release Time", 0.333);

         /*   function MoveEffect(rect1){
            new Effect.MoveBy(rect1, {x:posX,y:posY,duration:1})
         };  */  

        rect1.node.addEventListener('click', moveSquare);
        // After each click, the square will move to a new location.               
        counter++;
            console.log("your square move count is now " + counter);

           totaltime = (Date.now()-starttime)/1000;

            if (totaltime > 10) {
                sound1.stop();
                confirm("You completed " + counter + " clicks within 10 seconds.", ready()); // Put the start button and instructions back on the screen after game
                rect1.attr({
                    x: -100,
                    y: -100
                });      

            } else {
                posX = randInt(0,5);
                posY = randInt(0,3);

                //var moveNow = setInterval ("posX, posY",200);
                rect1.attr({
                    x: posX*100,
                    y: posY*100
                });

                //frequency of sound changes with position of rect1.
                //sound1.setParamNorm("Carrier Frequency", (2*pWidth)/posX);
                //sound1.setParamNorm("Modulation Index", (2*pHeight)/posY);
            }
        }
    ready();
    }
);