import { AudioFeatures, PlaylistedTrack } from "@spotify/web-api-ts-sdk";

export const PlaylistTracks = ({
  items,
}: {
  items: { track: PlaylistedTrack; features: AudioFeatures }[];
}) => {
  return (
    <div className="grow overflow-scroll w-full space-y-2 pb-8">
      {items.map(({ track: item, features }, index) => {
        return (
          <div
            className="flex justify-between m-1 transition-all hover:p-1 hover:border rounded-lg hover:border-green-500"
            key={`${index + 1}`}
          >
            <div className="flex flex-row items-center gap-4">
              <img
                src={
                  "track" in item.track ? item.track.album.images[0]?.url : ""
                }
                alt="Track 1"
                width="64"
                height="64"
                className="rounded-lg object-cover"
                style={{ aspectRatio: "64 / 64", objectFit: "cover" }}
              />
              <div className="text-sm">
                <div className="font-medium line-clamp-2">
                  {item.track.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {"track" in item.track ? item.track.artists[0].name : "N/A"}
                </div>
              </div>
            </div>

            <div className="flex flex-row space-x-4">
              <div className="flex flex-col text-right">
                <p>Danceability</p> <p>{features.danceability}</p>
              </div>
              <div className="flex flex-col text-right">
                <p>Energy</p> <p>{features.energy}</p>
              </div>
              <div className="flex flex-col text-right">
                <p>Tempo</p> <p>{features.tempo}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
