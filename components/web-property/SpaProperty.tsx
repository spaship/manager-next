import {
  Card,
  CardActions,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Gallery,
  PageSection
} from "@patternfly/react-core";
import { useRouter } from "next/router";
import styled from 'styled-components';


const CardStyle = styled(Card)({
  background: " #F0F0F0 0% 0% no-repeat padding-box",
  opacity: 1,
  borderRadius: "8px",
  height: "199px;",
});


const SpaProperty = ({ webprop }: any )  => {
  const router = useRouter();
  return (
    <>
      <PageSection isFilled>
        <br></br>
        <Gallery hasGutter>
          {webprop.map((prop : any ) => (
              <Card
                isSelectable
                // selectableVariant="raised"
                isCompact
                key={prop.id}
                isRounded
                onClick={() => router.push(`${prop.propertyName}/spa/${prop.spaName}`)}
              >
              <CardStyle>
                {/* <CardHeader>
                  <CardActions></CardActions>
                </CardHeader> */}
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

export default SpaProperty;
