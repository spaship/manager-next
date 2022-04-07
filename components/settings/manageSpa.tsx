import {
  Skeleton,
  Switch
} from "@patternfly/react-core";
import {
  Caption, TableComposable, Tbody,
  Td, Tr, Th
} from "@patternfly/react-table";
import React, { useState } from "react";
import styled from "styled-components";
import { SPAProps, Properties } from "../models/props";

const ListBox = styled.div({
  width: "1041px;",
  height: "180px;",
  background: "var(---ffffff) 0% 0% no-repeat padding-box;",
  border: "1px solid #D2D2D2;",
  borderRadius: "8px;",
  opacity: "1;",
});

const ManageSpa = ({ webprop }: Properties) => {
  const [switchState, setSwitchState] = useState(true);
  const handleChange = () => {
  };
  const tableVariant = "compact";
  const tableBorders = false;
  return (
    <>
      <ListBox>
        <TableComposable
          variant={tableVariant}
          borders={tableBorders}
        >
          <Caption>
            <b>Manage SPAs</b>
          </Caption>
          <Tbody>
            <Tr>
              <Td>Name</Td>
              <Td>Path</Td>
              <Td>Action</Td>
            </Tr>
          </Tbody>
          <Tbody>
            {webprop.map((spa: SPAProps) => (
              <Tr key={spa.spaName}>
                <Td dataLabel={spa.spaName}>{spa.spaName}</Td>
                <Td dataLabel={spa.propertyName}>/{spa.contextPath}</Td>
                <Td dataLabel={spa.spaName}>
                  <Switch
                    id="spaship-switch"
                    area-label="spaship-switch-area"
                    isChecked={switchState}
                    onChange={handleChange}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </ListBox>
    </>
  );
};

export default ManageSpa;
