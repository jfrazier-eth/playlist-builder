"use client";
import { useSpotify } from "@/components/hooks/useSpotify";
import { PlaylistHeader } from "@/components/playlists/playlist-header";
import { PlaylistPreview } from "@/components/playlists/playlist-preview";
import { PlaylistTracks } from "@/components/playlists/playlist-tracks";
import { useItem, usePagination } from "@/components/playlists/usePlaylists";
import { PlaylistedTrack, SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useParams } from "next/navigation";

const usePlaylist = (playlistId: string, sdk: SpotifyApi) => {
  const getItem = () => {
    return sdk.playlists.getPlaylist(playlistId);
  };
  return useItem(getItem);
};

const usePlaylistTracks = (playlistId: string, sdk: SpotifyApi) => {
  // sdk.playlists.getPlaylistItems
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

export default function PlaylistPage() {
  const params = useParams<{ playlist: string }>();
  const { sdk } = useSpotify();
  const playlistId = params.playlist;
  const playlist = usePlaylist(playlistId, sdk);
  const tracks = usePlaylistTracks(playlistId, sdk);

  return (
    <div>
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
