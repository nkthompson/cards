import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; // Import Firestore




const firebaseConfig = {
  apiKey: "AIzaSyCBxWehlMtkaIlUnzKv6d9B8Dnr-20jC-8",
  authDomain: "cards-ea37f.firebaseapp.com",
  projectId: "cards-ea37f",
  storageBucket: "cards-ea37f.appspot.com",
  messagingSenderId: "546579064404",
  appId: "1:546579064404:web:30943b720b893fd867afc1",
  measurementId: "G-0RFZ7JQ2XL"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export the Firebase Authentication and Firestore instances
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp); // Initialize Firestore
const ginGamesCollection = collection(db, 'ginGames'); // Reference to the 'ginGames' collection

// Add a new game
const addGame = async () => {
  const newGameRef = await addDoc(ginGamesCollection, {
    player1: "Alice",
    player2: "Bob",
    date: serverTimestamp(), // Use serverTimestamp to set the date
    rounds: [
      { winner: "Alice", score: 25, winType: "Gin" },
      { winner: "Bob", score: 10, winType: "Knock" },
      // ... other rounds
    ],
  });
  console.log("Game added with ID: ", newGameRef.id);
};

export { auth, db, ginGamesCollection, addGame };