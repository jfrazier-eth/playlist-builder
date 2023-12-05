"use client";
import { Avatar } from "@/components/avatar";
import { usePlaylists } from "@/components/hooks/playlists";
import { useSpotify } from "@/components/hooks/useSpotify";
import { useUser } from "@/components/hooks/user";
import { Playlists } from "@/components/playlists/playlists";

export default function Home() {
  const { sdk } = useSpotify();
  const user = useUser(sdk);
  const { state: playlistState } = usePlaylists(sdk);

  return (
    <>
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {user.isReady ? (
          "error" in user ? (
            `Error: ${user.error}`
          ) : (
            <Avatar
              display_name={user.data.display_name}
              url={user.data.images?.[0]?.url}
            />
          )
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
