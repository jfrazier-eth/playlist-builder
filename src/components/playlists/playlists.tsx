import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { PlaylistPreview } from "./playlist-preview";
import { UnwrappedPaginationResponse } from "../hooks/pagination";

export const Playlists = (props: {
  state: UnwrappedPaginationResponse<SimplifiedPlaylist>;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="text-md mb-4">
        <p className="fixed left-0 top-0 flex justify-start border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Your playlists ({props.state.total})
        </p>
      </div>
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {props.state.items.map((item) => {
          return <PlaylistPreview playlist={item} />;
        })}
      </div>
    </div>
  );
};
