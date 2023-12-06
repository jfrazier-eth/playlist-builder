import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { PlaylistPreview } from "./playlist-preview";
import { UnwrappedPaginationResponse } from "../hooks/pagination";

export const Playlists = (props: {
  state: UnwrappedPaginationResponse<SimplifiedPlaylist>;
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 w-full">
        {props.state.items.map((item) => {
          return <PlaylistPreview playlist={item} key={item.id} />;
        })}
      </div>
    </div>
  );
};
