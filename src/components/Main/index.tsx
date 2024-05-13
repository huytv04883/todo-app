import React, { useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ErrorMsg, ITodoItemProps, TaskItem } from "../../types/app.type";
import './styles.css';
import DatePicker from "react-datepicker";
import { validateForm } from "../../utils/validate";
import { calculateTimeRemaining } from "../../utils/remainingTime";

const TodoMain: React.FC<ITodoItemProps> = ({ data, tasks, setTasks }) => {

    const [editMode, setEditMode] = useState<boolean>(false);
    const defaultTask: TaskItem = {
        id: "",
        title: "",
        description: "",
        completed: false,
        dueDate: null,
    };

    const [editedTask, setEditedTask] = useState<TaskItem>(defaultTask);
    const [errors, setErrors] = useState<ErrorMsg | null>({
        title: "",
        description: "",
        dueDate: ""
    });

    const handleUpdateTask = (taskId: string) => {
        const updatedTasks = tasks?.map((task) =>
            task.id === editedTask.id ? editedTask : task
        );        
        const isValid = validateForm(editedTask, setErrors, editedTask.dueDate ?? tasks.find((item) => item.id === taskId)?.dueDate);
        if (isValid) {
            setTasks(updatedTasks);
            setEditMode(false);
            setEditedTask(defaultTask);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedTask(defaultTask);
        setErrors(null);
    };

    const handleDeleteTask = (taskId: string) => {
        const updatedTasks = tasks?.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    const handleEdit = (task: TaskItem) => {
        setEditMode(true);
        setEditedTask(task);
    };

    const toggleCompletion = (taskId: string) => {
        const updatedTasks = tasks?.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    function handleOnDragEnd(result: any) {
        if (!result.destination) return;

        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTasks(items);
    }

    useLayoutEffect(() => {
        const interval = setInterval(() => {
            // Update remaining time every second
            const updatedTasks = tasks.map((task) => ({
                ...task,
                remainingTime: calculateTimeRemaining(task.dueDate ?? new Date())
            }));
            setTasks(updatedTasks);
        }, 1000);
        return () => clearInterval(interval);
    }, [tasks]);

    return (
        <section className="main">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="list-task characters" {...provided.droppableProps} ref={provided.innerRef}>
                            {data?.map((task, index) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="task-item text">
                                            {editMode && editedTask.id === task.id ? (
                                                <div className="update">
                                                    <div className="fields">
                                                        <div className="field-item">
                                                            <input
                                                                className="field active"
                                                                type="text"
                                                                value={editedTask.title}
                                                                onChange={(e) =>
                                                                    setEditedTask({
                                                                        ...editedTask,
                                                                        title: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                            {errors?.title &&
                                                                <span className="error-message">{errors.title}</span>
                                                            }
                                                        </div>
                                                        <div className="field-item">
                                                            <input
                                                                className="field active"
                                                                type="text"
                                                                value={editedTask.description}
                                                                onChange={(e) =>
                                                                    setEditedTask({
                                                                        ...editedTask,
                                                                        description: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                            {errors?.description &&
                                                                <span className="error-message">{errors.title}</span>
                                                            }
                                                        </div>
                                                        <div className="field-item">
                                                            <DatePicker
                                                                className="field active"
                                                                selected={editedTask.dueDate} 
                                                                onChange={(date) => setEditedTask({
                                                                    ...editedTask,
                                                                    dueDate: date
                                                                })} 
                                                                placeholderText="Enter Duedate" 
                                                            />
                                                            {errors?.dueDate && 
                                                                <span className="error-message">{errors.dueDate}</span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="action">
                                                        <button className="btn" onClick={() => handleUpdateTask(task.id)}>
                                                            Update
                                                        </button>
                                                        <button className="btn cancel" onClick={handleCancelEdit}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="content">
                                                        <input
                                                            type="checkbox"
                                                            checked={task.completed}
                                                            onChange={() => toggleCompletion(task.id)}
                                                        />
                                                        <span>{task.title}</span>
                                                        <span>{task?.dueDate ? `Due date: ${new Date(task.dueDate).toLocaleDateString()}` : "No due date"}</span>
                                                        {task.remainingTime && (
                                                            <span className={`${task.remainingTime.days >= 3 ? 'green' : 'red'} time-duration`}>
                                                                duration: {task.remainingTime.days} days, {task.remainingTime.hours} hours
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="action">
                                                        <button
                                                            className="btn cancel"
                                                            onClick={() => handleDeleteTask(task.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button className="btn" onClick={() => handleEdit(task)}>
                                                            Edit
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
        </section>
    )
}

export default TodoMain;
