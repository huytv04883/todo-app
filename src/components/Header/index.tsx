import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { v4 as uuidv4 } from "uuid";
import { ErrorMsg, ITodoHeaderProps, TaskItem } from "../../types/app.type";
import { validateForm } from "../../utils/validate";
import './styles.css';

const TodoHeader: React.FC<ITodoHeaderProps> = ({ tasks, setTasks }) => {
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const defaultTask: TaskItem = {
        id: "",
        title: "",
        description: "",
        completed: false,
        dueDate: null,
    };

    const [newTask, setNewTask] = useState<TaskItem>(defaultTask);

    const [errors, setErrors] = useState<ErrorMsg | null>({
        title: "",
        description: "",
        dueDate: ""
    });

    const titleInputRef = useRef<HTMLInputElement>(null);

    const addTask = () => {
        const isValid = validateForm(newTask, setErrors, dueDate);
        if (isValid && newTask.title.trim() !== "") {
            const newTaskWithId = { ...newTask, id: uuidv4(), dueDate: dueDate };
            setTasks([...tasks, newTaskWithId]);
            setNewTask(defaultTask);
            setDueDate(null);
            setErrors(null);
        }
    };

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.focus();
        }
    }, []);

    return (
        <header className="header">
            <div className="header-content">
                <div className="field-item">
                    <input
                        className="field"
                        type="text"
                        placeholder="Enter task title"
                        value={newTask.title}
                        onChange={(e) =>
                            setNewTask({ ...newTask, title: e.target.value })
                        }
                        ref={titleInputRef}
                    />
                    {errors?.title &&
                        <span className="error-message">{errors.title}</span>
                    }
                </div>
                <div className="field-item">
                    <input
                        className="field"
                        type="text"
                        placeholder="Enter task description"
                        value={newTask.description}
                        onChange={(e) =>
                            setNewTask({ ...newTask, description: e.target.value })
                        }
                    />
                    {errors?.description &&
                        <span className="error-message">{errors?.description}</span>
                    }
                </div>
                <div className="field-item">
                    <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} placeholderText="Enter Duedate" />
                    {errors?.dueDate && 
                        <span className="error-message">{errors.dueDate}</span>
                    }
                </div>
                <button className="btn-addnew" onClick={addTask}>
                    Add
                </button>
            </div>
        </header>
    )
}

export default TodoHeader;
