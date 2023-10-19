import { firestore } from "./firebase";

// Function to add a new note
const addNote = (title, content) => {
  firestore.collection("notes").add({
    title,
    content,
  });
};

// Function to retrieve all notes
const getNotes = async () => {
  const notesSnapshot = await firestore.collection("notes").get();
  const notes = notesSnapshot.docs.map((doc) => doc.data());
  return notes;
};

export { addNote, getNotes };
