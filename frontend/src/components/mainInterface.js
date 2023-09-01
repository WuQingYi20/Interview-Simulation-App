import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, ListGroup, InputGroup, FormControl, Form } from 'react-bootstrap';

// 自定义CSS
import './mainInterface.css';

const MainInterface = () => {
    const [message, setMessage] = useState(''); // 用户输入的消息

    return (
        <Container className="main-container">
            <Row>
                {/* 左侧导航区 */}
                <Col md={3} className="left-nav">
                    <Button className="new-interview-btn">+ New Interview</Button>
                    <ListGroup className="interview-list">
                        <ListGroup.Item>Interview 1</ListGroup.Item>
                        <ListGroup.Item>Interview 2</ListGroup.Item>
                        {/* ... */}
                    </ListGroup>
                    <Button className="username-btn">吴一帆</Button>
                </Col>

                {/* 右侧主体区 */}
                <Col md={9} className="right-main">
                    <div className="chat-box">
                        {/* 这里放聊天记录 */}
                    </div>
                    <InputGroup className="input-area">
                        <FormControl
                            as="textarea"
                            rows={3}
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="input-box"
                        />
                        <InputGroup.Append>
                            <Button variant="primary" className="send-btn">Send</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default MainInterface;
