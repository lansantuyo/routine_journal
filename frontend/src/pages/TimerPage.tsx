import React, { useState, useEffect } from 'react';
import { Button, Notification, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
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
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

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
        const hrs = Math.floor(time / 3600);
        const mins = Math.floor((time % 3600) / 60);
        const remainingSeconds = time % 60;
        return `${hrs.toString().padStart(2, '00')}:${mins.toString().padStart(2, '00')}:${remainingSeconds.toString().padStart(2, '00')}`;
    };

    const [hrs, mins, secs] = formatTime(seconds).split(':').map(Number);

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
        const [hrsStr, minsStr, secsStr] = editedTime.split(':');
        const hrs = parseInt(hrsStr, 10);
        const mins = parseInt(minsStr, 10);
        const secs = parseInt(secsStr, 10);
        setInitialTime(isNaN(hrs) || isNaN(mins) || isNaN(secs) ? 0 : hrs * 3600 + mins * 60 + secs);
        setSeconds(isNaN(hrs) || isNaN(mins) || isNaN(secs) ? 0 : hrs * 3600 + mins * 60 + secs);
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedTime(formatTime(initialTime));
    };

    const handleBackgroundClick = () => {
        if (isEditing) { 
            setIsEditing(false); 
        }
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
        <div 
            className="timer-container"
            style={{ 
                backgroundColor: computedColorScheme === 'dark' ? '#2D2222' : '#EAD8C2', 
                color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                paddingTop: `150px`
            }}
        >
            <div className="timer-display" onClick={handleEdit}>
                {isEditing ? (
                    <input
                        className="timer-input"
                        value={editedTime}
                        onChange={(e) => setEditedTime(e.target.value)}
                        onBlur={handleSaveEdit}
                    />
                ) : (
                    <div 
                        className="timer-display-text"
                        style={{
                            fontSize: '80px'
                        }}
                    >
                        {hrs} : {mins} : {secs}
                    </div>
                )}
            </div> 
            <div className="button-container">
                <Button 
                    onClick={handleStart} 
                    disabled={isActive} 
                    variant="light" 
                    color={
                        computedColorScheme === 'light' ? '#543F3F' : '#EAD8C2'
                    } 
                    radius="lg"
                >
                    <FaPlay /> Start
                </Button>
                <Button 
                    onClick={handlePause} 
                    disabled={!isActive} 
                    variant="light" 
                    color={
                        computedColorScheme === 'light' ? '#543F3F' : '#EAD8C2'
                    } 
                    radius="lg"
                >
                    <FaPause /> Pause
                </Button>
                <Button 
                    onClick={handleReset} 
                    variant="light" 
                    color={
                        computedColorScheme === 'light' ? '#543F3F' : '#EAD8C2'
                    } 
                    radius="lg"
                >
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
                <Button 
                    onClick={addTask} 
                    variant="light" 
                    color={
                        computedColorScheme === 'light' ? '#543F3F' : '#EAD8C2'
                    }
                >
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
                            <span 
                                style={{ 
                                    textDecoration: task.completed ? 'line-through' : 'none', 
                                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F' 
                                }}
                            >
                                {task.description}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}