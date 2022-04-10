import {
  ChartDonut, Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import React from "react";
import { AnyProps } from "../models/props";

const AggregateChart = ({ type, props }: AnyProps) => {
  if (type === "donut")
    return (<><ChartDonut {...props} /></>);
  else if (type === "month")
    return (<> <Chart {...props.chartConfig} containerComponent={
      <ChartVoronoiContainer
        labels={({ datum }) => `${datum.name}: ${datum.y}`}
        constrainToVisibleArea
      />
    } >
      <ChartAxis tickValues={props.chartAxisTickValues} />
      <ChartAxis dependentAxis showGrid tickValues={props.dependentAxisTickValues} />
      <ChartGroup>
        {props.chartData.map((data: AnyProps) => (
          <ChartLine
            key={1}
            data={data}
          />
        ))}
      </ChartGroup>
    </Chart></>);
  return (<></>);
}

export default AggregateChart;
