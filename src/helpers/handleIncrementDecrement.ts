import showError from "./showError";

function handleIncrementDecrement(
  inputElement: HTMLInputElement,
  operation: "add" | "remove"
) {
  try {
    const value = Number(inputElement.value);
    if (operation === "add") {
      inputElement.value = `${value + 1}`;
    }
    if (operation === "remove" && value > 2) {
      inputElement.value = `${value - 1}`;
    }
  } catch (error: any) {
    showError(error);
  }
}

export default handleIncrementDecrement;
