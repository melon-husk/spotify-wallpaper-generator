import SpotifyWebApi from "spotify-web-api-node";
import displayImagesOnCanvas from "./helpers/displayImagesOnCanvas";
import "tailwindcss/tailwind.css";

const spotifyApi = new SpotifyWebApi();

// Setting up canvas
const realCanvas = <HTMLCanvasElement>document.getElementById("real-canvas");
const rctx = realCanvas.getContext("2d");
const downloadCanvas = <HTMLCanvasElement>(
  document.getElementById("download-canvas")
);
const dctx = downloadCanvas.getContext("2d");

///Setting up html elements
const shuffleBtn = document.getElementById("shuffle-btn");
const downloadBtn = document.getElementById("download-btn");
const columnAddBtn = document.getElementById("column-add-btn");
const columnRemoveBtn = document.getElementById("column-remove-btn");
const rowAddBtn = document.getElementById("row-add-btn");
const rowRemoveBtn = document.getElementById("row-remove-btn");
const numberOfColumns = <HTMLInputElement>document.getElementById("col-num");
const numberOfRows = <HTMLInputElement>document.getElementById("row-num");

let imageArray: string[] = [];
let loggedInState = false;

if (rctx && dctx) {
  dctx.canvas.width = window.innerWidth * window.devicePixelRatio;
  dctx.canvas.height = window.innerHeight * window.devicePixelRatio;

  rctx.canvas.width = window.innerWidth;
  rctx.canvas.height = window.innerHeight;
}
//start login procedure
login();

////Handling Increments and Decrements of column and rows/////
columnAddBtn?.addEventListener("click", () => {
  numberOfColumns.value = `${Number(numberOfColumns.value) + 1}`;
});
columnRemoveBtn?.addEventListener("click", () => {
  if (Number(numberOfColumns.value) <= 2) return;
  numberOfColumns.value = `${Number(numberOfColumns.value) - 1}`;
});
rowAddBtn?.addEventListener("click", () => {
  numberOfRows.value = `${Number(numberOfRows.value) + 1}`;
});
rowRemoveBtn?.addEventListener("click", () => {
  if (Number(numberOfRows.value) <= 3) return;
  numberOfRows.value = `${Number(numberOfRows.value) - 1}`;
});

////Handling Shuffle button click//////
shuffleBtn?.addEventListener("click", () => {
  loadWallpaper(Number(numberOfColumns.value), Number(numberOfRows.value));
});

////Handling Download button click//////
downloadBtn?.addEventListener("click", () => {
  downloadBtn.setAttribute("download", "image.jpeg");
  downloadBtn.setAttribute(
    "href",
    dctx!.canvas
      .toDataURL("image/jpeg")
      .replace("image/jpeg", "image/octet-stream")
  );
});

////Login function////
function login() {
  if (sessionStorage.getItem("token")) {
    const token = sessionStorage.getItem("token");
    console.log("Access Token", token);
    spotifyApi.setAccessToken(token!);
    loggedInState = true;
    hydrateImageUrlArray()
      .then((imageUrls) => {
        imageArray = imageUrls;
        loadWallpaper(
          Number(numberOfColumns.value),
          Number(numberOfRows.value)
        );
      })
      .catch((error) => console.log(error));
  } else {
    location.href = "login.html"; //uncomment during prod
  }
}

////Loading Wallpaper Function////////
function loadWallpaper(columns: number, rows: number) {
  if (loggedInState && imageArray.length > 0) {
    rctx?.clearRect(0, 0, rctx.canvas.width, rctx.canvas.height);
    dctx?.clearRect(0, 0, dctx.canvas.width, dctx.canvas.height);

    displayImagesOnCanvas(rctx!, dctx!, columns, rows, imageArray);
  }
}

///Hydrate Image Url/////
function hydrateImageUrlArray(): Promise<string[]> {
  const imgArray = <string[]>[];
  return new Promise((resolve, reject) => {
    if (!loggedInState) reject(Error("User not logged in"));
    spotifyApi.getUserPlaylists({ limit: 50 }).then(
      function (data) {
        data.body.items.forEach((item) => {
          if (item.images.length > 0) {
            const { url } = item.images[0];
            imgArray.push(url);
          }
        });
        if (imgArray.length < 1) reject(new Error("Array is empty"));
        console.log(imgArray);
        resolve(imgArray);
      },
      function (error) {
        reject(new Error(error));
      }
    );
  });
}
