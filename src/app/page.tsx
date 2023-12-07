"use client";
import { Avatar } from "@/components/avatar";
import { usePlaylists } from "@/components/hooks/playlists";
import { useSpotify } from "@/components/hooks/spotify";
import { useUser } from "@/components/hooks/user";
import { Playlists } from "@/components/playlists/playlists";
import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import { useSearchParams } from "next/navigation";

const LoggedOutUserHome = (props: { sdk: SpotifyApi }) => {
  return (
    <div className="overflow-scroll h-full w-full">
      <header className="w-full py-12 text-gray-200">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center space-y-6 md:space-y-10 lg:space-y-14">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
              Spotify Playlist Creator
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-400 text-center">
              Create your perfect Spotify playlists with advanced tooling
            </p>
            <button
              className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 self-center px-8 py-3 rounded-md bg-green-500 text-white"
              onClick={() => {
                props.sdk.authenticate();
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

const LoggedInUser = ({ sdk }: { sdk: SpotifyApi }) => {
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
};

export default function Home() {
  const checkIsLoggedIn = () => {
    if (typeof window === "undefined") {
      return false;
    }

    const value = localStorage.getItem(
      "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token",
    );
    return !!value;
  };
  const { sdk } = useSpotify();
  const isLoggedIn = checkIsLoggedIn();
  const search = useSearchParams();

  if (!isLoggedIn && !search.get("code")) {
    return <LoggedOutUserHome sdk={sdk} />;
  } else {
    return <LoggedInUser sdk={sdk} />;
  }
}
