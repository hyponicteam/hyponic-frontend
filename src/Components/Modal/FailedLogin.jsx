import React from "react";
import { Modal, Button } from "react-bootstrap";

function FailedLogin(props) {
  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <h4>Gagal Login</h4>
        <p>Email dan/atau password Anda salah, silakan coba lagi</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Kembali</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FailedLogin;
