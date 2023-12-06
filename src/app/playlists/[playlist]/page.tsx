"use client";

import {
  usePlaylist,
  usePlaylistFeatures,
  usePlaylistTracks,
} from "@/components/hooks/playlists";
import { useSpotify } from "@/components/hooks/useSpotify";
import { PlaylistHeader } from "@/components/playlists/playlist-header";
import { PlaylistTracks } from "@/components/playlists/playlist-tracks";
import useResizeObserver from "@react-hook/resize-observer";

import { useParams } from "next/navigation";
import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";

interface Size {
  width: number;
  height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
  MutableRefObject<T | null>,
  Size,
] {
  const target = useRef<T | null>(null);
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  const setRoundedSize = ({ width, height }: Size) => {
    setSize({ width: Math.round(width), height: Math.round(height) });
  };

  useLayoutEffect(() => {
    target.current && setRoundedSize(target.current.getBoundingClientRect());
  }, [target]);

  useResizeObserver(target, (entry: any) => {
    const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0];
    setRoundedSize({ width, height });
  });

  return [target, size];
}

export default function PlaylistPage() {
  const params = useParams<{ playlist: string }>();
  const { sdk } = useSpotify();
  const playlistId = params.playlist;
  const playlist = usePlaylist(playlistId, sdk);
  const tracks = usePlaylistTracks(playlistId, sdk);

  const { features, averages } = usePlaylistFeatures(tracks.state, sdk);

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="mb-4">
        {playlist.isReady ? (
          "error" in playlist ? (
            `Failed to fetch data ${playlist.error}`
          ) : (
            <div>
              <PlaylistHeader playlist={playlist.data} averages={averages} />
            </div>
          )
        ) : (
          "Loading..."
        )}
      </div>

      {features.isReady ? (
        "error" in features ? (
          `Error: ${features.error}`
        ) : (
          <PlaylistTracks items={features.data} />
        )
      ) : (
        "Loading..."
      )}
    </div>
  );
}
