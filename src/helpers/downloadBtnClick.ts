import showError from "./showError";

function downloadBtnClick(
  downloadBtn: HTMLLinkElement,
  downloadableCanvasContext: CanvasRenderingContext2D
) {
  try {
    downloadBtn.setAttribute("download", "image.jpeg");
    downloadBtn.setAttribute(
      "href",
      downloadableCanvasContext.canvas
        .toDataURL("image/jpeg")
        .replace("image/jpeg", "image/octet-stream")
    );
  } catch (error: any) {
    showError(error);
  }
}
export default downloadBtnClick;
