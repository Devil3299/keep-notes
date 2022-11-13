import React, { useState } from "react";
import { getAllNotesFromDB } from "../firebase/database";
import EditNote from "./EditNote";
import NewNote from "./NewNote";
import NotesContainer from "./NotesContainer";

export default function MainComponent() {
  const [notes, setNotes] = useState([{}, {}, {}]);
  const handleSetNotes = () => {
    getAllNotesFromDB().then((res) => {
      setNotes(res);
    });
  };
  return (
    <div className="min-h-screen mx-auto flex-col flex p-6 bg-gray-300">
      <NewNote handleSetNotes={handleSetNotes} />
      <NotesContainer notes={notes} handleSetNotes={handleSetNotes} />
      <EditNote />
    </div>
  );
}
