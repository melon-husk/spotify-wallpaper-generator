import SpotifyWebApi from "spotify-web-api-node";
import "tailwindcss/tailwind.css";
import shuffleArray from "./helpers/shuffleArray";
import login from "./helpers/login";
import downloadBtnClick from "./helpers/downloadBtnClick";
import loadWallpaper from "./helpers/loadWallpaper";
import handleIncrementDecrement from "./helpers/handleIncrementDecrement";
import hydrateImageUrlArray from "./helpers/hydrateImageUrlArray";
import handleInputOnChange from "./helpers/handleInputOnChange";
import handleOnShuffleBtnClick from "./helpers/handleOnShuffleBtnClick";
import showError from "./helpers/showError";

const spotifyApi = new SpotifyWebApi();
//TODO Fix page behavior in landscape mode on mobile devices
// Setting up canvas
const visibleCanvas = <HTMLCanvasElement>document.getElementById("real-canvas");
const visibleCanvasContext = visibleCanvas.getContext("2d");

const downloadableCanvas = <HTMLCanvasElement>(
  document.getElementById("download-canvas")
);
const downloadableCanvasContext = downloadableCanvas.getContext("2d");

///Setting up html elements
const shuffleBtn = document.getElementById("shuffle-btn");
const downloadBtn = document.getElementById("download-btn");
const columnAddBtn = document.getElementById("column-add-btn");
const columnRemoveBtn = document.getElementById("column-remove-btn");
const rowAddBtn = document.getElementById("row-add-btn");
const rowRemoveBtn = document.getElementById("row-remove-btn");
const numberOfColumns = <HTMLInputElement>document.getElementById("col-num");
const numberOfRows = <HTMLInputElement>document.getElementById("row-num");

///Setting up Events
const loginEvent = new Event("login");
const inputOnChangeEvent = new Event("inputOnChangeEvent");

let imageUrls: string[] = [];
let loggedInState = false;

if (visibleCanvasContext && downloadableCanvasContext) {
  downloadableCanvasContext.canvas.width =
    window.innerWidth * window.devicePixelRatio;
  downloadableCanvasContext.canvas.height =
    window.innerHeight * window.devicePixelRatio;

  visibleCanvasContext.canvas.width = window.innerWidth;
  visibleCanvasContext.canvas.height = window.innerHeight;
}

/////////////Start login procedure/////////////
document.addEventListener("login", () => {
  loggedInState = true;
  hydrateImageUrlArray(loggedInState, spotifyApi)
    .then((imageUrlsArray) => {
      const cols = Number(numberOfColumns.value);
      const rows = Number(numberOfRows.value);
      imageUrls = imageUrlsArray;
      ////minimum number of playlist images is 4
      if (imageUrls.length === 4) {
        loadWallpaper(
          2,
          2,
          loggedInState,
          imageUrls,
          visibleCanvasContext!,
          downloadableCanvasContext!
        );
      } else {
        loadWallpaper(
          cols,
          rows,
          loggedInState,
          imageUrls,
          visibleCanvasContext!,
          downloadableCanvasContext!
        );
      }
    })
    .catch((error) => showError(error));
});

if (login(spotifyApi)) {
  document.dispatchEvent(loginEvent);
} else {
  location.href = "login.html";
}
///////////////////////////////////////////////

////Handling Increments and Decrements of column and rows/////
columnAddBtn?.addEventListener("click", () => {
  handleIncrementDecrement(numberOfColumns, "add");
  document.dispatchEvent(inputOnChangeEvent);
});
columnRemoveBtn?.addEventListener("click", () => {
  handleIncrementDecrement(numberOfColumns, "remove");
  document.dispatchEvent(inputOnChangeEvent);
});
rowAddBtn?.addEventListener("click", () => {
  handleIncrementDecrement(numberOfRows, "add");
  document.dispatchEvent(inputOnChangeEvent);
});
rowRemoveBtn?.addEventListener("click", () => {
  handleIncrementDecrement(numberOfRows, "remove");
  document.dispatchEvent(inputOnChangeEvent);
});

document.addEventListener("inputOnChangeEvent", () => {
  handleInputOnChange(numberOfColumns, numberOfRows, imageUrls);
});

////Handling Shuffle button click//////
shuffleBtn?.addEventListener("click", () => {
  handleOnShuffleBtnClick(
    numberOfColumns,
    numberOfRows,
    imageUrls,
    loggedInState,
    visibleCanvasContext!,
    downloadableCanvasContext!
  );
  document.dispatchEvent(inputOnChangeEvent);
});

////Handling Download button click//////
downloadBtn?.addEventListener("click", () => {
  downloadBtnClick(downloadBtn, downloadableCanvasContext!);
});
