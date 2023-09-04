let currentInput = "";
let previousInput = "";
let operator = "";
let result = 0;
let shouldClearDisplay = false;

const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    if (value === "clear") {
      clear();
    } else if (value === "backspace") {
      backspace();
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
      handleOperator(value);
    } else if (value === "=") {
      calculate();
    } else {
      handleInput(value);
    }
    updateDisplay();
  });
});

function handleInput(value) {
  if (shouldClearDisplay) {
    currentInput = "";
    shouldClearDisplay = false;
  }
  if (value === "." && currentInput.includes(".")) {
    return;
  }
  currentInput += value;
}

function handleOperator(value) {
  if (currentInput === "") {
    if (value === "-") {
      currentInput += value;
    } else {
      operator = value;
    }
  } else if (previousInput !== "") {
    calculate();
    operator = value;
  } else {
    previousInput = currentInput;
    currentInput = "";
    operator = value;
  }
  shouldClearDisplay = true;
}

function calculate() {
  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
  }
  previousInput = "";
  currentInput = result.toString();
  shouldClearDisplay = true;
}

function clear() {
  currentInput = "";
  previousInput = "";
  operator = "";
  result = 0;
  shouldClearDisplay = false;
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
}

function updateDisplay() {
  display.textContent = currentInput === "" ? "0" : currentInput;
}