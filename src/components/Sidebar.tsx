import React from 'react';

// Define an interface for the note and the component props
interface Note {
    id: string;
    body: string;
}

interface SidebarProps {
    notes: Note[];
    currentNote: Note;
    setCurrentNoteId: (id: string) => void;
    newNote: () => void;
    deleteNote: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""}`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent onClick from triggering when the button is clicked
                        props.deleteNote(note.id);
                    }}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    );
};

export default Sidebar;
