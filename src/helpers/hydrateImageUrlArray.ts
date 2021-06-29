import SpotifyWebApi from "spotify-web-api-node";
import showError from "./showError";

function hydrateImageUrlArray(
  loggedInState: boolean,
  spotifyApi: SpotifyWebApi
): Promise<string[]> {
  const imgArray = <string[]>[];
  return new Promise((resolve, _reject) => {
    if (!loggedInState) showError(Error("Please log in again"));
    try {
      spotifyApi.getUserPlaylists({ limit: 50 }).then(
        function (data) {
          data.body.items.forEach((item) => {
            if (item.images.length > 0) {
              const { url } = item.images[0];
              imgArray.push(url);
            }
          });
          if (imgArray.length < 4)
            showError(
              new Error(
                `We only found ${imgArray.length} playlist images, they may not be sufficient to create a wallpaper`
              )
            );
          resolve(imgArray);
        },
        function (error: Error) {
          showError(error);
        }
      );
    } catch (error: any) {
      showError(error);
    }
  });
}
export default hydrateImageUrlArray;
