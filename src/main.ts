import SpotifyWebApi from "spotify-web-api-node";
import displayImagesOnCanvas from "./displayImagesOnCanvas";
import login from "./login";
import "tailwindcss/tailwind.css";

const spotifyApi = new SpotifyWebApi();
// Setting up canvas
const realCanvas = <HTMLCanvasElement>document.getElementById("real-canvas");
const rctx = realCanvas.getContext("2d");
const downloadCanvas = <HTMLCanvasElement>(
  document.getElementById("download-canvas")
);
const dctx = downloadCanvas.getContext("2d");

const loggedInEvent = new Event("loggedIn");
///Setting up html elements
const loginButton = document.getElementById("login");
const loadImageButton = document.getElementById("load-image");
const downloadImage = document.getElementById("download-image");
const numberOfColumns = <HTMLInputElement>document.getElementById("columns");
const numberOfRows = <HTMLInputElement>document.getElementById("rows");

let imageArray: string[] = [];
let loggedInState = false;
let accessToken: string | null = null;

if (rctx && dctx) {
  dctx.canvas.width = window.innerWidth * window.devicePixelRatio;
  dctx.canvas.height = window.innerHeight * window.devicePixelRatio;

  rctx.canvas.width = window.innerWidth;
  rctx.canvas.height = window.innerHeight;
}

loginButton?.addEventListener("click", () => {
  console.log("Clicked");
  login().then((token) => {
    console.log("Access Token", token);
    accessToken = token;
    spotifyApi.setAccessToken(token);
    document.dispatchEvent(loggedInEvent);
  });
});

loadImageButton?.addEventListener("click", () => {
  if (loggedInState) {
    rctx?.clearRect(0, 0, rctx.canvas.width, rctx.canvas.height);
    dctx?.clearRect(0, 0, dctx.canvas.width, dctx.canvas.height);

    spotifyApi.getUserPlaylists({ limit: 50 }).then(
      (data) => {
        data.body.items.forEach((item) => {
          if (item.images.length > 0) {
            const { url } = item.images[0];
            imageArray.push(url);
          }
        });
        displayImagesOnCanvas(
          rctx!,
          dctx!,
          Number(numberOfColumns.value),
          Number(numberOfRows.value),
          imageArray
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
});

document.addEventListener("loggedIn", () => {
  loggedInState = true;
});

downloadImage?.addEventListener("click", () => {
  downloadImage.setAttribute("download", "image.png");
  downloadImage.setAttribute(
    "href",
    dctx!.canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream")
  );
});
