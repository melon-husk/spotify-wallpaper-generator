import SpotifyWebApi from "spotify-web-api-node";
import showError from "./showError";

function login(spotifyApi: SpotifyWebApi): boolean {
  try {
    const token = sessionStorage.getItem("token");
    if (token) {
      spotifyApi.setAccessToken(token);
      return true;
    }
  } catch (error: any) {
    showError(error);
  }
  return false;
}

export default login;
