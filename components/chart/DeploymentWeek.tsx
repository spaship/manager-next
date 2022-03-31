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

export const ChartStyle = styled.div({
  height: "250px",
  width: "600px",
  background: "var(---ffffff) 0% 0% no-repeat padding-box",
  border: "1px solid #D2D2D2;",
  opacity: "1;",
});

const DeploymentWeek = ({ webprop }: any) => (
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
          maxDomain={{ y: 300 }}
          minDomain={{ y: 0 }}
          padding={{
            bottom: 50,
            left: 50,
            right: 200, // Adjusted to accommodate legend
            top: 50,
          }}
          width={600}
        >
          <ChartAxis tickValues={[50, 150, 250]} />
          <ChartAxis dependentAxis showGrid tickValues={[50, 150, 250]} />
          <ChartGroup>
            {webprop.map((data: any) => (  
              <ChartLine
                data={data}
              />
            ))}
          </ChartGroup>
        </Chart>
      </div>
    </ChartStyle>
  </>
);

export default DeploymentWeek;