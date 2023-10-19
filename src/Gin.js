import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getDocs, collection } from 'firebase/firestore';
import { db, ginGamesCollection, addGame } from './firebase'; // Assuming you have a 'firebase.js' file for Firebase setup

function Gin() {
  const { register, handleSubmit, reset } = useForm();
  const [games, setGames] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const loadGames = async () => {
      // Reference the collection
      const gamesCollection = collection(db, 'ginGames');

      // Fetch the documents from the collection
      const querySnapshot = await getDocs(gamesCollection);

      const gamesData = [];
      querySnapshot.forEach((doc) => {
        gamesData.push(doc.data());
      });

      setGames(gamesData);
    };

    loadGames();
  }, []); // Call loadGames when the component mounts

  const onSubmit = async (data) => {
    if (editIndex === -1) {
      // Use the addGame function to add a new game to Firestore
      await addGame(data);
    } else {
      const updatedGames = [...games];
      updatedGames[editIndex] = data;
      setGames(updatedGames);
      setEditIndex(-1);
    }
    reset();
    setShowInput(false);
  };

  const calculateFinalScore = (game) => {
    let player1Score = 0;
    let player2Score = 0;
    game.rounds.forEach((round) => {
      if (round.winner === game.player1) {
        player1Score += round.score;
      } else {
        player2Score += round.score;
      }
    });
    return { [game.player1]: player1Score, [game.player2]: player2Score };
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Gin Game Scores</Card.Title>
          <Button
            onClick={() => {
              setShowInput(!showInput);
              if (showInput === true) {
                setEditIndex(-1);
                reset();
              }
            }}
          >
            {showInput ? 'Hide Input' : 'Show Input'}
          </Button>
          {showInput && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="player1">
                  <Form.Label>Player 1</Form.Label>
                  <Form.Control type="text" placeholder="Player 1" {...register('player1')} />
                </Form.Group>
                <Form.Group as={Col} controlId="player2">
                  <Form.Label>Player 2</Form.Label>
                  <Form.Control type="text" placeholder="Player 2" {...register('player2')} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="date">
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    name="date"
                    selected={new Date()}
                    showTimeSelect
                    dateFormat="Pp"
                    timeCaption="Time"
                    placeholderText="Date and Time"
                    {...register('date')}
                  />
                </Form.Group>
              </Row>
              <Button variant="primary" onClick={() => setGames([...games])}>
                Add Round
              </Button>
              <Button type="submit" variant="success" className="ms-2">
                {editIndex === -1 ? 'Add Game' : 'Save Game'}
              </Button>
            </Form>
          )}
          <hr />
          <ul>
            {games.map((game, gameIndex) => (
              <Card key={gameIndex} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    {game.player1} vs {game.player2}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Date: {game.date ? game.date.toLocaleString() : 'N/A'}</Card.Subtitle>
                  <Button
                    onClick={() => {
                      setShowInput(true);
                      setEditIndex(gameIndex);
                    }}
                  >
                    Edit Game
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={async () => {
                      // Remove the game from Firestore using its ID
                      await ginGamesCollection.doc(game.id).delete();
                      const updatedGames = [...games];
                      updatedGames.splice(gameIndex, 1);
                      setGames(updatedGames);
                    }}
                  >
                    Delete Game
                  </Button>
                  <ul>
                    {game.rounds.map((round, roundIndex) => (
                      <li key={roundIndex}>
                        Winner: {round.winner}, Score: {round.score}, Win Type: {round.winType}
                      </li>
                    ))}
                  </ul>
                  <div>
                    Final Score: {game.player1}: {calculateFinalScore(game)[game.player1]}, {game.player2}:{' '}
                    {calculateFinalScore(game)[game.player2]}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Gin;
