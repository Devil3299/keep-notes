import React, { useRef, useState } from "react";
import { createNote } from "../firebase/database";
import { useOutsideClick } from "../hooks/useOutsideClick";

export default function NewNote({ handleSetNotes }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [err, setErr] = useState(false);
  const [isContentFocused, setIsContentFocused] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    setIsContentFocused(false);
    setErr(false);
  });

  const resetForm = () => {
    handleSetNotes();
    setNote({ title: "", content: "" });
  };

  return (
    <div
      ref={wrapperRef}
      className="relative max-w-md mx-auto flex flex-col h-max p-6 bg-white rounded-lg shadow-[0px_0px_3px_rgba(3,102,214,0.3)]"
    >
      {isContentFocused && (
        <>
          <input
            placeholder="Title"
            value={note.title}
            onBlur={(e) => {
              if (e.target.value.length === 0) {
                setErr(true);
              }
            }}
            onChange={(e) => {
              setErr(e.target.value.length === 0);
              setNote({ ...note, title: e.target.value });
            }}
            onFocus={() => setIsContentFocused(true)}
            className="outline-0 text-xl font-bold font-mono"
          />
          {err && (
            <span className="text-red-500 text-sm">Please enter title</span>
          )}
        </>
      )}
      <textarea
        className="w-80 mt-2 mb-4 outline-0 font-mono resize-none"
        rows={5}
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        onFocus={() => setIsContentFocused(true)}
        placeholder="Take a note..."
      />
      <button
        className="absolute -bottom-4 right-8 h-8 w-8 rounded-full bg-yellow-500 hover:bg-yellow-400 font-bold shadow-xl text-white"
        onClick={() => {
          if (note.title.length > 0) {
            createNote(note.title, note.content, resetForm);
          } else {
            setErr(true);
          }
        }}
      >
        <span>&#43;</span>
      </button>
    </div>
  );
}
