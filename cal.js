// Get references to the display elements
const displayPrimary = document.getElementById('p');
const displaySecondary = document.getElementById('h1');

// Get all the buttons
const buttons = document.querySelectorAll('button');

// Variables to store current and previous values
let currentInput = '';
let previousInput = '';
let operator = null;

// Function to update the display
function updateDisplay() {
  displayPrimary.textContent = currentInput || '0';
  displaySecondary.textContent = previousInput;
}

// Function to handle button clicks
function handleButtonClick(event) {
  const buttonValue = event.target.value;

  switch (buttonValue) {
    case 'AC':
      currentInput = '';
      previousInput = '';
      operator = null;
      break;
    case 'C':
      currentInput = currentInput.slice(0, -1);
      break;
    case '%':
      if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) / 100).toString();
      }
      break;
    case '÷':
    case '×':
    case '-':
    case '+':
      if (currentInput === '' && operator !== null) {
        // Allow changing the operator if none is entered yet
        operator = buttonValue;
      } else if (currentInput !== '') {
        if (previousInput === '') {
          previousInput = currentInput;
          currentInput = '';
        } else {
          previousInput = operate(previousInput, currentInput, operator);
          currentInput = '';
        }
        operator = buttonValue;
      }
      break;
    case '=':
      if (currentInput !== '' && operator !== null) {
        currentInput = operate(previousInput, currentInput, operator);
        previousInput = '';
        operator = null;
      }
      break;
    case '.':
      if (!currentInput.includes('.')) {
        currentInput += '.';
      }
      break;
    default:
      currentInput += buttonValue;
  }

  updateDisplay();
}

// Function to perform the calculations
function operate(a, b, op) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  switch (op) {
    case '÷':
      return (numA / numB).toString();
    case '×':
      return (numA * numB).toString();
    case '-':
      return (numA - numB).toString();
    case '+':
      return (numA + numB).toString();
    default:
      return b;
  }
}

// Add event listeners to the buttons
buttons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});
