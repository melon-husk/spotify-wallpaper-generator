const loginButton = document.getElementById("login-btn");
import "tailwindcss/tailwind.css";

declare global {
  interface Window {
    spotifyCallback: (payload: string) => void;
  }
}

const clientId = "2505559864af412a8c083c15e558d6ea";
const scopes = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-email",
  "user-read-private",
];
const token = window.location.hash.substr(1).split("&")[0].split("=")[1];

if (token) {
  window.opener?.spotifyCallback(token);
}

function login(): Promise<string> {
  const popup = window.open(
    `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${window.location.href}&scope=${scopes}&show_dialog=false`,
    "Login with Spotify",
    "width=800,height=600"
  );
  return new Promise((resolve, _reject) => {
    window.spotifyCallback = (payload: string) => {
      popup?.close();
      resolve(payload);
    };
  });
}

loginButton?.addEventListener("click", () => {
  login().then((token) => {
    if (token) {
      sessionStorage.clear();
      sessionStorage.setItem("token", token);
      location.href = "index.html";
    } else {
      location.href = "login.html";
    }
  });
});

export {};
