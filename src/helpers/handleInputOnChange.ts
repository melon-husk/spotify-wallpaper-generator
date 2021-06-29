import showError from "./showError";

function handleInputOnChange(
  numberOfColumns: HTMLInputElement,
  numberOfRows: HTMLInputElement,
  imageUrls: string[]
) {
  try {
    const colNum = Number(numberOfColumns.value);
    const rowNum = Number(numberOfRows.value);
    const maxValue = imageUrls.length;
    const multipliedValue = colNum * rowNum;
    if (multipliedValue > maxValue) {
      numberOfColumns.style.border = "2px solid red";
      numberOfRows.style.border = "2px solid red";
      return;
    }
    numberOfColumns.style.border = "";
    numberOfRows.style.border = "";
  } catch (error: any) {
    showError(error);
  }
}

export default handleInputOnChange;
