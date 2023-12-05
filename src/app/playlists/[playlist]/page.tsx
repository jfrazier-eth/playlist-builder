"use client";
import { usePlaylist, usePlaylistTracks } from "@/components/hooks/playlists";
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

  return (
    <div className="flex flex-col h-screen w-full">
      {playlist.isReady ? (
        "error" in playlist ? (
          `Failed to fetch data ${playlist.error}`
        ) : (
          <div>
            <PlaylistHeader playlist={playlist.data} />
          </div>
        )
      ) : (
        "Loading..."
      )}

      {tracks.state.isReady ? (
        "error" in tracks.state ? (
          `Error: ${tracks.state.error}`
        ) : (
          <PlaylistTracks tracks={tracks.state.data.items} />
        )
      ) : (
        "Loading..."
      )}
    </div>
  );
}
