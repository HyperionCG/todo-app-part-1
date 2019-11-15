import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

class App extends Component {
  state = {
    todos: todosList,
    value: ""
  };
  handleDelete = (todoIdToDelete) => {
    const newToDoList = this.state.todos.filter(
      todo => todo.id !== todoIdToDelete
    );
    this.setState({ todos: newToDoList });
  }

  handleCreate = (event) => {
    if (event.key === "Enter") {
      const newTodoList = this.state.todos.slice();
      newTodoList.push({
      userId: 1,
      id: Math.floor(Math.random() * 100),
      title: this.state.value,
      completed: false
    });
      this.setState({ todos: newTodoList, value: "" });
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleToggle = (todoIdToToggle) => {
    const newTodoList = this.state.todos.map(todo => {
      if (todo.id === todoIdToToggle) {
        const newTodo = { ...todo };
        newTodo.completed = !newTodo.completed;
        return newTodo;
      }
      //
      return todo;
    });
    this.setState({ todos: newTodoList })
  };

  handleClearCompleted = () => {
    const newTodoList = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList })
  };

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.handleCreate}
            onChange={this.handleChange}
            value={this.state.value}
          />
        </header>
        <TodoList handleToggle={this.handleToggle} handleDelete={this.handleDelete} todos={this.state.todos} />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button onClick={this.handleClearCompleted} className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
            onChange={this.props.handleToggle}
          />
          <label>{this.props.title}</label>
          <button className="destroy"
           onClick={event => this.props.handleDelete(event, this.props.todoId)} />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
            key={todo.id}
            handleToggle={event => this.props.handleToggle(todo.id)} 
            handleDelete={event => this.props.handleDelete(todo.id)} 
            title={todo.title} 
            completed={todo.completed}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
