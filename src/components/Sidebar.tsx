import React from 'react';

// Define an interface for the note and the component props
interface Note {
    id: string;
    body: string;
}

interface SidebarProps {
    entries: Note[];
    currentEntry: Note;
    setCurrentEntryId: (id: string) => void;
    newEntry: () => void;
    deleteEntry: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const noteElements = props.entries.map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${note.id === props.currentEntry.id ? "selected-note" : ""}`}
                onClick={() => props.setCurrentEntryId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent onClick from triggering when the button is clicked
                        props.deleteEntry(note.id);
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
                <button className="new-entry" onClick={props.newEntry}>+</button>
            </div>
            {noteElements}
        </section>
    );
};

export default Sidebar;
