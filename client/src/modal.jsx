import React from 'react'
import { Modal, Button } from 'react-bootstrap'
function ModalDialog() {
  const [isShow, invokeModal] = React.useState(false)
  const initModal = () => {
    return invokeModal(!false)
  }
  return (
    <>
      <Button variant="success" onClick={initModal}>
        Open Modal
      </Button>
      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>React Modal Popover Example</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Close
          </Button>
          <Button variant="dark" onClick={initModal}>
            Store
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
export default ModalDialog;