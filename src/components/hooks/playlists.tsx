import {
  AudioFeatures,
  PlaylistedTrack,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import {
  AsyncData,
  PaginationResponse,
  UnwrappedPaginationResponse,
  useItem,
  usePagination,
} from "./pagination";
import { useEffect, useState } from "react";

export const usePlaylist = (playlistId: string, sdk: SpotifyApi) => {
  const getItem = () => {
    return sdk.playlists.getPlaylist(playlistId);
  };
  return useItem(getItem);
};

export const usePlaylists = (sdk: SpotifyApi) => {
  const loadNext = async (options: { offset: number }) => {
    return await sdk.currentUser.playlists.playlists(50, options.offset);
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

    result.items = result.items.filter((item) => !!item.track?.id);
    return result;
  };

  return usePagination<PlaylistedTrack>(loadNext, true);
};

export const usePlaylistFeatures = (
  tracks: PaginationResponse<PlaylistedTrack>,
  sdk: SpotifyApi,
) => {
  const [tracksWithFeatures, setTracksWithFeatures] = useState<
    AsyncData<{ track: PlaylistedTrack; features: AudioFeatures }[]>
  >({ isReady: false });

  const loadFeatures = async (
    data: PlaylistedTrack[],
    signal: { abort: boolean },
  ) => {
    let featuresWithTracks: {
      track: PlaylistedTrack;
      features: AudioFeatures;
    }[] = [];
    let missing = [];
    for (const track of data) {
      const id = track.track.id;
      try {
        const cachedFeatures = JSON.parse(
          localStorage.getItem(`audio-features:${id}`) || "",
        );
        featuresWithTracks.push({
          track,
          features: cachedFeatures,
        });
      } catch (err) {
        missing.push(track);
      }
    }

    const partitionedMissing: PlaylistedTrack[][] = [];
    for (let i = 0; i < missing.length; i += 100) {
      partitionedMissing.push(missing.slice(i, i + 100));
    }

    for (const chunk of partitionedMissing) {
      if (signal.abort) {
        return;
      }
      const ids = chunk.map((item) => item.track.id);
      const features = await sdk.tracks.audioFeatures(ids);
      const tracksById = Object.fromEntries(
        chunk.map((item) => [item.track.id, item]),
      );

      for (const feature of features) {
        localStorage.setItem(
          `audio-features:${feature.id}`,
          JSON.stringify(feature),
        );

        const track = tracksById[feature.id];

        if (!track) {
          throw new Error(`Missing track for feature ${feature.id}`);
        }

        featuresWithTracks.push({
          track,
          features: feature,
        });
      }
    }

    if (signal.abort) {
      return;
    }

    setTracksWithFeatures({ isReady: true, data: featuresWithTracks });
  };

  useEffect(() => {
    const signal = { abort: false };

    if (tracks.isReady) {
      if ("error" in tracks) {
        return;
      }
      loadFeatures(tracks.data.items, signal);
    }

    return () => {
      signal.abort = true;
    };
  }, [tracks]);

  return tracksWithFeatures;
};
