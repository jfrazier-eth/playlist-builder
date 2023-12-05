import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const clientId = "f9791754fb254d9e9f2b84afea36afed";
const scopes = [
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-read-private",
];

export const useSpotify = () => {
  const sdk = SpotifyApi.withUserAuthorization(
    clientId,
    "http://localhost:3000",
    scopes,
  );

  return {
    sdk,
  };
};
