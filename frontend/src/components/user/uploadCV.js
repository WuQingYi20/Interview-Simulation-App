import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const UploadCV = () => {
    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setUploadStatus('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('cv', file);

        try {
            const response = await axios.post('/api/uploadCV', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setUploadStatus('File uploaded and processed successfully.');
            } else {
                setUploadStatus('File upload failed.');
            }
        } catch (error) {
            setUploadStatus(`An error occurred: ${error.message}`);
        }
    };

    return (
        <div className="upload-cv-container">
            <Form>
                <Form.Group controlId="formCV">
                    <Form.Label>Upload Your CV</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form.Group>
                <Button variant="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </Form>
            {uploadStatus && <Alert variant="info">{uploadStatus}</Alert>}
        </div>
    );
};

export default UploadCV;
