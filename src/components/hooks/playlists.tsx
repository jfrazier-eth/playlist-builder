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
  const pagination = usePagination(loadNext, true);

  return pagination;
};

export const usePlaylistTracks = (playlistId: string, sdk: SpotifyApi) => {
  const loadNext = async (options: { offset: number }) => {
    const result = await sdk.playlists.getPlaylistItems(
      playlistId,
      "US",
      undefined,
      50,
      options.offset,
    );

    result.items = result.items.filter((item) => !!item.track);
    return result;
  };

  return usePagination<PlaylistedTrack>(loadNext, true);
};
