import {
  Card, Divider, EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  Gallery,
  PageSection,
  Title
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import { useRouter } from "next/router";
import WebProperty from "../components/web-property/WebProperty";
import { get, post } from "../utils/APIUtil";
import styled from 'styled-components';

export const payload = {
  "count": {
    "all": true
  }
};

export const getStaticProps = async () => {
  const host = getHost();
  const urlList = `${host}/webproperty/list`;
  const urlCount = `${host}/event/fetch/analytics/all`;
  const response = await Promise.all([await get<any>(urlList), await post<any>(urlCount, payload)]);
  const [propertyListResponse, deploymentCountResponse]: any = response;
  getPropertyListResponse(propertyListResponse, deploymentCountResponse);
  return {
    props: { webprop: propertyListResponse },
  };
};

export const DividerComp = styled.footer `
  border-top: 1px solid var(--spaship-global--Color--bright-gray);
  width: 60vw;
`;

const HomePage = ({ webprop }: any) => {
  const router = useRouter();
  return (
    <>
      <PageSection isFilled>
        <br></br>
        <Gallery hasGutter>
          <Card
            isSelectable
            isRounded
            style={{
              background: "var(---ffffff) 0% 0% no-repeat padding-box",
              borderRadius: "8px",
              opacity: 1,
            }}
          >
            <EmptyState variant={EmptyStateVariant.xs}>
              <EmptyStateIcon icon={PlusCircleIcon} />
              <Title headingLevel="h5" size="md">
                New Web Property
              </Title>
            </EmptyState>
          </Card>
        </Gallery>
        <br />
        <DividerComp />
        <br />
        <WebProperty webprop={webprop}></WebProperty>
        <br />
        <DividerComp />
        <br />
      </PageSection>
    </>
  );
};

HomePage.authenticationEnabled = true;
export default HomePage;

function getHost() {
  return process.env.HOST;
}

function getPropertyListResponse(propertyListResponse: any, deploymentCountResponse: any) {
  for (let i in propertyListResponse) {
    let obj = deploymentCountResponse.find((o: any) => o.propertyName === propertyListResponse[i].webPropertyName);
    propertyListResponse[i].count = obj?.count || 0;
  }
}
