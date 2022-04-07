import {
  Card, CardBody,
  CardFooter, CardTitle,
  Gallery,
  PageSection
} from "@patternfly/react-core";
import { useRouter } from "next/router";
import styled from 'styled-components';
import { Properties, SPAProps } from "../models/props";

const CardStyle = styled(Card)({
  background: " #F0F0F0 0% 0% no-repeat padding-box",
  opacity: 1,
  borderRadius: "8px",
  height: "199px;",
});

const SPAProperty = ({ webprop }: Properties) => {
  const router = useRouter();
  return (
    <>
      <PageSection isFilled>
        <br></br>
        <Gallery hasGutter>
          {webprop.map((prop: SPAProps) => (
            <Card
              isSelectable
              isCompact
              key={prop.id}
              isRounded
              onClick={() => router.push(`${prop.propertyName}/spa/${prop.spaName}`)}
            >
              <CardStyle>
                <CardTitle>{prop.spaName}</CardTitle>
                <CardBody>{prop.propertyName}</CardBody>
                <CardFooter>{prop.count} Deployments</CardFooter>
              </CardStyle>
            </Card>
          ))}
        </Gallery>
      </PageSection>
    </>
  );
};

export default SPAProperty;
