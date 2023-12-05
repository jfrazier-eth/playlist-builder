import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useItem } from "./pagination";

export const useUser = (sdk: SpotifyApi) => {
  const getItem = () => {
    return sdk.currentUser.profile();
  };

  return useItem(getItem);
};
