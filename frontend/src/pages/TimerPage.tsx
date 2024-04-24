import React, { useState, useEffect } from 'react';
import { Button, TextInput, Notification } from '@mantine/core';
import { FaPlay, FaPause, FaSync } from 'react-icons/fa';
import '../styles/TimerPage.css';

export default function TimerPage() {
    const [initialTime, setInitialTime] = useState<number>(0);
    const [seconds, setSeconds] = useState<number>(initialTime);
    const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [showNotification, setShowNotification] = useState<boolean>(false);

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
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const parsedValue = parseInt(value, 10);
        setInitialTime(isNaN(parsedValue) ? 0 : parsedValue);
        setSeconds(isNaN(parsedValue) ? 0 : parsedValue);
    };

    return (
        <div className="timer-container">
            <h1 className="timer-text">
                Timer: <span className="timer-number">{formatTime(seconds)}</span>
            </h1>
            <div className="input-container">
                <TextInput
                    label="Set Timer (seconds)"
                    type="number"
                    value={initialTime.toString()}
                    onChange={handleChange}
                />
            </div>
            <div className="button-container">
            <Button
                onClick={handleStart}
                disabled={isActive}
                rightSection
                className="button-class"
            >
                <FaPlay className="button-icon" />
                <span className="button-text">Start</span>
            </Button>
            <Button
                onClick={handlePause}
                disabled={!isActive}
                rightSection
                className="button-class"
            >
                <FaPause className="button-icon" />
                <span className="button-text">Pause</span>
            </Button>
            <Button
                onClick={handleReset}
                rightSection
                className="button-class"
            >
                <FaSync className="button-icon" />
                <span className="button-text">Restart</span>
            </Button>
            </div>
            {showNotification && (
                <Notification
                    title="🤸BREAK TIME🤸"
                    onClose={() => setShowNotification(false)}
                />
            )}
        </div>
    );
}