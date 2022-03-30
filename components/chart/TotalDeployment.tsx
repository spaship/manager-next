import {
  ChartDonut,
  ChartThemeColor
} from "@patternfly/react-charts";
import {
  Text, TextContent, TextVariants
} from "@patternfly/react-core";
import React from "react";
import styled from 'styled-components';


const ChartStyle = styled.div({
  left: "600px",
  height: "250px",
  width: "350px",
  background: "var(---ffffff) 0% 0% no-repeat padding-box",
  border: "1px solid #D2D2D2;",
  opacity: "1;",
});


const TotalDeployment = ({ webprop }) => (
  <>
    <TextContent>
      <Text component={TextVariants.h1}> Total Deployment </Text>
    </TextContent><br></br>
    <ChartStyle>
      <div>
        <ChartDonut
          ariaDesc="Number of Deployment"
          ariaTitle="Number of Deployment"
          constrainToVisibleArea={true}
          labels={({ datum }) => `${datum.x}: ${datum.y}%`}
          data={webprop.chartData}
          legendData={webprop.labelData}
          legendOrientation="vertical"
          legendPosition="right"
          padding={{
            bottom: 20,
            left: 20,
            right: 140,
            top: 20,
          }}
          subTitle="Deployments"
          title={webprop.count}
          themeColor={ChartThemeColor.multiOrdered}
          width={350}
        />
      </div>
    </ChartStyle>
  </>
);

export default TotalDeployment;
