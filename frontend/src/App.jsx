import React, { useState } from 'react';
import './App.css';
import {
  TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox,
  Dialog, DialogActions, DialogContent, DialogTitle, MenuItem
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ title: '', description: '', dueDate: '', priority: 'Medium' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle opening and closing the modal
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  // Handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInput({ ...taskInput, [name]: value });
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (taskInput.title.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), ...taskInput, completed: false }]);
      setTaskInput({ title: '', description: '', dueDate: '', priority: 'Medium' });
      handleCloseDialog();
    }
  };

  // Handle marking a task as completed
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Handle deleting a task
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>TODOLIST</h1>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Task
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={taskInput.title}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={taskInput.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={taskInput.dueDate}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Priority"
            name="priority"
            select
            value={taskInput.priority}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddTask} color="primary">
            Add Task
          </Button>
        </DialogActions>
      </Dialog>

      <List>
        {tasks.map(task => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              color="primary"
            />
            <ListItemText
              primary={task.title}
              secondary={`Due: ${task.dueDate} | Priority: ${task.priority}`}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            />
            <IconButton edge="end" color="error" onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
