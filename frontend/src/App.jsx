import React, { useState } from 'react';
import './App.css';
import {
  TextField, Button, List, ListItem, ListItemText, IconButton, Checkbox,
  Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import dayjs from 'dayjs';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({ title: '', description: '', dueDate: '', priority: 'Medium' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Handle opening and closing the modal
  const handleOpenDialog = (task = null) => {
    if (task) {
      setTaskInput({ title: task.title, description: task.description, dueDate: task.dueDate, priority: task.priority });
      setEditingTaskId(task.id);
    } else {
      setTaskInput({ title: '', description: '', dueDate: '', priority: 'Medium' });
      setEditingTaskId(null);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTaskInput({ title: '', description: '', dueDate: '', priority: 'Medium' });
    setEditingTaskId(null);
  };

  // Handle changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskInput({ ...taskInput, [name]: value });
  };

  // Handle adding or updating a task
  const handleSaveTask = () => {
    if (taskInput.title.trim() !== '') {
      if (editingTaskId) {
        setTasks(tasks.map(task =>
          task.id === editingTaskId ? { ...task, ...taskInput } : task
        ));
      } else {
        setTasks([...tasks, { id: Date.now(), ...taskInput, completed: false }]);
      }
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

  // Categorize tasks
  const currentDate = dayjs().format('YYYY-MM-DD');
  const upcomingTasks = tasks.filter(task => !task.completed && dayjs(task.dueDate).isAfter(currentDate));
  const overdueTasks = tasks.filter(task => !task.completed && dayjs(task.dueDate).isBefore(currentDate));
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="App">
      <h1>TODOLIST</h1>
      <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
        Add Task
      </Button>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editingTaskId ? 'Edit Task' : 'Add New Task'}</DialogTitle>
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
          <Button onClick={handleSaveTask} color="primary">
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Upcoming Tasks Section */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>Upcoming Tasks</Typography>
      <List>
        {upcomingTasks.map(task => (
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
            <IconButton edge="end" color="primary" onClick={() => handleOpenDialog(task)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" color="error" onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Overdue Tasks Section */}
      <Typography variant="h6" style={{ marginTop: '20px', color: 'red' }}>Overdue Tasks</Typography>
      <List>
        {overdueTasks.map(task => (
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
            <IconButton edge="end" color="primary" onClick={() => handleOpenDialog(task)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" color="error" onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Completed Tasks Section */}
      <Typography variant="h6" style={{ marginTop: '20px', color: 'green' }}>Completed Tasks</Typography>
      <List>
        {completedTasks.map(task => (
          <ListItem key={task.id} divider>
            <Checkbox
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              color="primary"
            />
            <ListItemText
              primary={task.title}
              secondary={`Due: ${task.dueDate} | Priority: ${task.priority}`}
              style={{ textDecoration: 'line-through' }}
            />
            <IconButton edge="end" color="primary" onClick={() => handleOpenDialog(task)}>
              <EditIcon />
            </IconButton>
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
