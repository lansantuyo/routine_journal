import React from 'react';

interface Entry {
    id: string;
    body: string;
}

interface SidebarProps {
    entries: Entry[];
    currentEntry: Entry;
    setCurrentEntryId: (id: string) => void;
    newEntry: () => void;
    deleteEntry: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
    const entryElements = props.entries.map((entry, index) => (
        <div key={entry.id}>
            <div
                className={`title ${entry.id === props.currentEntry.id ? "selected-entry" : ""}`}
                onClick={() => props.setCurrentEntryId(entry.id)}
            >
                <h4 className="text-snippet">{entry.body.split("\n")[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent onClick from triggering when the button is clicked
                        props.deleteEntry(entry.id);
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
                <h3>Entries</h3>
                <button className="new-entry" onClick={props.newEntry}>+</button>
            </div>
            {entryElements}
        </section>
    );
};

export default Sidebar;
