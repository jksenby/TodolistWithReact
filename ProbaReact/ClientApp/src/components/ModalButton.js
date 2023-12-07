import { Button } from "reactstrap";
import { useState } from "react";
import { Modal } from "react-bootstrap";
const ModalButton = ({ modalContent, title, btnName, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  console.log(onClose);
  if (onClose === "true") handleCloseModal();
  return (
    <div>
      <Button color="primary" onClick={handleOpenModal}>
        {btnName}
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalButton;
