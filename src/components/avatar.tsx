interface AvatarProps {
  url?: string;
  display_name: string;
}

export const Avatar = (props: AvatarProps) => {
  return (
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:bg-white-400 dark:hover:bg-gray-900">
      <span className="relative flex shrink-0 overflow-hidden rounded-full h-14 w-14">
        {props.url ? (
          <img
            src={props.url}
            height="56"
            width="56"
            style={{ aspectRatio: 56 / 56, objectFit: "cover" }}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted bg-gray-500">
            {props.display_name.slice(0, 2)}
          </span>
        )}
      </span>
      <div className="ml-4">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {props.display_name}
        </h2>
      </div>
    </div>
  );
};
