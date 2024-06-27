import React, { useState, useRef } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';

const PDFUpload = ({ label, name, onChange, showError }) => {
    const [pdfSamples, setPdfSamples] = useState([]);
    const [pdfSamplesPreview, setPdfSamplesPreview] = useState([]);

    const pdfSamplesInputRef = useRef(null);

    const handlePdfChange = (e) => {
        const files = e.target.files;
        const newPdfSamples = [];
        const newPdfSamplesPreview = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (!['application/pdf'].includes(file.type)) {
                showError('Chỉ chấp nhận các định dạng: pdf.');
                return;
            }

            newPdfSamples.push(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                newPdfSamplesPreview.push({ file, preview: reader.result });
                setPdfSamplesPreview([...pdfSamplesPreview, ...newPdfSamplesPreview]);
            };
            reader.readAsDataURL(file);
        }

        setPdfSamples([...pdfSamples, ...newPdfSamples]);
        console.log('name:', name, 'value:', [...pdfSamples, ...newPdfSamples]);
        onChange({ target: { name, value: [...pdfSamples, ...newPdfSamples] } });
    };

    const handlePdfRemove = (index) => {
        const newPdfSamples = [...pdfSamples];
        const newPdfSamplesPreview = [...pdfSamplesPreview];

        newPdfSamples.splice(index, 1);
        newPdfSamplesPreview.splice(index, 1);

        setPdfSamples(newPdfSamples);
        setPdfSamplesPreview(newPdfSamplesPreview);

        console.log('name:', name, 'value:', newPdfSamples);
        onChange({ target: { name, value: newPdfSamples } });

        const dataTransfer = new DataTransfer();
        newPdfSamples.forEach((file) => dataTransfer.items.add(file));
        pdfSamplesInputRef.current.files = dataTransfer.files;

        
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
                ref={pdfSamplesInputRef}
                onChange={handlePdfChange}
            />
            {pdfSamplesPreview.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                    <ListGroup>
                        {pdfSamplesPreview.map((item, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center" style={{ fontSize: 'small' }}>
                                <span>{item.file.name}</span>
                                <Button
                                    variant="danger"
                                    onClick={() => handlePdfRemove(index)}
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

export default PDFUpload;
