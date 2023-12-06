import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { AudioFeatureAverages } from "../hooks/playlists";

export const PlaylistHeader = ({
  playlist,
  averages,
}: {
  playlist: SimplifiedPlaylist;
  averages: AudioFeatureAverages;
}) => {
  return (
    <div className="flex items-start flex-row space-y-0 space-x-8 h-[200px]">
      <img
        src={playlist.images[0]?.url}
        alt="Playlist Cover"
        width="200"
        height="200"
        className="rounded-lg object-cover"
        style={{ aspectRatio: "200 / 200", objectFit: "cover" }}
      />
      <div className="flex flex-col justify-between h-full grow">
        <div>
          <h2 className="text-4xl font-bold">{playlist.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">
            {playlist.tracks?.total} Tracks
          </p>
        </div>
        <div className="text-gray-500 dark:text-gray-400">
          <p>{playlist.description}</p>
        </div>

        <div className="grid gap-2 md:grid-cols-3 lg:grid-cols-4 w-full text-sm text-gray-400 dark:text-gray-400">
          <div>
            <p>Danceability {averages.danceability.toFixed(4)}</p>
          </div>
          <div>
            <p>Energy {averages.energy.toFixed(4)}</p>
          </div>
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Key {averages.key.toFixed(4)}</p>
          </div> */}
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Loudness {averages.loudness.toFixed(4)}</p>
          </div> */}
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Mode {averages.mode.toFixed(4)}</p>
          </div> */}
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Speechiness {averages.speechiness.toFixed(4)}</p>
          </div> */}
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Acousticness {averages.acousticness.toFixed(4)}</p>
          </div>
          <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Instrumentalness {averages.instrumentalness.toFixed(4)}</p>
          </div> */}
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Liveness {averages.liveness.toFixed(4)}</p>
          </div> */}
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Valence {averages.valence.toFixed(4)}</p>
          </div> */}
          <div>
            <p>Tempo {averages.tempo.toFixed(4)}</p>
          </div>
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Duration {averages.duration_ms.toFixed(4)}</p>
          </div> */}
          {/* <div className="text-md text-gray-400 dark:text-gray-400">
            <p>Time signature {averages.time_signature.toFixed(4)}</p>
          </div> */}
        </div>

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row space-x-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
              {playlist.public ? "Public" : "Private"}
            </div>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
              {playlist.followers.total} Followers
            </div>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">
              Created by: {playlist.owner.display_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
