import {
  Gallery,
  PageSection
} from "@patternfly/react-core";
import styled from 'styled-components';
import Header from "../../components/layout/header";
import { AnyProps, Properties } from "../../components/models/props";
import AddProperty from "../../components/web-property/addProperty";
import WebProperty from "../../components/web-property/webProperty";
import { get, post } from "../../utils/api.utils";
import { getHost } from "../../utils/config.utils";

export const payload = {
  "count": {
    "all": true
  }
};

export const getStaticProps = async () => {
  const host = getHost();
  const urlList = `${host}/webproperty/list`;
  const urlCount = `${host}/event/fetch/analytics/all`;
  const response = await Promise.all([await get<Properties>(urlList), await post<Properties>(urlCount, payload)]);
  const [propertyListResponse, deploymentCountResponse]: AnyProps = response;
  getPropertyListResponse(propertyListResponse, deploymentCountResponse);
  return {
    props: { webprop: propertyListResponse },
  };
};

export const DividerComp = styled.hr`
  border-top: 1px solid var(--spaship-global--Color--bright-gray);
  width: 60vw;
`;


export const GalleryStyle = styled(Gallery)`
  padding : 0 10vw
`;

const HomePage = ({ webprop }: Properties) => {
  return (
    <>
      <Header title="Your Web Properties"></Header>
      <PageSection isFilled>
        <br></br>
        <Gallery hasGutter>
          <AddProperty></AddProperty>
          <WebProperty webprop={webprop}></WebProperty>
        </Gallery>
        <br />
        <DividerComp />
        <br />
      </PageSection>
    </>
  );
};

HomePage.authenticationEnabled = true;
export default HomePage;

function getPropertyListResponse(propertyListResponse: AnyProps, deploymentCountResponse: AnyProps) {
  for (let index in propertyListResponse) {
    let data = deploymentCountResponse.find((property: AnyProps) => property.propertyName === propertyListResponse[index].webPropertyName);
    propertyListResponse[index].count = data?.count || 0;
  }
}