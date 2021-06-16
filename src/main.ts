import login from "./login";
import "./style.css";

import SpotifyWebApi from "spotify-web-api-node";
const spotifyApi = new SpotifyWebApi();
const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const loggedInEvent = new Event("loggedIn");
let loggedInState = false;
let accessToken: string | null = null;
const loginButton = document.getElementById("login");
const getMeButton = document.getElementById("get-me");

if (ctx) {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
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

getMeButton?.addEventListener("click", () => {
  if (loggedInState) {
    spotifyApi.getUserPlaylists({ limit: 50 }).then(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
});

document.addEventListener("loggedIn", () => {
  loggedInState = true;
  // spotifyApi.getMe().then(
  //   function (data) {
  //     console.log("User", data.body);
  //   },
  //   function (err) {
  //     console.error(err);
  //   }
  // );

  // spotifyApi.getUserPlaylists().then(
  //   function (data) {
  //     console.log("Playlists", data.body);
  //   },
  //   function (err) {
  //     console.error(err);
  //   }
  // );
});
