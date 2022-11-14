import React, { useRef, useState } from "react";
import { createNote } from "../firebase/database";
import { useOutsideClick } from "../hooks/useOutsideClick";

export default function NewNote({ handleSetNotes }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  const [err, setErr] = useState({ text: "", flag: false });
  const [isContentFocused, setIsContentFocused] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => {
    setIsContentFocused(false);
    setErr({ text: "", flag: false });
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
                setErr({ text: "Please enter title", flag: true });
              }
            }}
            onChange={(e) => {
              setErr(
                e.target.value.length === 0
                  ? { text: "Please enter title", flag: true }
                  : e.target.value.length > 40
                  ? { text: "Max 40 characters are allowed", flag: true }
                  : { text: "", flag: false }
              );
              setNote({ ...note, title: e.target.value });
            }}
            onFocus={() => setIsContentFocused(true)}
            className="outline-0 text-xl font-bold font-mono"
          />
          {err.flag && (
            <span className="text-red-500 text-sm">{err.text}</span>
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
            if (note.title.length > 40) {
              setErr({ text: "Max 40 characters are allowed", flag: true });
            } else {
              createNote(note.title, note.content, resetForm);
            }
          } else {
            setErr({ text: "Please enter title", flag: true });
          }
        }}
      >
        <span>&#43;</span>
      </button>
    </div>
  );
}
