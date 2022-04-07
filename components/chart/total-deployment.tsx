import {
  ChartThemeColor
} from "@patternfly/react-charts";
import {
  Text, TextContent, TextVariants
} from "@patternfly/react-core";
import React from "react";
import styled from 'styled-components';
import { Properties } from "../models/props";
import AggregateChart from "./aggregate-chart";

const ChartBorder = styled.div({
  left: "600px",
  height: "250px",
  width: "350px",
  border: "1px solid #D2D2D2;",
  opacity: "1;",
});

const TotalDeployment = ({ webprop }: Properties) => {
  const chartType = "donut";
  const padding = {
    bottom: 20,
    left: 20,
    right: 140,
    top: 20,
  };
  const areaConfig = {
    ariaDesc: "Number of Deployment",
    ariaTitle: "Number of Deployment",
    legendOrientation: "vertical",
    subTitle: "Deployments",
    constrainToVisibleArea: true,
    width: 350
  };
  const chartConfig = {
    ariaDesc: areaConfig.ariaDesc,
    ariaTitle: areaConfig.ariaTitle,
    constrainToVisibleArea: areaConfig.constrainToVisibleArea,
    labels: ({ datum }: any) => `${datum.x}: ${datum.y}%`,
    data: webprop.chartData,
    legendData: webprop.labelData,
    legendOrientation: areaConfig.legendOrientation,
    padding: padding,
    subTitle: areaConfig.subTitle,
    title: webprop.count,
    themeColor: ChartThemeColor.multiOrdered,
    width: areaConfig.width,
  };
  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1}> Total Deployment </Text>
      </TextContent><br></br>
      <ChartBorder>
        <AggregateChart type={chartType} props={chartConfig}></AggregateChart>
      </ChartBorder>
    </>
  );
}

export default TotalDeployment;