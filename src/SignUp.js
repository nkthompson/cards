import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { Link } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // You can navigate to the dashboard or do other actions after a successful signup.
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="my-4">
            <Card>
              <Card.Body className="p-4">
                <h2>Sign Up</h2>
                <Form onSubmit={handleSignUp}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-3"> {/* Add margin-bottom */}
                    Sign Up
                  </Button>
                </Form>
                {error && <p className="text-danger mt-2">{error}</p>}
                <p className="mt-3">Already have an account? <Link to="/login">Log in</Link></p> {/* Add more margin-top */}
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
