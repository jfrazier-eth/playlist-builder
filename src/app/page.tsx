"use client";
import { Avatar } from "@/components/avatar";
import { Playlists } from "@/components/playlists/playlists";
import { usePlaylists } from "@/components/playlists/usePlaylists";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

const clientId = "f9791754fb254d9e9f2b84afea36afed";
const scopes = [
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-read-private",
];

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
  const sdk = SpotifyApi.withUserAuthorization(
    clientId,
    "http://localhost:3000",
    scopes,
  );

  const { user, isLoading } = useUser(sdk);

  const { state: playlistState } = usePlaylists(sdk);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
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
    </main>
  );
}
