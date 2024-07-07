import React, { useState, useRef } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const MultipleImageUpload = ({ label, name, onChange, showError }) => {
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const imageInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImageFiles = [];
        const newImagePreviews = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                showError('Chỉ chấp nhận các định dạng: jpg, jpeg, png.');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                showError('Kích thước ảnh không được vượt quá 2MB.');
                return;
            }

            newImageFiles.push(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                newImagePreviews.push({ file, preview: reader.result });
                setImagePreviews((prevPreviews) => [...prevPreviews, { file, preview: reader.result }]);
            };
            reader.readAsDataURL(file);
        }

        setImageFiles((prevFiles) => [...prevFiles, ...newImageFiles]);
        console.log('name:', name, 'files:', [...imageFiles, ...newImageFiles]);
        onChange({ target: { name, files: [...imageFiles, ...newImageFiles] } });
    };

    const handleImageRemove = (index) => {
        const newImageFiles = [...imageFiles];
        const newImagePreviews = [...imagePreviews];

        newImageFiles.splice(index, 1);
        newImagePreviews.splice(index, 1);

        setImageFiles(newImageFiles);
        setImagePreviews(newImagePreviews);

        console.log('name:', name, 'files:', newImageFiles);
        onChange({ target: { name, files: newImageFiles } });

        const dataTransfer = new DataTransfer();
        newImageFiles.forEach((file) => dataTransfer.items.add(file));
        imageInputRef.current.files = dataTransfer.files;
    };

    return (
        <Form.Group className="mb-3">
            {label && <Form.Label className="label">{label}</Form.Label>}
            <Form.Control
                className="field-input"
                type="file"
                multiple
                style={{ fontSize: "small" }}
                name={name}
                ref={imageInputRef}
                onChange={handleImageChange}
            />
            {imagePreviews.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                    <ListGroup>
                        {imagePreviews.map((item, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ fontSize: 'small' }}>
                                <img src={item.preview} alt={item.file.name} style={{ maxWidth: '50px', maxHeight: '50px', marginRight: '10px' }} />
                                <span>{item.file.name}</span>
                                <Button
                                    variant="danger"
                                    onClick={() => handleImageRemove(index)}
                                    style={{
                                        fontSize: 'small',
                                        backgroundColor: '#fff',
                                        border: 'none',
                                        color: '#000'
                                    }}
                                >
                                    <i className="bi bi-trash3"></i>
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            )}
        </Form.Group>
    );
};

export default MultipleImageUpload;
