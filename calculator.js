let firstNum = ''
let secondNum = ''
let operator = null
let resetCalc = false

let numberBtn = document.querySelectorAll('.num')
let operBtn = document.querySelectorAll('.operator')
let eqlBtn = document.getElementById('equals')
let clrBtn  = document.getElementById('delete')
let acBtn = document.getElementById('clear')
let decimalBtn = document.getElementById('point')
let textfield = document.getElementById('text')


eqlBtn.addEventListener('click', solve)
clrBtn.addEventListener('click', clear)
acBtn.addEventListener('click', ac)
decimalBtn.addEventListener('click', decimal)

numberBtn.forEach((button) =>
  button.addEventListener('click', () => append(button.textContent))
)

operBtn.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function append(number) {
  if (textfield.textContent === '0' || resetCalc)
    resetScreen()
  textfield.textContent += number
}

function resetScreen() {
  textfield.textContent = ''
  resetCalc = false
}

function clear() {
  textfield.textContent = '0'
  firstNum = ''
  secondNum = ''
  operator = null
}

function decimal() {
  if (resetCalc) resetScreen()
  if (textfield.textContent === '')
    textfield.textContent = '0'
  if (textfield.textContent.includes('.')) return
  textfield.textContent += '.'
}

function ac() {
  textfield.textContent = textfield.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operation) {
  if (operator !== null) solve()
  firstNum = textfield.textContent
  operator = operation
  resetCalc = true
}

function solve() {
  if (operator === null || resetCalc) return
  if (operator === '/' && textfield.textContent === '0') {
    alert('Zero Divison')
    return
  }
  secondNum = textfield.textContent
  textfield.textContent = roundResult(
    operate(operator, firstNum, secondNum)
  )
  operator = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function add(a, b) {
  return a + b
}
function substract(a, b) {
  return a - b
}
function multiply(a, b) {
  return a * b
}
function divide(a, b) {
  return a / b
}

function operate(operation, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operation) {
    case '+':
      return add(a, b)
    case '-':
      return substract(a, b)
    case '*':
      return multiply(a, b)
    case '/':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}