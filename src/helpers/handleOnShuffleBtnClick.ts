import loadWallpaper from "./loadWallpaper";
import shuffleArray from "./shuffleArray";

function handleOnShuffleBtnClick(
  numberOfColumns: HTMLInputElement,
  numberOfRows: HTMLInputElement,
  imageUrls: string[],
  loggedInState: boolean,
  visibleCanvasContext: CanvasRenderingContext2D,
  downloadableCanvasContext: CanvasRenderingContext2D
) {
  const colNum = Number(numberOfColumns.value);
  const rowNum = Number(numberOfRows.value);
  const maxValue = imageUrls.length;
  const multipliedValue = colNum * rowNum;
  if (multipliedValue > maxValue) return;
  imageUrls = shuffleArray(imageUrls);
  loadWallpaper(
    colNum,
    rowNum,
    loggedInState,
    imageUrls,
    visibleCanvasContext!,
    downloadableCanvasContext!
  );
}

export default handleOnShuffleBtnClick;
