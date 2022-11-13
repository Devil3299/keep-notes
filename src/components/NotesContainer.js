import React, { useEffect, useState } from "react";
import EditNote from "./EditNote";
import Loader from "./Loader";
import Note from "./Note";

export default function NotesContainer({ notes, handleSetNotes }) {
  const [currentNote, setCurrentNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenEditNote = (note) => {
    setCurrentNote(note);
    setShowModal(true);
  };

  useEffect(() => {
    handleSetNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {notes.length > 0 && notes[0].id ? (
        <div className="mt-12 p-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
          {notes.map((note, idx) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                openEditNote={() => handleOpenEditNote(note)}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center mt-32">
          <Loader />
        </div>
      )}
      {showModal && (
        <EditNote
          note={currentNote}
          open={showModal}
          hide={() => {
            handleSetNotes();
            setShowModal(false);
          }}
          changeTitle={(val) => setCurrentNote({ ...currentNote, title: val })}
          changeContent={(val) =>
            setCurrentNote({ ...currentNote, content: val })
          }
        />
      )}
    </>
  );
}
