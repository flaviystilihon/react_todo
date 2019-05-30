import React from 'react';
import axios from 'axios';

import Header from './components/layout/Header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css';

class App extends React.Component {
    state = {
        todos: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        // .then(res => console.log(res.data))
        .then(res => this.setState({todos: res.data}))
    }

    // Toggle Complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }

                return todo;
            })
        })
    }

    // Add Todo
    addTodo = (title) => {
        if(title.length > 0) {
            // let newTodo = {id: uuid.v4(), title: title, completed: false};
    
            // this.setState({todos: [...this.state.todos, newTodo]});

            axios.post("https://jsonplaceholder.typicode.com/todos", {
                title,
                completed: false
            }).then(res => {
                this.setState({todos: [...this.state.todos, res.data]});
            });
        }
    }

    delTodo = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(res => {
            this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
        })
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header></Header>

                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo}></AddTodo>

                                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
                            </React.Fragment>
                        )}>
                        </Route>

                        <Route path="/about" component={About}></Route>
                    </div>
                </div>
            </Router>
            
        );
    }
}

export default App;
