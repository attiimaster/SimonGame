"use strict";

const btnColors = [ "rgb(255, 255, 0)", "rgb(0, 51, 204)", "rgb(0, 255, 0)", "rgb(255, 0, 0)" ];

let sequence = [];    // sequence to reproduce
let input = [];       // sequence of player inputs
let isStrict = false;

//button config
document.querySelectorAll(".pad").forEach(pad => pad.addEventListener("click", inputHandler));
document.getElementById("start").addEventListener("click", setup);
document.getElementById("toggleStrict").addEventListener("click", toggleStrict);


function reset() {
  // necessary, because we want to be able to reset, without starting a new game (eg. when toggling strict mode)
  sequence = [];
  input = [];
}

function setup() {
  reset();
  nextTurn();
}

// button handlers
function inputHandler(e) {
  const id = Number(e.target.attributes.id.value);
  input.push(id);
  animateButton(id);
  checkInput(sequence, input);
}

function toggleStrict() {
  const el = document.getElementById("toggleStrict");
  reset();
  
  if(!isStrict) {
    isStrict = true;
    el.setAttribute("style", "background: rgb(255, 0, 0, 0.8); box-shadow: 0px 0px 10px 1px red");
  } else {
    isStrict = false
    el.setAttribute("style", "background: silver");
  }
}

// game logic
function nextTurn() {
  let x = Math.floor((Math.random() * 4));
  let counter = document.querySelector(".counter");
  sequence.push(x);

  animateSequence();
  input = [];
  setTimeout(() => counter.innerHTML = sequence.length, 1000)
};

function checkInput(seq, input) {
  if (seq[input.length - 1] !== input[input.length - 1]) {  // if wrong
    errorAnimation();
    
    // check, if strict mode is enabled => end game on first error
    if (isStrict) {
      alert("You made it to round " + (seq.length) + ", nice!");
      reset();
    } else {
      input = [];
      animateSequence();
    }

  // win, if you complete round 20
  } else if (input.length > 20) {
    alert("You WON!");

  } else if (input.length === seq.length) {
    nextTurn();
  }
};

// animations
function animateSequence() {
  let i = 0;
  let int = setInterval(function() {
    if(i+1 === sequence.length) {
      clearInterval(int);
    }
    animateButton(sequence[i]);
    i++;
  }, 1000);
}

function animateButton(id) {
  const el = document.getElementById(id);
  el.setAttribute("style", "background: white");
  playSound(`https://s3.amazonaws.com/freecodecamp/simonSound${id + 1}.mp3`);  // sound files are named 1, 2, 3, 4
  setTimeout(() => el.setAttribute("style", `background: ${btnColors[id]}`), 400);
}

function errorAnimation() {
  const el = document.querySelector(".container");
  el.setAttribute("style", "box-shadow: 0px 0px 300px 40px red;");
  setTimeout(() => el.setAttribute("style", "box-shadow: none;"), 500)
}

function playSound(soundfile) {
  document.getElementById("dummy").innerHTML= "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\"loop=\"false\" />";
}