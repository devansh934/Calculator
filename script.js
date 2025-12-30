// Variable Declartion for each button

let acButton = document.getElementById("acBtn");
let backButton = document.getElementById("backBtn");
let percentButton = document.getElementById("percentBtn");
let divideButton = document.getElementById("divideBtn");
let sevenButton = document.getElementById("seven");
let eightButton = document.getElementById("eight");
let nineButton = document.getElementById("nine");
let multiplyButton = document.getElementById("multiplyBtn");
let fourButton = document.getElementById("four");
let fiveButton = document.getElementById("five");
let sixButton = document.getElementById("six");
let minusButton = document.getElementById("minusBtn");
let oneButton = document.getElementById("one");
let twoButton = document.getElementById("two");
let threeButton = document.getElementById("three");
let plusButton = document.getElementById("plusBtn");
let zeroButton = document.getElementById("zero");
let dotButton = document.getElementById("dotBtn");
let equalButton = document.getElementById("equalBtn");
let Display = document.getElementById("display");
let previousOperandElement = document.getElementById("previous-operand")
let doubleZeroButton = document.getElementById("doubleZeroBtn");
//Variables to store user input
let currentOperand = "";
let previousOperand = "";
let operand = null;
let operation = null;
let digit = null;
//Event Listner to all buttons and calls the apppendNumber function when clicked
zeroButton.addEventListener('click', ()=>{
    appendNumber(0);
})
oneButton.addEventListener('click', ()=>{
    appendNumber(1);
})
twoButton.addEventListener('click', ()=>{
    appendNumber(2);
})
threeButton.addEventListener('click', ()=>{3
    appendNumber(3);
})
fourButton.addEventListener('click', ()=>{
    appendNumber(4);
})
fiveButton.addEventListener('click', ()=>{
    appendNumber(5);
})
sixButton.addEventListener('click', ()=>{
    appendNumber(6);
})
sevenButton.addEventListener('click', ()=>{
    appendNumber(7);
})
eightButton.addEventListener('click', ()=>{
    appendNumber(8);
})
nineButton.addEventListener('click', ()=>{
    appendNumber(9);
})


//Event Listner for + - 
plusButton.addEventListener('click', ()=>{
    chooseOperation("+")
})
minusButton.addEventListener('click', ()=>{
    chooseOperation("-");
})
multiplyButton.addEventListener('click', ()=>{
    chooseOperation("x");
})

divideButton.addEventListener('click', ()=>{
    chooseOperation("÷");
})
percentButton.addEventListener('click', ()=>{
    chooseOperation("%")
})
dotButton.addEventListener('click', ()=>{
    appendNumber(".")
})
acButton.addEventListener('click', ()=>{
    clearDisplay()
})
equalButton.addEventListener('click', ()=>{
    calculate()
})
backButton.addEventListener('click', ()=>{
    currentOperand = currentOperand.toString().slice(0,-1);
    updateDisplay()
})


//Update Display
function updateDisplay(){

    //previousOperandElement.innerText = `${result} ${operand}`;
    if(currentOperand === 'Error'){
        Display.innerText = "Error";
    }
    else{
        Display.innerText = getDisplayNumber(currentOperand) || '0';
    }

    if(operation != null){
        previousOperandElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`
    }
    else{
        previousOperandElement.innerText = '';
    }
}


//Function to append  numbers on the screen
function appendNumber(digit){
    if (digit === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + digit.toString();
        updateDisplay();
}


function getDisplayNumber(number) {
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay;
            
            if (isNaN(integerDigits)) {
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                });
            }
            
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`;
            } else {
                return integerDisplay;
            }
        }


//Function to calculate operations like +, - etc
function calculate(){
    prev = parseFloat(previousOperand);
    curr = parseFloat(currentOperand);
    let result;
    if(isNaN(prev) || isNaN(curr)) return;
    switch(operation){
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '÷':
            if(curr == 0){
                currentOperand = 'Error';
                previousOperand = '';
                operation = undefined;
                updateDisplay();
                break;
            }
            else{
                result = prev / curr;
                break;
            }
        case '%':
            result = (parseFloat(currentOperand)/100).toString(); 
            break;
        default:
            return;
    }
    console.log("result", result)
    operation = undefined;
    currentOperand = result;
    updateDisplay()
}


//Choose Operation Function
function chooseOperation(selectedOperation){
   if(currentOperand === '') return;
   if(previousOperand != ''){
    calculate(selectedOperation);
   }
   operation = selectedOperation;
   previousOperand = currentOperand;
   console.log("Previous Operand", previousOperand)
   currentOperand = '';
   updateDisplay();
}

//Function to clear display
function clearDisplay(){
    previousOperandElement.innerText = "";
    document.getElementById("display").innerText = 0;
    currentOperand = "";
    previousOperand = "";
    operation = undefined;
}
