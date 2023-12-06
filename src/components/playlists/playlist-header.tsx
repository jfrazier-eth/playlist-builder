import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { AudioFeatureAverages } from "../hooks/playlists";
import { AnimatedBarSeries, Tooltip, XYChart } from "@visx/xychart";
import { useElementSize } from "@/app/playlists/[playlist]/page";
import { EmojiLevelByType } from "../emoji-levels";

export const PlaylistHeader = ({
  playlist,
  averages,
}: {
  playlist: SimplifiedPlaylist;
  averages: AudioFeatureAverages;
}) => {
  const [boxRef, { width }] = useElementSize();
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
          <h2 className="text-lg font-bold">{playlist.name}</h2>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          <p>{playlist.description}</p>
        </div>

        <div className="w-full border border-white m-1" ref={boxRef}>
          <XYChart
            height={100}
            width={width - 16}
            xScale={{ type: "linear", domain: [0, 1] }}
            yScale={{ type: "band" }}
            margin={{ top: 8, left: 8, right: 8, bottom: 8 }}
          >
            <AnimatedBarSeries
              dataKey="Metrics"
              data={(["energy", "danceability", "valence"] as const).map(
                (key) => ({
                  x: averages[key],
                  y: key,
                }),
              )}
              xAccessor={(avg) => avg.x}
              yAccessor={(avg) => avg.y}
              colorAccessor={(datum) => {
                switch (datum.y) {
                  case "energy": {
                    return "#ffef55";
                  }
                  case "danceability": {
                    return "#f24f26";
                  }
                  case "valence": {
                    return "#0097c3";
                  }
                }
              }}
            />

            <Tooltip
              snapTooltipToDatumX
              snapTooltipToDatumY
              showVerticalCrosshair
              showSeriesGlyphs
              renderTooltip={({ tooltipData, colorScale }) => {
                let key = tooltipData?.nearestDatum?.key;
                const datum = tooltipData?.nearestDatum?.datum as
                  | { x: number; y: string }
                  | undefined;
                if (!key || !datum) {
                  return <></>;
                }
                const color = colorScale?.(key);
                return (
                  <div>
                    <div style={{ color }}>{key}</div>
                    {`${datum.y}: ${datum.x.toFixed(4)}`}
                  </div>
                );
              }}
            />
          </XYChart>
        </div>

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row space-x-2">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
              {playlist.public ? "Public" : "Private"}
            </div>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
              {playlist.followers.total} Followers
            </div>
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
              {playlist.tracks?.total} Tracks
            </div>
            <EmojiLevelByType kind="valence" value={averages.valence} />
            <EmojiLevelByType
              kind="danceability"
              value={averages.danceability}
            />
            <EmojiLevelByType kind="energy" value={averages.energy} />
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
