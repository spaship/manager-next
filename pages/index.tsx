import {
  Card, Divider, EmptyState,
  EmptyStateIcon,
  EmptyStateVariant,
  Gallery,
  PageSection,
  Title
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import axios from "axios";
import { useRouter } from "next/router";
import WebProperty from "../components/web-property/WebProperty";


export const getStaticProps = async (props) => {
  const host = process.env.HOST;
  const url = `${host}/webproperty/list`;
  const token: any = process.env.AUTHENTICATION_TOKEN;

  const res = await axios({
    method: "get",
    url: url,
    headers: {
      Authorization: token,
      rejectUnauthorized: false,
    },
  });
  const data = await res.data.data;

  const urlCount = `${host}/event/fetch/analytics/all`;
  const resCount = await axios({
    method: "post",
    url: urlCount,
    headers: {
      Authorization: token,
      rejectUnauthorized: false,
    },
    data: {
      "count": {
        "all": true
      }
    }
  });
  const deploymentCountData = resCount.data.data;

  for (let i in data) {
    let obj = deploymentCountData.find(o => o.propertyName === data[i].webPropertyName);
    data[i].count = obj?.count || 0;
  }
  return {
    props: { webprop: data },
  };
};

export const DividerComp = () => (
  <Divider
    style={{
      border: "1px solid #D2D2D2;",
      opacity: 1,
    }}
  />
);


export const onClick = () => {
};

const Home = ({ webprop }) => {
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


Home.authenticationEnabled = true;
export default Home;