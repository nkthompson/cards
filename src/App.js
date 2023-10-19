import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Dashboard from './Dashboard';
import Login from './Login';
import SignUp from './SignUp';
import Account from './Account';
import Gin from './Gin'; // Import the Gin component

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/dashboard">Ellen's Playing Cards League</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {user ? (
                <>
                  <Nav.Link as={Link} to="/gin">Gin Game</Nav.Link> {/* Add the "Gin Game" link */}
                  <Nav.Link as={Link} to="/account">Account</Nav.Link> {/* Render "Account" link when logged in */}
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {user && <Route path="/account" element={<Account />} />} {/* Conditionally render the "Account" route */}
          <Route path="/gin" element={<Gin />} /> {/* Add the "Gin" route */}
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
