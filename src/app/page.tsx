"use client";
import { Avatar } from "@/components/avatar";
import { useSpotify } from "@/components/hooks/useSpotify";
import { Playlists } from "@/components/playlists/playlists";
import { usePlaylists } from "@/components/playlists/usePlaylists";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

const useUser = (sdk: SpotifyApi) => {
  const [user, setUser] = useState<null | UserProfile>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const user = await sdk.currentUser.profile();
      setUser(user);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    user,
    isLoading,
  };
};

export default function Home() {
  const { sdk } = useSpotify();

  sdk.playlists.getPlaylistItems;
  const { user } = useUser(sdk);

  const { state: playlistState } = usePlaylists(sdk);

  return (
    <>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {user ? (
          <Avatar
            display_name={user.display_name}
            url={user.images?.[0]?.url}
          />
        ) : (
          "Loading..."
        )}
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
      </div>
      <div className="z-10 max-w-5xl w-full mt-8 items-center justify-start font-mono text-sm lg:flex flex-col">
        {playlistState.isReady ? (
          "error" in playlistState ? (
            `Error: ${playlistState.error}`
          ) : (
            <Playlists state={playlistState.data} />
          )
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}
