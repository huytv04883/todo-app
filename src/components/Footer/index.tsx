import React, { SetStateAction } from "react";
import { ITodoFooterProps } from "../../types/app.type";
import './styles.css';

const TodoFooter: React.FC<ITodoFooterProps> = ({ filter, countNumber, setFilter }) => {
    return (
        <footer className="footer">
            <div>
                <span className="text">Results: {countNumber} item</span>
                <select
                    value={filter}
                    onChange={(e) =>
                        setFilter(e.target.value as SetStateAction<"all" | "completed" | "pending">)
                    }
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
            </div>
        </footer>
    )
}

export default TodoFooter;
