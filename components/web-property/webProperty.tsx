import {
  Card, CardBody,
  CardFooter, CardTitle
} from "@patternfly/react-core";
import { useRouter } from "next/router";
import styled from 'styled-components';
import { Properties, WebProps } from "../models/props";

const CardStyle = styled(Card)({
  background: " #F0F0F0 0% 0% no-repeat padding-box",
  opacity: 1,
  borderRadius: "8px",
  height: "199px;",
});

const WebProperty = ({ webprop }: Properties) => {
  const router = useRouter();
  return (
    <>
      {webprop.map((prop: WebProps) => (
        <Card
          isSelectable
          isCompact
          key={prop.id}
          isRounded
          onClick={() => router.push(`properties/${prop.webPropertyName}`)}
        >
          <CardStyle>
            <CardTitle>{prop.webPropertyName}</CardTitle>
            <CardBody>Deployed</CardBody>
            <CardFooter>{prop.count} Deployments</CardFooter>
          </CardStyle>
        </Card>
      ))}
    </>
  );
};

export default WebProperty;
