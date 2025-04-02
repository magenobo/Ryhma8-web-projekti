
//QUESTIONS = IMAGES AND THEIR ANSWERS
var questions =[
    { src: " ", answer: "Italia"},
    { src: " ", answer: "Intia"},
    { src: " ", answer: "Etelä-Korea"},
    { src: " ", answer: "Meksiko"},
    { src: " ", answer: ""},
];

 //current image number
var currentImage = 0;


//function, current image and answer
function loadImage() {
    const question = questions[currentImage];
    document.getElementById('image').src = image.src;
}



//checks if the answer is right
function checkAnswer() {

}

//goes to the next question
function nextImage() {
    currentImage += 1;
}

