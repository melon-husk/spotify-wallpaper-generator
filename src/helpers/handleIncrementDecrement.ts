function handleIncrementDecrement(
  inputElement: HTMLInputElement,
  operation: "add" | "remove"
) {
  const value = Number(inputElement.value);
  if (operation === "add") {
    inputElement.value = `${value + 1}`;
  }
  if (operation === "remove" && value > 2) {
    inputElement.value = `${value - 1}`;
  }
}

export default handleIncrementDecrement;
