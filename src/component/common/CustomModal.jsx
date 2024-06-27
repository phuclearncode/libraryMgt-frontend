import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CustomModal = ({ show, handleClose, title, children, handleSave, size }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size={size}
            style={{
                fontSize: 'small'
            }}
        >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {children}

                </Modal.Body>

                <Modal.Footer>
                    <Button
                        style={{
                            fontSize: 'small',
                            backgroundColor: 'transparent',
                            color: '#4D4D4D',
                            border: '1px solid #ABABAB',
                            marginLeft: '10px'
                        }}
                        onClick={handleClose}
                    >
                        Thoát
                    </Button>
                    <Button
                        type="submit"
                        style={{
                            fontSize: 'small',
                            backgroundColor: '#F87555',
                            border: 'none',
                        }}
                        onClick={handleSave}
                    >
                        Lưu thay đổi
                    </Button>
                </Modal.Footer>
            </Form>

        </Modal >
    );
};

export default CustomModal;
