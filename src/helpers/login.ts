import SpotifyWebApi from "spotify-web-api-node";

function login(spotifyApi: SpotifyWebApi): boolean {
  const token = sessionStorage.getItem("token");
  if (token) {
    spotifyApi.setAccessToken(token);
    return true;
  }
  return false;
}

export default login;
