import React, { useState } from 'react';
import { updateProfile, signOut } from 'firebase/auth'; // Import signOut
import { auth } from './firebase';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Account() {
  const [newDisplayName, setNewDisplayName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const handleDisplayNameChange = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      setNewDisplayName('');
    } catch (error) {
      setError(error.message);
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigate('/login'); // Redirect to the login page
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
                <h2>Account Settings</h2>
                <Form onSubmit={handleDisplayNameChange}>
                  <Form.Group controlId="displayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter new display name"
                      value={newDisplayName}
                      onChange={(e) => setNewDisplayName(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" className="mt-3" type="submit">
                    Change Display Name
                  </Button>
                </Form>
                {error && <p className="text-danger mt-2">{error}</p>}
                <Button variant="danger" className="mt-3" onClick={handleLogout}>
                  Log Out
                </Button>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
