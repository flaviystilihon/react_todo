import React from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Todos extends React.Component {

    render() {
        return this.props.todos.map((item) => (
            <TodoItem key={item.id} todo={item} markComplete={this.props.markComplete} delTodo={this.props.delTodo}></TodoItem>
        ))
    };
    
}

export default Todos;

// PropTypes
Todos.propTypes = {
    todos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired,
}