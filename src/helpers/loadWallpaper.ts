import displayImagesOnCanvas from "./displayImagesOnCanvas";

function loadWallpaper(
  columns: number,
  rows: number,
  loggedInState: boolean,
  imageArray: string[],
  visibleCanvasContext: CanvasRenderingContext2D,
  downloadableCanvasContext: CanvasRenderingContext2D
) {
  if (loggedInState && imageArray.length > 0) {
    ///////clear both canvas//////
    visibleCanvasContext?.clearRect(
      0,
      0,
      visibleCanvasContext.canvas.width,
      visibleCanvasContext.canvas.height
    );
    downloadableCanvasContext?.clearRect(
      0,
      0,
      downloadableCanvasContext.canvas.width,
      downloadableCanvasContext.canvas.height
    );
    ///////////////////////////

    //////display image on canvas//////
    displayImagesOnCanvas(
      visibleCanvasContext,
      downloadableCanvasContext,
      columns,
      rows,
      imageArray
    );
    //////////////////////////////////
  }
}
export default loadWallpaper;
