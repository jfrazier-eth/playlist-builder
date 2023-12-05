import { PlaylistedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useItem, usePagination } from "./pagination";

export const usePlaylist = (playlistId: string, sdk: SpotifyApi) => {
  const getItem = () => {
    return sdk.playlists.getPlaylist(playlistId);
  };
  return useItem(getItem);
};

export const usePlaylists = (sdk: SpotifyApi) => {
  const loadNext = async (options: { offset: number }) => {
    return await sdk.currentUser.playlists.playlists(20, options.offset);
  };
  const pagination = usePagination(loadNext);

  return pagination;
};

export const usePlaylistTracks = (playlistId: string, sdk: SpotifyApi) => {
  const loadNext = async (options: { offset: number }) => {
    return await sdk.playlists.getPlaylistItems(
      playlistId,
      "US",
      undefined,
      50,
      options.offset,
    );
  };

  return usePagination<PlaylistedTrack>(loadNext);
};
