import {
  Button, ClipboardCopy, Form,
  FormGroup, Modal,
  ModalVariant, Popover,
  TextInput
} from "@patternfly/react-core";
import {
  Caption, TableComposable, Tbody,
  Td, Tr
} from "@patternfly/react-table";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const ApiKey = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [env, setEnv] = useState("");
  const [apiKey, setApiKey] = useState("");
  const nameInputRef = useRef();
  //  const Popover : React.FunctionComponent<PopoverProps>;

  async function handleModalToggle() {
    setModalOpen(!isModalOpen);
  }

  async function onClickMethod() {
    setModalOpen(!isModalOpen);
    if (isModalOpen == true) {
      const AuthStr =
        "Bearer " +
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDIyLTAyLTA5VDE0OjAyOjQxLjMyM1oiLCJleHBpcmVzSW4iOiIxMDBkIiwiaWF0IjoxNjQ0NDE1MzYxLCJleHAiOjE2NTMwNTUzNjF9.GaaNKg4qFmVgvzs-Yl1iuJpE5ccRdn8z8I6uJioOidY"; //the token is a variable which holds the token
      console.log(
        `http://dev.api.apps.int.spoke.preprod.us-west-2.aws.paas.redhat.com/api/v1/applications/validate`
      );
      try {
        const url = `http://dev.api.apps.int.spoke.preprod.us-west-2.aws.paas.redhat.com/api/v1/applications/validate`;
        const res = await axios({
          method: "post",
          url: url,
          headers: {
            Authorization: AuthStr,
            rejectUnauthorized: false,
          },
        });
        setApiKey(res.data.data.token);
      } catch (e) { }
    }
  }

  const handleNameInputChange = (value) => {
    setEnv(value);
  };

  useEffect(() => {
    if (isModalOpen && nameInputRef && nameInputRef.current) {
      //nameInputRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <>

      <TableComposable
        aria-label="Simple table"
        variant={"compact"}
        borders={false}
        style={{
          top: "40px",
          width: "1041px;",
          height: "55px;",
          /* UI Properties */
          background: "var(---ffffff) 0% 0% no-repeat padding-box;",
          border: "1px solid #D2D2D2;",
          borderRadius: "8px;",
          opacity: "1;",
        }}
      >
        <Caption>
          <b>Do you want to create an API Key !</b>
        </Caption>
        <Tbody>
          <Tr>
            <Td>
              <Button style={{
                background: "#000000 0% 0% no-repeat padding-box;",
                opacity: 1,
                borderRadius: "3px;"
              }} onClick={handleModalToggle}>
                Create API Key
              </Button>

              <Modal
                variant={ModalVariant.small}
                title="Name API Key"
                // description="Please provide the environment name."
                isOpen={isModalOpen}
                onClose={handleModalToggle}
                actions={[
                  <Button
                    key="create"
                    style={{
                      background: "#000000",
                      opacity: 1,
                      borderRadius: "3px;"
                    }}

                    onClick={onClickMethod}
                  >
                    Generate API Key
                  </Button>,
                  // <Button key="cancel" variant="link" onClick={handleModalToggle}>
                  //   Cancel
                  // </Button>,
                ]}
              >
                <Form id="modal-with-form-form">
                  <FormGroup
                    label="Enter environment name"
                    labelIcon={
                      <Popover >
                        <button
                          type="button"
                          aria-label="More info for name field"
                          onClick={(e) => e.preventDefault()}
                          aria-describedby="modal-with-form-form-name"
                          className="pf-c-form__group-label-help"
                        >
                          {/* <HelpIcon noVerticalAlign /> */}
                        </button>
                      </Popover>
                    }
                    isRequired
                    fieldId="modal-with-form-form-name"
                  >
                    <TextInput
                      isRequired
                      type="email"
                      id="modal-with-form-form-name"
                      name="modal-with-form-form-name"
                      value={env}
                      onChange={handleNameInputChange}
                      ref={nameInputRef}
                    />
                  </FormGroup>
                </Form>
              </Modal>
            </Td>
            <Td>
              <ClipboardCopy hoverTip="Copy" clickTip="Copied" style={{
                width: "500px",
                height: "40px",
              }}>
                {apiKey}
              </ClipboardCopy>
            </Td>
          </Tr>
        </Tbody>
      </TableComposable>
    </>
  );
};

export default ApiKey;
