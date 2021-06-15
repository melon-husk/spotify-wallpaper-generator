const clientId = "2505559864af412a8c083c15e558d6ea";
const scopes = ["playlist-read-private", "playlist-read-collaborative"];
const token = window.location.hash.substr(1).split("&")[0].split("=")[1];

declare global {
  interface Window {
    spotifyCallback: (payload: string) => void;
  }
}

if (token) {
  window.opener?.spotifyCallback(token);
}

function login(): Promise<string> {
  const popup = window.open(
    `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${"http://192.168.0.2:3000/"}&scope=${scopes}&show_dialog=true`,
    "Login with Spotify",
    "width=800,height=600"
  );
  return new Promise((resolve, _reject) => {
    window.spotifyCallback = (payload: string) => {
      popup?.close();
      console.log(import.meta.env.BASE_URL);
      resolve(payload);
    };
  });
}

export default login;
