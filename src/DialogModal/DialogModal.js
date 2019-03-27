import React from "react";
import { ModalFooterButton } from "./styles";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const DialogModal = props => {
  const {
    toggle,
    isOpen,
    className,
    onConfirm,
    isConfirm = false,
    title = "Dialog Title",
    hasHeader = true,
    centered = false,
    type = "info",
    size = "sm"
  } = props;

  let primaryColor;
  switch (type) {
    case "success":
      primaryColor = "#28a745";
      break;
    case "danger":
      primaryColor = "#dc3545";
      break;
    default:
      primaryColor = "#007bff";
      break;
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={className}
        centered={centered}
        size={size}
      >
        {hasHeader && (
          <ModalHeader style={{ backgroundColor: primaryColor, color: "#fff" }}>
            {title}
          </ModalHeader>
        )}
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          {isConfirm && (
            <ModalFooterButton outline color="secondary" onClick={toggle}>
              Cancel
            </ModalFooterButton>
          )}
          <ModalFooterButton
            color={type}
            onClick={isConfirm ? onConfirm : toggle}
          >
            Continue
          </ModalFooterButton>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DialogModal;
