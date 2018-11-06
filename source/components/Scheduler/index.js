// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import Checkbox from '../../theme/assets/Checkbox';
import { api } from '../../REST';// ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import { sortTasksByGroup } from '../../instruments/helpers';

import FlipMove from 'react-flip-move';

//Components
import Spinner from '../Spinner';
import Task from '../Task';

export default class Scheduler extends Component {

    state = {
        newTaskMessage:  '',
        tasksFilter:     '',
        isTasksFetching: false,
        tasks:           [],
    };

    componentDidMount () {
        this._fetchTasksAsync();
    };

    _createTaskAsync = async (e) => {
        e.preventDefault();
        
        const { newTaskMessage } = this.state;

        if (newTaskMessage) {
            try {
                this._setTasksFetchingState(true);

                const task = await api.createTask(newTaskMessage);

                this.setState((prevState) => ({                    
                    tasks:          sortTasksByGroup([task, ...prevState.tasks]),
                    newTaskMessage: '',
                }));
            } 
            catch ({ message }) {
                console.log(message);
            } 
            finally {
                this._setTasksFetchingState(false);
            };
        };

        return null;
    };

    _updateTasksFilter = (e) => {
        const { value } = e.target;

        this.setState({
            tasksFilter: value.toLocaleLowerCase(),
        });
    };

    _updateNewTaskMessage = (e) => {
        const { value: newTaskMessage } = e.target;

        this.setState({ newTaskMessage });
    };

    _updateTaskAsync = async (taskProps) => {
        const { tasks } = this.state;

        try {
            this._setTasksFetchingState(true);

            await api.updateTask(taskProps);

            const sortTask = sortTasksByGroup(tasks.map(
                (task) => task.id === taskProps.id ? taskProps : task
            ));

            this.setState({
                tasks: sortTask,
            });

        } 
        catch ({ message }) {
            console.log(message);
        } 
        finally {
            this._setTasksFetchingState(false);
        };
    };

    _removeTaskAsync = async (id) => {
        try {
            this._setTasksFetchingState(true);
            await api.removeTask(id);

            await this.setState(({ tasks }) => ({
                tasks: tasks.filter(
                    (task) => task.id !== id
                ),
            }));

        } 
        catch ({ message }) {
            console.log(message);
        } 
        finally {
            this._setTasksFetchingState(false);
        };
    };

    _completeAllTasksAsync = async () => {
        const notCompletedTasks = this.state.tasks.filter((task) => {
            return (task.completed === false);
        });

        if (notCompletedTasks.length !== 0) {
            this._setTasksFetchingState(true);
            try {
                await api.completeAllTasks(notCompletedTasks.map((task) => {
                    task.completed = true;

                    return task;
                }
                ));

                this.setState(({ tasks }) => ({
                    tasks: tasks.map((task) => {
                        task.completed = true;

                        return task;
                    }),
                }
                ));

            } 
            catch ({ message }) {
                console.log(message);
            } 
            finally {
                this._setTasksFetchingState(false);
            };
        } 
        else {
            return null;
        };
    };

    _getAllCompleted = () => {
        const { tasks } = this.state;

        for (const task of tasks) {
            if (!task.completed) {
                return false;
            };
        };

        return true;
    };

    _setTasksFetchingState = (isTasksFetching) => {
        this.setState({ isTasksFetching });
    };

    _fetchTasksAsync = async () => {
        try {
            this._setTasksFetchingState(true);
            const tasks = await api.fetchTasks();

            this.setState({ tasks: sortTasksByGroup(tasks) });
        }
        catch ({ message }) {
            console.log(message);
        } 
        finally {
            this._setTasksFetchingState(false);
        };
    };


    render () {
        const {
            newTaskMessage,
            tasksFilter,            
            isTasksFetching,
            tasks,
        } = this.state;        

        const filtredTasks = tasks.filter(({ message }) => {
            return message.toLocaleLowerCase().includes(tasksFilter);
        });

        const tasksList = tasksFilter ? filtredTasks : tasks;

        return (
            <section className = { Styles.scheduler }>
                <Spinner isSpinning = { isTasksFetching } />

                <main>                    
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            onChange = { this._updateTasksFilter }
                            placeholder = 'Поиск'
                            type = 'search'
                            value = { tasksFilter }                            
                        />
                    </header>
            
                    <section>
                        <form 
                            onSubmit = { this._createTaskAsync }
                        >
                            <input
                                className = { Styles.createTask }                                
                                onChange = { this._updateNewTaskMessage }                                
                                placeholder = 'Описaние моей новой задачи'
                                type = 'text'
                                value = { newTaskMessage }                            
                                maxLength = { 50 }
                            />
                            <button>
                                Добавить задачу
                            </button>
                        </form>
             
                        <div className = { Styles.overlay }>
                            <ul>
                                <FlipMove duration = { 400 }>
                                    { tasksList.map((props) => (
                                        <Task
                                            _removeTaskAsync = { this._removeTaskAsync }
                                            _updateTaskAsync = { this._updateTaskAsync }
                                            id = { props.id }
                                            key = { props.id }
                                            message = { props.message }
                                            completed = { props.completed }
                                            favorite = { props.favorite }                                                                                        
                                        />
                                    )) }
                                </FlipMove>
                            </ul>
                        </div>
                    </section>
             
                    <footer>
                        <Checkbox
                            checked = { this._getAllCompleted() }
                            color1 = '#363636'
                            color2 = '#fff'
                            height = { 25 }
                            width = { 25 }
                            onClick = { this._completeAllTasksAsync }
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    };
};
