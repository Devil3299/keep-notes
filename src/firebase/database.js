import { child, get, push, ref, set, update, remove } from "firebase/database";
import { db } from "../firebase/firebase.config";

const getUTCTime = () => Math.floor(new Date().getTime()/1000.0)

const reference = ref(db, "notes/");

const createNote = (title, content, cb) => {
  const newRef = push(reference);
  set(newRef, {
    title,
    content,
    updatedAt : getUTCTime()
  })
    .then(() => {
      cb();
    })
    .catch((err) => console.warn(err));
};

const deleteNote = async (id, cb) => {
  const noteToBeDeleted = child(reference, `${id}/`);
  remove(noteToBeDeleted)
    .then(cb)
    .catch((err) => console.log(err));
};

const updateNote = (id, title, content, cb) => {
  let updatedNotes = {};
  updatedNotes[id] = {
    title,
    content,
    updatedAt : getUTCTime()
  };

  update(reference, updatedNotes)
    .then(cb)
    .catch((err) => console.log(err));
};

const getAllNotesFromDB = async () => {
  debugger
  const result = [];
  const snapshot = await get(reference);
  const data = await snapshot.val();
  if(!data) {
    return null;
  }
  Object.keys(data).forEach((key) => {
    const obj = {
      id: key,
      title: data[key].title,
      content: data[key].content,
      updatedAt : data[key].updatedAt
    };
    result.push(obj);
    result.sort((note1, note2) => note2.updatedAt - note1.updatedAt)
    // result.sort((note1, note2) => note1.updatedAt - note2.updatedAt);
  });
  if (result.length > 0) {
    return result;
  } else {
    return null;
  }
};

export { createNote, updateNote, deleteNote, getAllNotesFromDB };
