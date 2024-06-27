import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import "../../assets/style/HandleHoverImage.css";

const ImageUpload = ({ label, name, onChange, showError }) => {
    const [bookImagePreview, setBookImagePreview] = useState(null);
    const [hoverImage, setHoverImage] = useState(false);

    const bookImageInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                showError('Chỉ chấp nhận các định dạng: jpg, jpeg, png.');
                return;
            }


            const reader = new FileReader();
            reader.onloadend = () => {
                setBookImagePreview(reader.result);

                console.log('name:', name, 'value:', file);
                onChange({ target: { name, value: file } });
            };
            reader.readAsDataURL(file);
        } else {
            setBookImagePreview(null);

            console.log('name:', name, 'value:', null);
            onChange({ target: { name, value: null } });
        }

    };

    const handleImageRemove = () => {
        setBookImagePreview(null);

        console.log('name:', name, 'value:', null);
        onChange({ target: { name, value: null } });

        const dataTransfer = new DataTransfer();
        bookImageInputRef.current.files = dataTransfer.files;

    };

    return (
        <Form.Group className="mb-3">
            {label && <Form.Label className="label">{label}</Form.Label>}
            <Form.Control
                className="field-input"
                type="file"
                style={{ fontSize: "small" }}
                name={name}
                ref={bookImageInputRef}
                onChange={handleImageChange}
            />
            <div
                className="image-container"
                onMouseEnter={() => setHoverImage(true)}
                onMouseLeave={() => setHoverImage(false)}
                style={{ display: bookImagePreview ? 'flex' : 'none' }}
            >
                {bookImagePreview && (
                    <img
                        src={bookImagePreview}
                        alt="Book Preview"
                        style={{
                            maxWidth: '100px',
                            height: 'auto',
                            opacity: hoverImage ? 0.3 : 1,
                            transition: 'opacity 0.3s ease',
                        }}
                    />
                )}
                {bookImagePreview && (
                    <Button
                        variant='none'
                        onClick={handleImageRemove}
                        className="remove-image-button"
                    >
                        <i className="bi bi-trash3"></i>
                    </Button>
                )}
            </div>
        </Form.Group>
    );
};

export default ImageUpload;
