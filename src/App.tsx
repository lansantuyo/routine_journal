import React, { useEffect, useState } from "react";
import { createRoot } from 'react-dom/client'; // React 18 entry point
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

interface Note {
  id: string;
  body: string;
  createdAt: number;
  updatedAt: number;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNoteId, setCurrentNoteId] = useState<string>("");
  const [tempNoteText, setTempNoteText] = useState<string>("");

  const currentNote = notes.find(note => note.id === currentNoteId) || notes[0];
  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    if (!currentNoteId && notes.length) {
      setCurrentNoteId(notes[0].id);
    }
  }, [notes]);

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNote && tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText]);

  const saveNotesToLocal = (notes: Note[]) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };

  async function createNewNote() {
    const newNote: Note = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    setCurrentNoteId(newNote.id);
    saveNotesToLocal(newNotes);
  }

  async function updateNote(text: string) {
    const updatedNotes = notes.map(note => note.id === currentNoteId ? { ...note, body: text, updatedAt: Date.now() } : note);
    setNotes(updatedNotes);
    saveNotesToLocal(updatedNotes);
  }

  async function deleteNote(noteId: string) {
    const filteredNotes = notes.filter(note => note.id !== noteId);
    setNotes(filteredNotes);
    saveNotesToLocal(filteredNotes);
  }

  return (
      <main>
        {
          notes.length > 0
              ?
              <Split
                  sizes={[30, 70]}
                  direction="horizontal"
                  className="split"
              >
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                <Editor
                    tempNoteText={tempNoteText}
                    setTempNoteText={setTempNoteText}
                />
              </Split>
              :
              <div className="no-notes">
                <h1>You have no notes</h1>
                <button
                    className="first-note"
                    onClick={createNewNote}
                >
                  Create one now
                </button>
              </div>
        }
      </main>
  );
}