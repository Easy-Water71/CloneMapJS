const greetingForm = document.querySelector(".js-form");
const greetingInput = greetingForm.querySelector("input");
const greetings = document.querySelector(".js-greetings");

const SHOWING_ON = 'showing';
const USER_LS = 'userName';

function handleSubmit(event){
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askName() {
  greetingForm.classList.add(SHOWING_ON);
  greetingForm.addEventListener("submit", handleSubmit);
}

function saveName(text) {
 localStorage.setItem(USER_LS, text);
}

function paintGreeting(text) {
  greetingForm.classList.remove(SHOWING_ON);
  greetings.classList.add(SHOWING_ON);
  greetings.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();