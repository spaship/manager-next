import {
  Card, EmptyState,
  EmptyStateIcon,
  EmptyStateVariant, Title
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";
import styled from "styled-components";

const AddPropertyBox = styled(Card)({
  borderRadius: "8px",
  opacity: 1,
  height: "199px;",
});

const AddProperty = () => {
  return (
    <>
      <Card
        isSelectable
        isRounded
      >
        <AddPropertyBox>
          <EmptyState variant={EmptyStateVariant.xs}>
            <div className="spaship-circle spaship-plus">
              &#43;
            </div>
            <br></br>
            <Title headingLevel="h5" size="md">
              New Web Property
            </Title>
          </EmptyState>
        </AddPropertyBox>
      </Card>
    </>
  );
};

export default AddProperty;
