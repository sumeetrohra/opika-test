import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  margin-right: 5px;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const TaskItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  margin: 10px 0;
  padding: 10px;
`;

const DeleteButton = styled.div`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 16px;
`;

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}>
        <Input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='Add a new task'
        />
        <AddButton type='submit'>Add</AddButton>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <TaskItem key={task.id} data-testid={index}>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              style={{ marginRight: 10 }}
              data-testid={`checkbox-${index}`}
            />
            <span
              data-testid={
                task.completed ? `${task.text}-scratched` : task.text
              }
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}>
              {task.text}
            </span>
            <DeleteButton
              data-testid={`delete-${index}`}
              onClick={() => deleteTask(task.id)}>
              Delete
            </DeleteButton>
          </TaskItem>
        ))}
      </ul>
    </Container>
  );
};

export default TaskList;
