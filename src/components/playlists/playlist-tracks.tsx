import { PlaylistedTrack } from "@spotify/web-api-ts-sdk";

export const PlaylistTracks = (props: { tracks: PlaylistedTrack[] }) => {
  return (
    <div className="grow overflow-scroll w-full">
      {props.tracks.map((item) => {
        return (
          <div className="flex items-center gap-4">
            <img
              src={"track" in item.track ? item.track.album.images[0]?.url : ""}
              alt="Track 1"
              width="64"
              height="64"
              className="rounded-lg object-cover"
              style={{ aspectRatio: "64 / 64", objectFit: "cover" }}
            />
            <div className="text-sm">
              <div className="font-medium line-clamp-2">{item.track.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {"track" in item.track ? item.track.artists[0].name : "N/A"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
