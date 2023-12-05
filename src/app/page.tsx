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
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-row items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 grow">
          Playlists
        </h2>
        <div className="font-mono text-sm lg:flex">
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
        </div>
      </div>
      <div className="w-full items-center justify-start font-mono text-sm lg:flex flex-col overflow-scroll grow pb-8">
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
    </div>
  );
}
