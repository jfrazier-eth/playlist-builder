import { SimplifiedPlaylist } from "@spotify/web-api-ts-sdk";
import { UnwrappedPaginationResponse } from "./usePlaylists";

const MusicLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
    >
      <path d="M9 18V5l12-2v13"></path>
      <circle cx="6" cy="18" r="3"></circle>
      <circle cx="18" cy="16" r="3"></circle>
    </svg>
  );
};

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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        {props.state.items.map((item) => {
          return (
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col justify-between"
              data-v0-t="card"
              key={item.id}
            >
              <div className="space-y-1.5 p-6 flex flex-row items-center gap-4">
                <img src={item.images[0]?.url} />
              </div>
              <div className="space-y-1.5 p-6 flex flex-col w-full items-start gap-4">
                <div className="">
                  <h3 className="text-2xl font-semibold leading-none tracking-tight overflow-hidden w-full max-h-12">
                    {item.name}
                  </h3>
                </div>

                <div className="flex flex-row justify-between w-full">
                  <p className="text-sm text-muted-foreground">
                    {item.tracks?.total} Tracks
                  </p>

                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ml-auto">
                    {item.public ? "Public" : "Private"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
