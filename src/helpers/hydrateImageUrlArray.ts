import SpotifyWebApi from "spotify-web-api-node";

function hydrateImageUrlArray(
  loggedInState: boolean,
  spotifyApi: SpotifyWebApi
): Promise<string[]> {
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
export default hydrateImageUrlArray;
