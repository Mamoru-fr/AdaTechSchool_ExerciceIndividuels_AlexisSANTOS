// Setup dayjs with duration plugin
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {useState, useEffect, useRef} from "react";
dayjs.extend(duration);

// Import necessary hooks and components

// Context
import {useTasks} from "../context/TasksContext";

// Components
import {TaskButton} from "./TaskButton";

export const DoingTask = () => {
    // Hooks and state
    // Pickup the current task and setResult function from context
    const {task, setTask, setResult} = useTasks();

    // Timer state
    const [elapsedSeconds, setElapsedSeconds] = useState(60);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Function to toggle task completion status
    const toggleCompleted = () => {
        const id = task?.id;
        if (id === undefined) {return }
        setResult(prev => prev.map(t => t.id === id ? {...t, isCompleted: !t.isCompleted} : t));
    }

    const toggleFailed = () => {
        const id = task?.id;
        if (id === undefined) {return }
        setTask(undefined);
    }

    // Timer logic
    const time = dayjs.duration(elapsedSeconds, 'seconds').format('HH:mm:ss');

    const resumeTimer = () => {
        if (isRunning) return;
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setElapsedSeconds(prev => prev - 1);
        }, 1000);
    }

    const stopTimer = () => {
        setIsRunning(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    const addTimer = (minutes: number) => {
        setElapsedSeconds(prev => prev + (minutes * 60));
    }

    const restartTimer = () => {
        setElapsedSeconds(60);
    }

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return (
        <div style={styles.container.BigContainer}>
            <div>
                <h2>Currently Doing</h2>
                <p style={styles.taskText}>{task ? task.Text : 'Not Currently doing anything'}</p>
            </div>
            {task ?
                <div>
                    <div style={styles.container.TimeContainer}>
                        <div>
                            <p style={styles.container.TimeContainer.TimeText}>Timer :</p>
                            <div style={{display: 'flex', flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center'}}>
                                <p style={styles.container.TimeContainer.Time}>{time}</p>
                                {!isRunning ?
                                    <div>
                                        <TaskButton
                                            buttonName="Resume"
                                            buttonText="▶️"
                                            buttonAction={resumeTimer}
                                            style={{color: 'black', width: 40, height: 40, backgroundColor: '#3ae5e8ff'}}
                                        />
                                        {time !== '00:00:00' ?
                                            <TaskButton
                                                buttonName="Restart"
                                                buttonText="🔄"
                                                buttonAction={restartTimer}
                                                style={{color: 'black', width: 40, height: 40, backgroundColor: '#3ae5e8ff'}}
                                            /> : null
                                        }
                                    </div>
                                    :
                                    <TaskButton
                                        buttonName="Pause"
                                        buttonText="⏸️"
                                        buttonAction={stopTimer}
                                        style={{color: 'black', width: 40, height: 40, backgroundColor: '#3ae5e8ff'}}
                                    />
                                }

                            </div>
                        </div>
                    </div>
                    <div style={styles.container.ButtonContainer}>
                        {!isRunning ?
                            <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center'}}>
                                <TaskButton
                                    buttonName="Clear Task"
                                    buttonText="I've done 🚀"
                                    buttonAction={
                                        () => {
                                            toggleCompleted();
                                        }
                                    }
                                    style={{color: 'black', backgroundColor: '#3ae5e8ff', padding: 10}}
                                />
                                <TaskButton
                                    buttonName="Give up Task"
                                    buttonText="Give up 🚫"
                                    buttonAction={
                                        () => {
                                            toggleFailed();
                                        }
                                    }
                                    style={{color: 'black', backgroundColor: '#3ae5e8ff', padding: 10}}
                                />
                            </div>
                            : null
                        }
                        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center'}}>
                            <input type="integer" min={1} max={60} defaultValue={5} id="addMinutesInput" style={{width: 60, textAlign: 'center', fontSize: 16, padding: 6, borderRadius: 6, border: '1px solid #ccc'}} />
                            <TaskButton
                                buttonName="Add 5 Minutes"
                                buttonText="add minutes ⏱️"
                                buttonAction={
                                    () => {
                                        const input = document.getElementById('addMinutesInput') as HTMLInputElement;
                                        const minutes = parseInt(input.value);
                                        if (!isNaN(minutes) && minutes > 0) {
                                            addTimer(minutes);
                                        }
                                    }
                                }
                                style={{color: 'black', backgroundColor: '#3ae5e8ff', padding: 10}}
                            />
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}

const styles = {
    container: {
        BigContainer: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            maxWidth: '100vh',
        },
        TimeContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: 2,
            minHeight: '30vh',
            justifyContent: 'center',
            gap: 8,
            TimeText: {
                fontSize: 25,
                marginBottom: 5,
            },
            Time: {
                fontSize: 35,
                marginTop: 5,
                fontWeight: 'bold',
                textAlign: 'center',
                height: 25,
            },
        },
        ButtonContainer: {
            marginTop: 16,
            marginBottom: 16,
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            gap: 8,
        }
    } as const,
    taskText: {
        fontSize: 20,
    }
}