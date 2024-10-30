import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const Home = ({ tagsList }) => {
  const [taskInput, setTaskInput] = useState("");
  const [selectedTag, setSelectedTag] = useState(tagsList[0].optionId);
  const [tasks, setTasks] = useState([]);
  const [activeTag, setActiveTag] = useState("");

  const onTaskInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const onTagChange = (event) => {
    setSelectedTag(event.target.value);
  };

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: uuidv4(),
        text: taskInput,
        tag: selectedTag,
      };
      setTasks([...tasks, newTask]);
      setTaskInput("");
      setSelectedTag(tagsList[0].optionId);
    }
  };

  const filterTasksByTag = (tagId) => {
    setActiveTag(tagId === activeTag ? "" : tagId);
  };

  const filteredTasks = activeTag
    ? tasks.filter((task) => task.tag === activeTag)
    : tasks;

  return (
    <div className="home-container">
      <h1 className="title">Create a task</h1>

      <div className="task-input-section">
        <input
          type="text"
          value={taskInput}
          onChange={onTaskInputChange}
          placeholder="Enter Task"
          className="task-input"
        />

        <select
          value={selectedTag}
          onChange={onTagChange}
          className="tag-select"
        >
          {tagsList.map((tag) => (
            <option key={tag.optionId} value={tag.optionId}>
              {tag.displayText}
            </option>
          ))}
        </select>

        <button type="button" onClick={addTask} className="add-task-button">
          Add Task
        </button>
      </div>

      <ul className="tags-section tasks-list">
        {tagsList.map((tag) => (
          <li>
            <button
              type="button"
              key={tag.optionId}
              className={`tag-button ${
                activeTag === tag.optionId ? "active" : ""
              }`}
              onClick={() => filterTasksByTag(tag.optionId)}
            >
              {tag.displayText}
            </button>
          </li>
        ))}
      </ul>

      <ul className="tasks-list">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <p className="task-text">{task.text}</p>
              <p className="task-tag">
                {tagsList.find((tag) => tag.optionId === task.tag).displayText}
              </p>
            </li>
          ))
        ) : (
          <p className="no-tasks">No Tasks Added Yet!</p>
        )}
      </ul>
    </div>
  );
};

export default Home;
