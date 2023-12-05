import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const clientId = "f9791754fb254d9e9f2b84afea36afed";
const scopes = [
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-read-private",
];

const redirectUri = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3000";

export const useSpotify = () => {
  const sdk = SpotifyApi.withUserAuthorization(clientId, redirectUri, scopes);

  return {
    sdk,
  };
};
