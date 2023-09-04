function getTypeButton(key) {
  switch (key) {
    case "C":
    case "+/-":
    case "/":
    case "x":
    case "-":
    case "+":
      return "action-button";
    case "=":
      return "equal-button";
  }
}

function writeNumber(key, displayNumber) {
  if (displayNumber === "0" && key === "0") return displayNumber;

  if (displayNumber === "0" || displayNumber === "Error!") {
    return key;
  } else {
    return displayNumber + key;
  }
}

function writeDot(key, displayNumber) {
  if (displayNumber.includes(".")) return displayNumber;

  return displayNumber + key;
}

function deleteCharacter(displayNumber) {
  if (
    displayNumber === "0" ||
    displayNumber.length === 1 ||
    (displayNumber.includes("-") && displayNumber.length === 2)
  ) {
    return "0";
  } else {
    return displayNumber.slice(0, displayNumber.length - 1);
  }
}

function changeSign(displayNumber) {
  if (displayNumber === "0") return displayNumber;

  if (displayNumber.includes("-")) {
    return displayNumber.slice(1);
  } else {
    return "-" + displayNumber;
  }
}

function performOperation(operator, operation, displayNumber) {
  let newOperation = {
    ...operation,
    num: Number(displayNumber),
    operation: operator,
  };
  return newOperation;
}

function getResult(operation, displayNumber) {
  let op = operation.operation;
  let result = 0;
  if (op === "") return displayNumber;

  if (operation.num !== 0) {
    switch (op) {
      case "+":
        result = operation.num + Number(displayNumber);
        break;
      case "-":
        result = operation.num - Number(displayNumber);
        break;
      case "x":
        result = operation.num * Number(displayNumber);
        break;
      case "/":
        if (displayNumber === "0") {
          return "Error!";
        }
        result = operation.num / Number(displayNumber);
        break;
    }
    return result.toString();
  }
}

export {
  getTypeButton,
  writeNumber,
  writeDot,
  deleteCharacter,
  changeSign,
  performOperation,
  getResult,
};
