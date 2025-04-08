
//QUESTIONS = IMAGES AND THEIR ANSWERS
var questions =[
    { src: " ", answer: "Italia",
    hints: ["PIZZA", "Venetsia", "Jotai muuta siistiä"]},

    { src: " ", answer: "Thaimaa",
    hints: [" ", " ", " "]},

    { src: " ", answer: "Algeria",
    hints: [" ", " ", " "]},

    { src: " ", answer: "Meksiko",
    hints: [" ", " ", " "]},

    { src: " ", answer: "Liettua",
    hints: [" ", " ", " "]},

    { src: " ", answer: "Brasilia",
    hints: [" ", " ", " "]},

    { src: " ", answer: "Papua-Uusi-Guinea",
    hints: [" ", " ", " "]},

    { src: " ", answer: "Portugali",
    hints: [" ", " ", " "]},



];

 //current image number
var currentImage = 0;


//function, current image and answer
function loadImage() {
    const image = questions[currentImage];
    document.getElementById('image').src = image.src; //gets the image
    document.getElementById("feedback").textContent= ""; //clears previous feedback
    document.getElementById("answer").value = ""; //clears previous answer
}



//checks if the answer is right
function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.toLowerCase();
    const feedback = document.getElementById("feedback");
    const correctAnswer = questions[currentImage].answer.toLowerCase(); //answer from the questions

    if (userAnswer === correctAnswer) {
        feedback.textContent = "Oikein! Oikea vastaus oli: " + correctAnswer;
    } else {
        feedback.textContent = "Väärin. Oikea vastaus olisi ollut:  " + correctAnswer;
    }

}

//goes to the next question
function nextImage() {
    currentImage = (currentImage + 1) % questions.length
  loadImage();  // Reload the new image
}


function showHint(index) {
    const q=questions[currentImage];
    const hintList = document.getElementById("hintList");

    if (!document.getElementById(`hint-${index}`)) {
        const li = document.createElement('li');
        li.textContent = q.hints[index];
        li.id = `hint-${index}`; // so it doesn’t show again
        hintList.appendChild(li);
      }
}

loadImage()