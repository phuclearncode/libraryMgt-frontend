import React from 'react';
import { Modal, Button, Col, Row, Nav } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, children, handleSave }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            size="lg"
            style={{
                fontSize: 'small'
            }}
        >

            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {children}

            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>

        </Modal >
    );
};

export default CustomModal;
