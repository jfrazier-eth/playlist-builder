"use client";
import {
  usePlaylist,
  usePlaylistFeatures,
  usePlaylistTracks,
} from "@/components/hooks/playlists";
import { useSpotify } from "@/components/hooks/useSpotify";
import { PlaylistHeader } from "@/components/playlists/playlist-header";
import { PlaylistTracks } from "@/components/playlists/playlist-tracks";

import { useParams } from "next/navigation";

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
