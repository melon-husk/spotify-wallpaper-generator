function downloadBtnClick(
  downloadBtn: HTMLElement,
  downloadableCanvasContext: CanvasRenderingContext2D
) {
  downloadBtn.setAttribute("download", "image.jpeg");
  downloadBtn.setAttribute(
    "href",
    downloadableCanvasContext.canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream")
  );
}
export default downloadBtnClick;
