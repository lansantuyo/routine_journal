import React, {useEffect, useState} from "react";
import {createRoot} from 'react-dom/client'; // React 18 entry point
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import {nanoid} from "nanoid";

interface Entry {
    id: string;
    body: string;
    createdAt: number;
    updatedAt: number;
}

export default function App() {
    const [entries, setEntries] = useState<Entry[]>([]);
    const [currentEntryId, setCurrentEntryId] = useState<string>("");
    const [tempEntryText, setTempEntryText] = useState<string>("");

    const currentEntry = entries.find(entry => entry.id === currentEntryId) || entries[0];
    const sortedEntries = entries.sort((a, b) => b.updatedAt - a.updatedAt);

    // Load notes from localStorage on component mount
    useEffect(() => {
        const savedEntries = JSON.parse(localStorage.getItem("entries") || "[]");
        setEntries(savedEntries);
    }, []);

    useEffect(() => {
        if (!currentEntryId && entries.length) {
            setCurrentEntryId(entries[0].id);
        }
    }, [entries]);

    useEffect(() => {
        if (currentEntry) {
            setTempEntryText(currentEntry.body);
        }
    }, [currentEntry]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (currentEntry && tempEntryText !== currentEntry.body) {
                updateEntry(tempEntryText);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [tempEntryText]);

    const saveEntriesToLocal = (entries: Entry[]) => {
        localStorage.setItem("entries", JSON.stringify(entries));
    };

    async function createNewEntry() {
        const newEntry: Entry = {
            id: nanoid(),
            body: "# Journal Entry Title",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        const newEntries = [...entries, newEntry];
        setEntries(newEntries);
        setCurrentEntryId(newEntry.id);
        saveEntriesToLocal(newEntries);
    }

    async function updateEntry(text: string) {
        const updatedEntries = entries.map(entry => entry.id === currentEntryId ? {
            ...entry,
            body: text,
            updatedAt: Date.now()
        } : entry);
        setEntries(updatedEntries);
        saveEntriesToLocal(updatedEntries);
    }

    async function deleteEntry(entryId: string) {
        const filteredEntries = entries.filter(entry => entry.id !== entryId);
        setEntries(filteredEntries);
        saveEntriesToLocal(filteredEntries);
    }

    return (
        <main>
            {
                entries.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            entries={sortedEntries}
                            currentEntry={currentEntry}
                            setCurrentEntryId={setCurrentEntryId}
                            newEntry={createNewEntry}
                            deleteEntry={deleteEntry}
                        />
                        <Editor
                            tempEntryText={tempEntryText}
                            setTempEntryText={setTempEntryText}
                        />
                    </Split>
                    :
                    <div className="no-entries">
                        <h1>You have no entries</h1>
                        <button
                            className="first-entry"
                            onClick={createNewEntry}
                        >
                            Create one now
                        </button>
                    </div>
            }
        </main>
    );
}