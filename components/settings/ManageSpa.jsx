import {
  Skeleton,
  Switch
} from "@patternfly/react-core";
import {
  Caption, TableComposable, Tbody,
  Td, Tr, Th
} from "@patternfly/react-table";
import React, { useState } from "react";

//const ExampleType = 'default' | 'compact' | 'compactBorderless';

const ManageSpa = ({webprop}) => {
  const [switchState, setSwitchState] = useState(true);


  const handleChange = () => {
   // setSwitchState(!switchState);
  };


  return (
    <>
      {/* <Skeleton
        height="75%"
        width="75%"
        screenreaderText="Loading medium rectangle contents"
      /> */}
      <TableComposable
        aria-label="Simple table"
        variant={"compact"}
        borders={false}
        style={{
          width: "1041px;",
          height: "180px;",
          /* UI Properties */
          background: "var(---ffffff) 0% 0% no-repeat padding-box;",
          border: "1px solid #D2D2D2;",
          borderRadius: "8px;",
          opacity: "1;",
        }}
      >
        <Caption>
          <b>Manage SPAs</b>
        </Caption>
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td>Path</Td>
            <Td> </Td>
            <Td>Action</Td>
          </Tr>
        </Tbody>
        <Tbody>
          {webprop.map((spa) => (
            <Tr key={spa.spaName}>
              <Td dataLabel={spa.spaName}>{spa.spaName}</Td>
              <Td dataLabel={spa.propertyName}>/{spa.contextPath}</Td>
              <Td></Td>
              <Td dataLabel={spa.spaName}>
                <Switch
                  id="simple-switch"
                  isChecked={switchState}
                  onChange={handleChange}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </>
  );
};

export default ManageSpa;
