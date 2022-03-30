import {
  Button,
  Form,
  FormGroup, Modal,
  ModalVariant, Popover,
  TextInput
} from "@patternfly/react-core";
import { useEffect, useRef, useState } from "react";
import {
  Caption, TableComposable, Tbody,
  Td, Tr
} from "@patternfly/react-table";

const DeleteSpa = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [env, setEnv] = useState("");
  const nameInputRef = useRef();

  async function handleModalToggle() {

    setModalOpen(!isModalOpen);
  }

  async function onClickMethod() {
    setModalOpen(!isModalOpen);
  }

  const handleNameInputChange = (value) => {
    setEnv(value);
  };

  useEffect(() => {
    if (isModalOpen && nameInputRef && nameInputRef.current) {
      //  nameInputRef.current.focus();
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

              <Button variant="danger" onClick={handleModalToggle}>
                Delete Web Property
              </Button>
              <Modal
                variant={ModalVariant.small}
                title="Are Your Sure ? "
                description="You are deleting this Web Property from SPAship. This operation will delete all data permanenetly."
                isOpen={isModalOpen}
                titleIconVariant="danger"
                onClose={handleModalToggle}
                actions={[
                  <Button key="create" variant="danger" onClick={onClickMethod}>
                    Yes, Delete
                  </Button>,
                  <Button
                    key="cancel"
                    variant="link"
                    style={{
                      color: "#000000",
                    }}
                    onClick={handleModalToggle}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                <Form id="modal-with-form-form">
                  <FormGroup
                    // label="Enter environment name"

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
                      placeholder='Enter web property name'
                      type="text"
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


          </Tr>
        </Tbody>
      </TableComposable>
    </>
  );
};

export default DeleteSpa;
