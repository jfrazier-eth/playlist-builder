import { AudioFeatures, PlaylistedTrack } from "@spotify/web-api-ts-sdk";
import { DataSet, LineChart } from "../charts.tsx/line";
import { EmojiLevelByType } from "../emoji-levels";
import { useElementSize } from "../hooks/element-size";

export const PlaylistTracks = ({
  items,
}: {
  items: { track: PlaylistedTrack; features: AudioFeatures }[];
}) => {
  const [boxRef, { width }] = useElementSize();

  const dataSetKeys = [
    // "acousticness",
    "danceability",
    "energy",
    // "instrumentalness",
    // "liveness",
    // "speechiness",
    "valence",
  ] as const;

  const dataSets = dataSetKeys.map((key) => {
    const dataSet: DataSet<{ x: string; y: number }> = {
      id: key,
      title: key,
      data: items.map((item, index) => {
        return {
          x: `${item.track.track.name} (Track ${index})`,
          y: item.features[key],
        };
      }),
      xAccessor: (item) => item.x,
      yAccessor: (item) => item.y,
    };

    return dataSet;
  });
  return (
    <>
      <div className="w-full h-[300px]">
        <LineChart width={width} height={300} dataSets={dataSets} />
      </div>
      <div className="grow overflow-scroll w-full space-y-2 pb-8" ref={boxRef}>
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

              <div className="flex flex-row space-x-4 h-8 my-auto">
                <EmojiLevelByType kind="valence" value={features.valence} />
                <EmojiLevelByType
                  kind="danceability"
                  value={features.danceability}
                />
                <EmojiLevelByType kind="energy" value={features.energy} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
