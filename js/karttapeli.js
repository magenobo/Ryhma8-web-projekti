
//QUESTIONS = IMAGES AND THEIR ANSWERS
var questions =[
    { src: "./img/papukaija3.jpg", answer: "Italia",
    hints: ["PIZZA", "Venetsia", "Jotai muuta siistiä"]},


    { src: "./img/papukaija3.jpg", answer: "Thaimaa",
    hints: ["Kuuma", "Siisti", "Jossai"]},

    { src: "./img/papukaija3.jpg", answer: "Algeria",
    hints: [" ", " ", " "]},

    { src: "./img/papukaija3.jpg", answer: "Meksiko",
    hints: [" ", " ", " "]},

    { src: "./img/papukaija3.jpg", answer: "Liettua",
    hints: [" ", " ", " "]},

    { src: "./img/papukaija3.jpg", answer: "Brasilia",
    hints: [" ", " ", " "]},

    { src: "./img/papukaija3.jpg", answer: "Papua-Uusi-Guinea",
    hints: ["./img/papukaija3.jpg", " ", " "]},

    { src: "./img/papukaija3.jpg", answer: "Portugali",
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
    document.getElementById("hihntList").textContent = ""; //clears hints


    //hint buttons work
    for (let i = 0; i < 3; i++) {
        document.getElementById(`vihjeBtn${i}`).disabled = false;
      }
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
  loadImage();  // reloads next image
}

function showHint(index) {
    const hintList = document.getElementById("vinkit");
    const hint = questions[currentImage].hints[index];
    const li = document.createElement("li");
    li.textContent = hint;
    hintList.appendChild(li)

    document.getElementById(`vihjeBtn${index}`).disabled = true;
}


loadImage()




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
