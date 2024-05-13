
import { ERROR_DESCRIPTION, ERROR_DUEDATE, ERROR_TITLE } from "../constants";
import { ErrorMsg, TaskItem } from "../types/app.type";

export const validateForm = (newTask: TaskItem, setErrors: (item: ErrorMsg) => void, dueDate: Date | null | undefined) => {
    let isValid = true;
    const newErrors = { title: "", description: "", dueDate: "" };

    if (newTask.title.trim() === "") {
        newErrors.title = ERROR_TITLE;
        isValid = false;
    }

    if (newTask.description.trim() === "") {
        newErrors.description = ERROR_DESCRIPTION;
        isValid = false;
    }

    if (dueDate && dueDate instanceof Date && dueDate.getTime() <= new Date().getTime()) {
        newErrors.dueDate = ERROR_DUEDATE;
        isValid = false;
    }    

    setErrors(newErrors);
    return isValid;
};
