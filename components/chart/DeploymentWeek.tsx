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

const ChartStyle = styled.div({
  height: "250px",
  width: "600px",
  background: "var(---ffffff) 0% 0% no-repeat padding-box",
  border: "1px solid #D2D2D2;",
  opacity: "1;",
});


const DeploymentWeek = () => (
  <>
    <TextContent>
      <Text component={TextVariants.h1}> Deployment/Week </Text>
    </TextContent><br></br>
    <ChartStyle>
      <div>
        <Chart
          ariaDesc="Deployment/Week"
          ariaTitle="Deployment/Week"
          containerComponent={
            <ChartVoronoiContainer
              labels={({ datum }) => `${datum.name}: ${datum.y}`}
              constrainToVisibleArea
            />
          }
          legendData={[
            { name: "QA" },
            { name: "Dev", symbol: { type: "dash" } },
            { name: "Prod" },
          ]}
          legendOrientation="vertical"
          legendPosition="right"
          height={250}
          maxDomain={{ y: 10 }}
          minDomain={{ y: 0 }}
          padding={{
            bottom: 50,
            left: 50,
            right: 200, // Adjusted to accommodate legend
            top: 50,
          }}
          width={600}
        >
          <ChartAxis tickValues={[2, 3, 4]} />
          <ChartAxis dependentAxis showGrid tickValues={[2, 5, 8]} />
          <ChartGroup>
            <ChartLine
              data={[
                { name: "QA", x: "1st Week", y: 1 },
                { name: "QA", x: "2nd Week", y: 2 },
                { name: "QA", x: "3rd Week", y: 5 },
                { name: "QA", x: "Current Week", y: 3 },
              ]}
            />
            <ChartLine
              data={[
                { name: "Dev", x: "1st Week", y: 2 },
                { name: "Dev", x: "2nd Week", y: 1 },
                { name: "Dev", x: "3rd Week", y: 7 },
                { name: "Dev", x: "Current Week", y: 4 },
              ]}
              style={{
                data: {
                  strokeDasharray: "3,3",
                },
              }}
            />
            <ChartLine
              data={[
                { name: "Prod", x: "1st Week", y: 3 },
                { name: "Prod", x: "2nd Week", y: 4 },
                { name: "Prod", x: "3rd Week", y: 9 },
                { name: "Prod", x: "Current Week", y: 5 },
              ]}
            />
          </ChartGroup>
        </Chart>
      </div>
    </ChartStyle>
  </>
);
export default DeploymentWeek;
