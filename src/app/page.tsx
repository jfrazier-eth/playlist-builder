"use client";
import { Avatar } from "@/components/avatar";
import { SpotifyApi, UserProfile } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";

const clientId = "f9791754fb254d9e9f2b84afea36afed";
const scopes = [
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-read-private",
];

const useUser = () => {
  const [user, setUser] = useState<null | UserProfile>(null);
  const [isLoading, setIsLoading] = useState(false);
  const sdk = SpotifyApi.withUserAuthorization(
    clientId,
    "http://localhost:3000",
    scopes,
  );

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
  const { user, isLoading } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {/* <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"></p> */}
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
    </main>
  );
}
