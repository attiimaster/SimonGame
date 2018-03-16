let sequence = [];
let input = [];
let isStrict = false;

function nextMove() {
  let x = Math.floor((Math.random() * 4));
  let counter = document.querySelector(".counter");
  sequence.push(x);
  animateSequence()
  input = [];
  console.log(sequence)
  setTimeout(function() {
    counter.innerHTML = "";
    counter.append(sequence.length)}, 1000)
};
//fire interval to animate sequence
function animateSequence() {
  let i = 0;
  let int = setInterval(function() {
    if(i+1 === sequence.length) {clearInterval(int)}
    animateButton(sequence[i]);
    i++;
  }, 1000);
}
//button animation
function animateButton(i) {
  switch(i) {
    case 0:
      document.querySelector(".t-l").setAttribute("style", "background: white")
      playSound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3")
      setTimeout(function() {
        document.querySelector(".t-l").setAttribute("style", "background: rgb(255, 255, 0)")
         }, 400)
       break;
    case 1:
      document.querySelector(".t-r").setAttribute("style", "background: white")
      playSound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3")
      setTimeout(function() {
        document.querySelector(".t-r").setAttribute("style", "background: rgb(0, 51, 204)")
         }, 400)
       break;
    case 2:
      document.querySelector(".b-r").setAttribute("style", "background: white")
      playSound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3")
      setTimeout(function() {
        document.querySelector(".b-r").setAttribute("style", "background: rgb(0, 255, 0)")
         }, 400)
       break;
    case 3:
      document.querySelector(".b-l").setAttribute("style", "background: white")
      playSound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
      setTimeout(function() {
        document.querySelector(".b-l").setAttribute("style", "background: rgb(255, 0, 0)")
         }, 400)
       break;
  }
}
//checks player input 
function checkInput(arr1, arr2) { //(seq, input)
  console.log(arr1, arr2)
  let i = arr2.length;
  let j = arr1.length;
  //if(i > j) {alert("error: input > sequence!")}
  if(arr1[i - 1] !== arr2[i - 1]) {                     //if wrong
    errorAnimation();
    if(isStrict) {                                      //if isStrict
      alert("You made it to round " + (j) + ", nice!")
      reset()
    } else {                                              //if !isStrict
      //alert(" Listen again! . . . Replaying sequence . . . ")
      input = [];
      animateSequence()}
  }
  else if(i > 20) {
    alert("You WON!");
    document.querySelector(".t-l").removeEventListener()
  } else if(i === j) {
    nextMove();
  }
};
//error animation
function errorAnimation() {
  document.querySelector(".container").setAttribute("style", "box-shadow: 0px 0px 300px 40px red;");
  setTimeout(function() {
    document.querySelector(".container").setAttribute("style", "box-shadow: none;");
  }, 500)
}
//button config
document.querySelector(".t-l").addEventListener("click", function() {
  input.push(0);
  animateButton(0);
  checkInput(sequence, input);
});
document.querySelector(".t-r").addEventListener("click", function() {
  input.push(1);
  animateButton(1);
  checkInput(sequence, input);
});
document.querySelector(".b-r").addEventListener("click", function() {
  input.push(2);
  animateButton(2);
  checkInput(sequence, input);
});
document.querySelector(".b-l").addEventListener("click", function() {
  input.push(3);
  animateButton(3);
  checkInput(sequence, input);
});

//play sound
function playSound(soundfile) {
  document.getElementById("dummy").innerHTML= "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\"loop=\"false\" />";
}

//setup
function reset() {
  sequence = [];
  input = [];
}
function setup() {
  reset();
  nextMove();
}

//testbutton
document.getElementById("start").addEventListener("click", setup);

//toggle Strict Mode
document.getElementById("toggleStrict").addEventListener("click", function() {
  reset();
  if(!isStrict) {
    isStrict = true;
    document.getElementById("toggleStrict").setAttribute("style", "background: rgb(255, 0, 0, 0.8); box-shadow: 0px 0px 10px 1px red")
  } else {
    isStrict = false
    document.getElementById("toggleStrict").setAttribute("style", "background: silver")
  }
});

