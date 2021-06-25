const allImagesLoadedEvent = new Event("images-loaded");

function loadImage(image_url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Error loading image"));
    image.src = image_url;
    image.crossOrigin = "anonymous";
  });
}

function checkIfImagesAreLoaded(loadedImages: number, total_images: number) {
  if (loadedImages === total_images) {
    document.dispatchEvent(allImagesLoadedEvent);
  }
}

function displayImagesOnCanvas(
  rctx: CanvasRenderingContext2D,
  dctx: CanvasRenderingContext2D,
  columns: number,
  rows: number,
  imageUrls: string[]
) {
  let currentWidth = 0;
  let currentHeight = 0;
  let dcurrentWidth = 0;
  let dcurrentHeight = 0;

  const loadedImages: HTMLImageElement[] = [];
  const totalImages = columns * rows;

  /////////////Loading Images first////////////
  imageUrls.forEach((url, index) => {
    if (index > totalImages) return;
    loadImage(url).then((img) => {
      loadedImages.push(img);
      //Check if all are loaded
      checkIfImagesAreLoaded(loadedImages.length, totalImages);
    });
  });
  ///////////////////////////////////////////

  document.addEventListener("images-loaded", () => {
    let imageWidth = rctx.canvas.width / columns;
    let dimageWidth = dctx.canvas.width / columns;
    let imageHeight = imageWidth;
    let dimageHeight = dimageWidth;

    rctx.canvas.height = imageHeight * rows;
    dctx.canvas.height = dimageHeight * rows;
    loadedImages.forEach((image) => {
      rctx.drawImage(
        image,
        currentWidth,
        currentHeight,
        imageWidth,
        imageHeight
      );
      currentWidth += imageWidth;
      if (currentWidth >= rctx.canvas.width) {
        currentWidth = 0;
        currentHeight += imageHeight;
      }
      dctx.drawImage(
        image,
        dcurrentWidth,
        dcurrentHeight,
        dimageWidth,
        dimageHeight
      );
      dcurrentWidth += dimageWidth;
      if (dcurrentWidth >= dctx.canvas.width) {
        dcurrentWidth = 0;
        dcurrentHeight += dimageHeight;
      }
    });
  });
}

export default displayImagesOnCanvas;
