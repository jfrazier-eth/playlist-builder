enum Levels {
  Low,
  Medium,
  High,
}

const getLevel = (num: number) => {
  if (num > 0.66) {
    return Levels.High;
  } else if (num > 0.33) {
    return Levels.Medium;
  }
  return Levels.Low;
};

const EmojiLevels = (props: {
  level: Levels;
  low: string;
  medium: string;
  high: string;
  title: string;
}) => {
  const selected = "bg-gray-500 px-1 rounded-md";
  const notSelected = "px-1";
  return (
    <div className="inline-flex items-center rounded-full border px-2.5  text-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
      <span className="text-xs mr-2">{props.title} </span>
      <span className={props.level === Levels.High ? selected : notSelected}>
        {props.high}
      </span>
      <span className={props.level === Levels.Medium ? selected : notSelected}>
        {props.medium}
      </span>
      <span className={props.level === Levels.Low ? selected : notSelected}>
        {props.low}
      </span>
    </div>
  );
};

type Kinds = "valence" | "danceability" | "energy";
export const EmojiLevelByType = ({
  kind,
  value,
}: {
  kind: Kinds;
  value: number;
}) => {
  const level = getLevel(value);
  switch (kind) {
    case "valence":
      return (
        <EmojiLevels
          low="😞"
          medium="😐"
          high="😆"
          level={level}
          title={"Valence"}
        />
      );

    case "danceability":
      return (
        <EmojiLevels
          low="😴"
          medium="🕺"
          high="🪩"
          level={level}
          title="Danceability"
        />
      );

    case "energy":
      return (
        <EmojiLevels
          low="🐌"
          medium="😌"
          high="🫨"
          level={level}
          title="Energy"
        />
      );
  }
};
