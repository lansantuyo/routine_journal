import React, { useState, useEffect } from 'react';
import { Button, Notification } from '@mantine/core';
import { FaPlay, FaPause, FaSync } from 'react-icons/fa';
import '../styles/TimerPage.css';

export default function TimerPage() {
    const [initialTime, setInitialTime] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(initialTime);
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTime, setEditedTime] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [tasks, setTasks] = useState<{ id: number; description: string; completed: boolean }[]>([]);

    useEffect(() => {
        if (isActive) {
            const id = window.setInterval(() => {
                setSeconds(prevSeconds => {
                    const newSeconds = prevSeconds - 1;
                    if (newSeconds <= 0) {
                        clearInterval(id);
                        setIsActive(false);
                        setShowNotification(true);
                        return 0; // Set to 0 to prevent negative values
                    }
                    return newSeconds;
                });
            }, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
            setIntervalId(undefined);
        }

        return () => {
            clearInterval(intervalId);
            setIntervalId(undefined);
        };
    }, [isActive]);

    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const remainingSeconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleStart = () => {
        setIsActive(true);
    };

    const handlePause = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setSeconds(initialTime);
        clearInterval(intervalId);
        setIntervalId(undefined);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedTime(formatTime(initialTime));
    };

    const handleSaveEdit = () => {
        setIsEditing(false);
        const [minutesStr, secondsStr] = editedTime.split(':');
        const minutes = parseInt(minutesStr, 10);
        const seconds = parseInt(secondsStr, 10);
        setInitialTime(isNaN(minutes) || isNaN(seconds) ? 0 : minutes * 60 + seconds);
        setSeconds(isNaN(minutes) || isNaN(seconds) ? 0 : minutes * 60 + seconds);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTime(formatTime(initialTime));
    };

    const handleTaskDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(e.target.value);
    };

    const addTask = () => {
        if (taskDescription.trim() !== '') {
            const newTask = { id: tasks.length + 1, description: taskDescription, completed: false };
            setTasks(prevTasks => [...prevTasks, newTask]);
            setTaskDescription('');
        }
    };

    const toggleTaskCompletion = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    return (
        <div className="timer-container">
            <h1 className="timer-text" onClick={handleEdit} style={{ cursor: 'pointer' }}>
                {isEditing ? <input value={editedTime} onChange={(e) => setEditedTime(e.target.value)} onBlur={handleSaveEdit} /> : <span>{formatTime(seconds)}</span>}
            </h1>
            <div className="button-container">
            <Button onClick={handleStart} disabled={isActive} variant="light" color="#ead8c2" radius="lg">
                <FaPlay /> Start
            </Button>
            <Button onClick={handlePause} disabled={!isActive} variant="light" color="#ead8c2" radius="lg">
                <FaPause /> Pause
            </Button>
            <Button onClick={handleReset} variant="light" color="#ead8c2" radius="lg">
                <FaSync /> Restart
            </Button>
            </div>
            {showNotification && (
                <Notification
                    title="🤸BREAK TIME🤸"
                    onClose={() => setShowNotification(false)}
                    color="teal"
                />
            )}
            <div className="task-container">
                <input
                    type="text"
                    placeholder="Task to finish..."
                    value={taskDescription}
                    onChange={handleTaskDescriptionChange}
                />
                <Button onClick={addTask} variant="light" color="#ead8c2">
                    Add Task
                </Button>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => toggleTaskCompletion(task.id)}
                            />
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.description}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
