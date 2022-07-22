window.onload = function() {

//Landing Page

window.addEventListener("scroll", function(){
    var header = document.querySelector(".links");
    header.classList.toggle("sticky", window.scrollY > 0);
})

let resetBtn = document.querySelector("#resetBtn");
let relaxBtn = document.querySelector("#relaxBtn");
let rechargeBtn = document.querySelector("#rechargeBtn");


resetBtn.addEventListener('mouseover', function(event) {
    event.target.innerText = "Create an affirmation";
});
resetBtn.addEventListener('mouseout', function(event){
    event.target.innerText = "Reset";
})

relaxBtn.addEventListener('mouseover', (event) => {
    event.target.innerText = "Focus on your breath";
});

relaxBtn.addEventListener('mouseout', (event) => {
    event.target.innerText = "Relax";
});

rechargeBtn.addEventListener('mouseover', (event) => {
    event.target.innerText = "Take some time to meditate";
});

rechargeBtn.addEventListener('mouseout', (event) => {
    event.target.innerText = "Recharge";
});



let fetchQuoteFunction = () => {


    const quote = "https://type.fit/api/quotes"

    fetch(quote)
    .then(response => response.json())
    .then(json => {
        let quoteContainer = document.querySelector('.quote');
        let index = parseInt(Math.random() * 1643)
            let newQuote = document.createElement('p');
            newQuote.innerHTML = json[index].text;
            quoteContainer.innerHTML = '';
            quoteContainer.appendChild(newQuote);
    })
}

fetchQuoteFunction();

const newQuoteBtn = document.querySelector('.btn');

newQuoteBtn.addEventListener('click', function() {
    fetchQuoteFunction()
});

//Reset page

    function displayAffirmation() {
        const affirmationInput = document.querySelector('#input');
        const displayBtn = document.querySelector("#display-btn");
        const affirmationContainer = document.querySelector(".output");
        affirmationContainer.innerHTML = affirmationInput.value;
        displayBtn.addEventListener('click', displayAffirmation);

    };

    displayAffirmation();

    







//Breathing App
const circleProgress = document.querySelector('.circle-progress');
const numberOfBreaths = document.querySelector('.breath-input');
const start = document.querySelector('.start');
const instructions = document.querySelector('.instructions');
const breathsText = document.querySelector('.breaths-text');

let breathsLeft = 3;

    //selecting breaths
    numberOfBreaths.addEventListener('change', () => {
        breathsLeft = numberOfBreaths.value;
        breathsText.innerText = breathsLeft;
    });

    //circle progress
    const growCircle = () => {
        circleProgress.classList.add("circle-grow");
        setTimeout(() => {
            circleProgress.classList.remove("circle-grow");
        }, 8000);
    };


    //instructions
    const breathTextUpdate = () => {
        breathsLeft--;
        breathsText.innerText = breathsLeft;
        instructions.innerText = "Inhale to fill the circle";
        setTimeout(() => {
            instructions.innerText = "Hold breath...";
            setTimeout(() => {
                instructions.innerText = "Exhale slowly";
            }, 4000);
        }, 4000);
    };

    //breath loop
    const breathingApp = () => {
        const breathingAnimation = setInterval(() => {
            if (breathsLeft === 0) {
                clearInterval(breathingAnimation);
                instructions.innerText = "Relaxation complete. Click 'begin' to start again.";
                start.classList.remove('start-inactive');
                breathsLeft = numberOfBreaths.value;
                breathsText.innerText = breathsLeft;
                return;
            }
            growCircle();
            breathTextUpdate();
        }, 12000);
    };

    //start breathing
    start.addEventListener('click', () => {
            start.classList.add("start-inactive");
            instructions.innerText = "Get comfortable";
            setTimeout(() => {
                instructions.innerText = "Let's begin";
                setTimeout(() => {
                    breathingApp();
                    growCircle();
                    breathTextUpdate();   
                }, 2000);
            }, 2000);

    });



//Mediation App

const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    console.log(outlineLength);
    //Duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick sound
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });
    
    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time');
            let initialTime = Math.floor(fakeDuration % 60)
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${initialTime <= 9 ? "0" + initialTime : initialTime}`;
        })
    });

    //stop and play sounds
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './play.svg';
        }
    };

    //animating the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animate text

        if(seconds <= 9) {
            timeDisplay.textContent = `${minutes}:0${seconds}`;
        } else {
            timeDisplay.textContent = `${minutes}:${seconds}`
        }


     

        if(currentTime >= fakeDuration){
            song.pause();
            song.currentTime = 0;
            play.src = './play.svg';
            video.pause();
        }
    };

};

app();






}

