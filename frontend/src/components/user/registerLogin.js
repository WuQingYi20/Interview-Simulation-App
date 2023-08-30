import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const RegisterLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');

    const { username, email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/registerLogin', {
                username,
                email,
                password,
            });
            setMessage(`Successfully logged in/registered: ${res.data.message}`);
            // Store the token and user info in local storage or state
            localStorage.setItem('token', res.data.token);
        } catch (error) {
            console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setMessage(`Failed to login/register: ${error.response.data.message}`);
            } else if (error.request) {
                // The request was made but no response was received
                setMessage('Failed to login/register: No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                setMessage(`Failed to login/register: ${error.message}`);
            }
        }
    };


    return (
        <div>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register/Login
                </Button>
            </Form>
        </div>
    );
};

export default RegisterLogin;
