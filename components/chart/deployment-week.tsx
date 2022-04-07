import React from "react";
import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLine,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import {
  Text, TextContent, TextVariants
} from "@patternfly/react-core";
import styled from 'styled-components';
import { AnyProps, Properties } from "../models/props";
import AggregateChart from "./aggregate-chart";

const ChartBorder = styled.div({
  height: "250px",
  width: "600px",
  background: "white",
  border: "1px solid #D2D2D2;",
  opacity: "1;",
});

const chartAxisTickValues = [50, 150, 250];
const dependentAxisTickValues = [50, 150, 250];

const DeploymentWeek = ({ webprop }: Properties) => {
  const chartData = webprop.processedMonthlyDeployments;
  const legendData = webprop.legendData;
  const chartType = "month";
  const padding = {
    bottom: 50,
    left: 50,
    right: 200,
    top: 50,
  };
  const areaConfig = {
    ariaDesc: "Deployment/Week",
    ariaTitle: "Deployment/Week",
    legendOrientation: "vertical",
    legendPosition: "right",
    maxDomain: { y: 300 },
    minDomain: { y: 0 },
    height: 250,
    width: 600
  };
  const chartConfig = {
    ariaDesc: areaConfig.ariaDesc,
    ariaTitle: areaConfig.ariaTitle,
    legendData: legendData,
    legendOrientation: areaConfig.legendOrientation,
    legendPosition: areaConfig.legendPosition,
    height: areaConfig.height,
    maxDomain: areaConfig.maxDomain,
    minDomain: areaConfig.minDomain,
    padding: padding,
    width: areaConfig.width,
    chartData: chartData,
    chartAxisTickValues: chartAxisTickValues,
    dependentAxisTickValues: dependentAxisTickValues
  };
  return (
    <>
      <TextContent>
        <Text component={TextVariants.h1}> Deployment/Week </Text>
      </TextContent><br></br>
      <ChartBorder>
        <div>
          <AggregateChart type={chartType} props={{
            chartConfig: chartConfig, chartData: chartData,
            chartAxisTickValues: chartAxisTickValues,
            dependentAxisTickValues: dependentAxisTickValues
          }}></AggregateChart>
        </div>
      </ChartBorder>
    </>
  );
}

export default DeploymentWeek;