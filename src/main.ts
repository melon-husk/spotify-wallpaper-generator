import login from "./login";
import "./style.css";

import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi();
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const loginButton = document.getElementById("login");
const loggedInEvent = new Event("loggedIn");

if (ctx) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

loginButton?.addEventListener("click", () => {
  console.log("Clicked");
  login().then((token) => {
    spotifyApi.setAccessToken(token);
    document.dispatchEvent(loggedInEvent);
  });
});

document.addEventListener("loggedIn", () => {
  spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE").then(
    function (data) {
      console.log("Artist albums", data.body);
    },
    function (err) {
      console.error(err);
    }
  );
});
