import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";

export const PlaylistHeader = ({
  playlist,
}: {
  playlist: SimplifiedPlaylist;
}) => {
  return (
    <div className="flex flex-col items-start space-y-4 py-8 md:flex-row md:space-y-0 md:space-x-8">
      <img
        src={playlist.images[0]?.url}
        alt="Playlist Cover"
        width="200"
        height="200"
        className="rounded-lg object-cover"
        style={{ aspectRatio: "200 / 200", objectFit: "cover" }}
      />
      <div className="text-center md:text-left">
        <h2 className="text-4xl font-bold">{playlist.name}</h2>
        <p className="text-gray-500 dark:text-gray-400">
          {playlist.tracks?.total} Tracks
        </p>
        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ml-auto">
          {playlist.public ? "Public" : "Private"}
        </div>

        <div>
          <p className="text-gray-500 dark:text-gray-400">
            Created by: {playlist.owner.display_name}
          </p>
        </div>
      </div>
    </div>
  );
};
