import React, { useEffect, useState } from "react";
import DeleteIcon from "../assets/icons/delete.svg";
import { deleteNote, updateNote } from "../firebase/database";

export default function EditNote({
  open,
  hide,
  note,
  changeTitle,
  changeContent,
}) {
  const [err, setErr] = useState({ text: "", flag: false });
  useEffect(() => {
    if (open) {
      document.getElementsByTagName("body")[0].style.overflow = "hidden";
    }

    return () =>
      (document.getElementsByTagName("body")[0].style.overflow = "auto");
  }, [open]);

  const handleUpdateNote = () => {
    updateNote(note.id, note.title, note.content, hide);
  };

  const handleDeleteNote = () => {
    deleteNote(note.id, hide);
  };

  return (
    <>
      {open ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-6 mx-auto max-w-4xl">
              <div className="rounded-lg flex flex-col w-full bg-white p-8">
                <div
                  className="absolute right-8 top-4 cursor-pointer"
                  onClick={hide}
                >
                  🗙
                </div>
                <div className="flex flex-col">
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
                          ? {
                              text: "Max 40 characters are allowed",
                              flag: true,
                            }
                          : { text: "", flag: false }
                      );
                      changeTitle(e.target.value);
                    }}
                    className="outline-0 text-xl font-bold font-mono"
                  />
                  {err.flag && (
                    <span className="text-red-500 text-sm">{err.text}</span>
                  )}
                  <textarea
                    value={note.content}
                    onChange={(e) => changeContent(e.target.value)}
                    className="w-full mt-2 mb-4 outline-0 font-mono resize-none"
                    rows={10}
                    placeholder="Take a note..."
                  />
                </div>
                <div className="flex justify-between items-center rounded-b">
                  <img
                    className="p-1 cursor-pointer"
                    src={DeleteIcon}
                    alt=""
                    onClick={() => handleDeleteNote(note.id)}
                  />
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      if (note.title.length > 0) {
                        if (note.title.length > 40) {
                          setErr({
                            text: "Max 40 characters are allowed",
                            flag: true,
                          });
                        } else {
                          handleUpdateNote();
                        }
                      } else {
                        setErr({ text: "Please enter title", flag: true });
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
