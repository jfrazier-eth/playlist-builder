import {
  AnimatedAxis,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from "@visx/xychart";

export interface DataSet<T> {
  id: string;
  title: string;
  data: T[];
  xAccessor: (item: T) => string;
  yAccessor: (item: T) => number;
}

type Scale = "band" | "linear";
interface LineChartProps<T> {
  width: number;
  height: number;
  xScale?: Scale;
  yScale?: Scale;
  dataSets: DataSet<T>[];
}

export function LineChart<T extends object>({
  width,
  height,
  xScale = "band",
  yScale = "linear",
  dataSets,
}: LineChartProps<T>) {
  return (
    <XYChart
      height={height}
      width={width}
      xScale={{ type: xScale }}
      yScale={{ type: yScale }}
    >
      <AnimatedAxis orientation="bottom" />
      <AnimatedAxis orientation="left" />
      <AnimatedAxis orientation="left" />
      {dataSets.map((item) => {
        const data = item.data.map((datum, index) => {
          return {
            ...datum,
            dataSetId: item.id,
          };
        });
        return (
          <AnimatedLineSeries
            dataKey={`dataset:${item.id}`}
            key={item.id}
            data={data}
            xAccessor={item.xAccessor}
            yAccessor={item.yAccessor}
          />
        );
      })}

      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData, colorScale }) => {
          let key = tooltipData?.nearestDatum?.key;
          const datum = tooltipData?.nearestDatum?.datum as
            | (T & { dataSetId: string })
            | undefined;
          if (!key || !datum) {
            return <></>;
          }
          const color = colorScale?.(key);

          const dataSetId = datum.dataSetId;

          const dataSet = dataSets.find((item) => item.id === dataSetId);
          if (!dataSet) {
            console.error(`Failed to find data set that matches ${dataSetId}`);
            return;
          }
          return (
            <div>
              <div style={{ color }}>{key}</div>
              {dataSet.xAccessor(datum)}
              {", "}
              {dataSet.yAccessor(datum)}
            </div>
          );
        }}
      />
    </XYChart>
  );
}
