import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

export const PlaylistPreview = ({
  playlist,
}: {
  playlist: SimplifiedPlaylist;
}) => {
  return (
    <a href={`/playlists/${playlist.id}`}>
      <div
        className="border bg-card text-card-foreground shadow-sm flex flex-col justify-between hover:border-green-500"
        data-v0-t="card"
        key={playlist.id}
      >
        <div className="flex flex-row items-center gap-4">
          <img
            src={playlist.images[0]?.url}
            className="w-full"
            style={{ aspectRatio: "64 / 64", objectFit: "cover" }}
          />
        </div>
        <div className="space-y-1.5 p-2 flex flex-col w-full items-start">
          <div className="w-[100%]">
            <h3 className="text-2xl font-semibold leading-none tracking-tight overflow-hidden text-ellipsis whitespace-nowrap w-full max-h-12">
              {playlist.name}
            </h3>
          </div>

          <div className="flex flex-col justify-end w-full">
            <div className="flex flex-row justify-between w-full">
              <p className="text-sm text-muted-foreground">
                {playlist.tracks?.total} Tracks
              </p>

              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ml-auto">
                {playlist.public ? "Public" : "Private"}
              </div>
            </div>
            <div className="mt-1">
              <p className="text-xs text-muted-foreground text-left">
                Created by: {playlist.owner.display_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};
