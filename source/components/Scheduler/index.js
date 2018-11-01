// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Task from 'components/Task';
import Catcher from 'components/Catcher';
import PropTypes from 'prop-types';
import { withProfile } from 'components/HOC/withProfile';
import { withSvg } from 'instruments/withSvg';

//@withSvg
@withProfile
export default class Scheduler extends Component {  
  state = {
    task: '',
    tasks: [],
    isSpinning: false,        
  };

  componentDidMount () {
    //const { currentUserFirstName,currentUserLastName } = this.props;
    console.log('componentDidMount this.props',this.props)
    //this._fetchTasks();        

    /*socket.emit('join', GROUP_ID);

    socket.on('create', (postJSON) => {
        const { data: createdTask, meta } = JSON.parse(postJSON);

        if (
            `${currentUserFirstName} ${currentUserLastName}` !==
            `${meta.authorFirstName} ${meta.authorLastName}`
        ) {
            this.setState(({ tasks }) => ({
                posts: [createdTask, ...tasks],
            }));
        }
    });*/

    /*socket.on('remove', (postJSON) => {
        const { data: removedPost, meta } = JSON.parse(postJSON);

        if (
            `${currentUserFirstName} ${currentUserLastName}` !==
            `${meta.authorFirstName} ${meta.authorLastName}`
        ) {
            this.setState(({ posts }) => ({
                posts: posts.filter((post) => post.id !== removedPost.id),
            }));
        }
    });

    socket.on('like', (postJSON) => {
        const { data: likedPost, meta } = JSON.parse(postJSON);

        if (
            `${currentUserFirstName} ${currentUserLastName}` !==
            `${meta.authorFirstName} ${meta.authorLastName}`
        ) {
            this.setState(({ posts }) => ({
                posts: posts.map(post => post.id === likedPost.id ? likedPost : post),
            }));
        }
    });*/
}

  _updateTask = (event) => {
    console.log('_updateTask event',event.target.value)
    this.setState({
      task: event.target.value,
    });
    console.log('_updateTask this.props',this.props)
  }

  _handleFormSubmit = (event) => {
    console.log('_handleFormSubmit event',event.target.value)    
    event.preventDefault();
    this._submitTask();
  }

  _submitTask = () => {    
    event.preventDefault();
    const { task } = this.state;
    console.log('task',task)

    if (!task) {
        return null;
    }

    console.log('this.props',this.props)
    this._createTask(task);

    this.setState({
      task: '',
    });
  }   

  _submitOnEnter = (event) => {
    const enterKey = event.key === 'Enter';

    if (enterKey) {
      event.preventDefault();
      this._submitTask();
    }
  }

  _setTasksFetchingState = (state) => {
    this.setState({
        isSpinning: state,
    });
  };

  _fetchTasks = async () => {
    this._setTasksFetchingState(true);

    /*const response = await fetch(api, {
        method: 'GET',            
    });       

    const {data: tasks} = await response.json();        */

    this.setState({
        tasks,
        isSpinning: false,
    });
};

_createTask = async (task) => {
  console.log('_createTask 111task',task)
    this._setTasksFetchingState(true);

    /*console.log('_createTask api',api)
    console.log('_createTask TOKEN',TOKEN)

    const response = await fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN
        },
        body: JSON.stringify({ task }),
    });
    
    const {data: task} = await response.json();*/

    //console.log('_createTask 111tasks',tasks)
    //console.log('_createTask 111task',task)
    this.setState(({ tasks }) => ({
        tasks:      [task, ...tasks],
        isSpinning: false,
    }));
}

_removeTask = async (id) => {
  this._setTasksFetchingState(true);        
         
  this.setState(({ tasks }) => ({            
      tasks:      tasks.filter((task) => task.id !== id),
      isSpinning: false,
  })
  )    
};

    render () {
      console.log('render this.state',this.state)
      const { tasks, isSpinning } = this.state;

      const tasksJSX = tasks.map((task) => {
        return <Task key = { task.id } { ...task } />;
      });      

     /*  const tasksJSX = tasks.map((task) => {            
        return (
            {/*<CSSTransition
                classNames = { {
                    enter:       Styles.taskInStart,
                    enterActive: Styles.taskInEnd,
                    exit:        Styles.taskOutStart,
                    exitActive:  Styles.taskOutEnd,
                } } 
                key = { task.id }
                timeout = { {
                    enter: 500, 
                    exit:  400,
            } }>
                <Catcher>
                    <Task                         
                        { ...task }                         
                        //_likePost = { this._likePost }
                        _removeTask = { this._removeTask } 
                    />
                </Catcher>
            </CSSTransition>*//*}

            (<Catcher>
            <Task key = {task.id}
                {...task}
                _createTask = { this._createTask }
                _updateTask = { this._updateTask }    />                        
                {/* ...task                      
                _createTask = { this._createTask }
                _updateTask = { this._updateTask }    
                _likePost = { this._likePost }
            _removeTask = { this._removeTask } *//*}
            
            </Catcher>)            
        );
    }); */

        return (
            <section className = { Styles.scheduler }>
                <main>
                <header>
                    <h1>
                        Планировщик задач
                    </h1>
                    <input
                        //onChange={[MockFunction]}
                        placeholder="Поиск"
                        type="search"
                        value=""
                    />
                </header>

                <section>
                    <form
                        onSubmit={this._handleFormSubmit}
                    >
                        <input
                            //className="createTask"
                            maxLength={50}
                            onChange={this._updateTask}
                            placeholder="Описaние моей новой задачи"
                            type="text"
                            value={this.state.task}
                        />
                        <button>
                            Добавить задачу
                        </button>
                    </form>
                    {tasksJSX}
                    



{/* <div
          className="overlay"
        >
          <ul>
            <FlipMovePropConverter
              delay={0}
              disableAllAnimations={false}
              duration={400}
              easing="ease-in-out"
              enterAnimation="elevator"
              getPosition={[Function]}
              leaveAnimation="elevator"
              maintainContainerHeight={false}
              staggerDelayBy={0}
              staggerDurationBy={0}
              typeName="div"
              verticalAlignment="top"
            >
              <FlipMove
                delay={0}
                delegated={
                  Object {
                    "style": Object {
                      "position": "relative",
                    },
                  }
                }
                disableAllAnimations={false}
                duration={400}
                easing="ease-in-out"
                enterAnimation={
                  Object {
                    "from": Object {
                      "opacity": "0",
                      "transform": "scale(0)",
                    },
                    "to": Object {
                      "opacity": "",
                      "transform": "",
                    },
                  }
                }
                getPosition={[Function]}
                leaveAnimation={
                  Object {
                    "from": Object {
                      "opacity": "1",
                      "transform": "scale(1)",
                    },
                    "to": Object {
                      "opacity": "0",
                      "transform": "scale(0)",
                    },
                  }
                }
                maintainContainerHeight={false}
                staggerDelayBy={0}
                staggerDurationBy={0}
                typeName="div"
                verticalAlignment="top"
              >
                <div
                  style={
                    Object {
                      "position": "relative",
                    }
                  }
                >
                  <Task
                    _removeTaskAsync={[MockFunction]}
                    _updateTaskAsync={[MockFunction]}
                    completed={false}
                    favorite={false}
                    id="123"
                    key=".$123"
                    message="Выполнить важную задачу (создано в конструкторе)."
                  >
                    <li
                      className="task"
                    >
                      <div
                        className="content"
                      >
                        <withSvg(Checkbox)
                          checked={false}
                          className="toggleTaskCompletedState"
                          color1="#3B8EF3"
                          color2="#FFF"
                          height={25}
                          inlineBlock={true}
                          onClick={[Function]}
                          width={25}
                        >
                          <div
                            className="toggleTaskCompletedState"
                            onClick={[Function]}
                            onMouseEnter={[Function]}
                            onMouseLeave={[Function]}
                            style={
                              Object {
                                "display": "inline-block",
                                "height": 25,
                                "width": 25,
                              }
                            }
                          >
                            <svg
                              style={
                                Object {
                                  "display": "block",
                                  "height": 25,
                                  "width": 25,
                                }
                              }
                              version="1.1"
                              viewBox="0 0 27 27"
                            >
                              <Checkbox
                                checked={false}
                                className="toggleTaskCompletedState"
                                color1="#3B8EF3"
                                color2="#FFF"
                                hover={false}
                                inlineBlock={true}
                                onClick={[Function]}
                              >
                                <g>
                                  <rect
                                    fill="#FFF"
                                    height="25"
                                    rx="5"
                                    ry="5"
                                    stroke="#3B8EF3"
                                    style={
                                      Object {
                                        "strokeWidth": 2,
                                      }
                                    }
                                    width="25"
                                    x="1"
                                    y="1"
                                  />
                                  <path
                                    d="M22.12 6c-3.12 3.16-6.84 6.36-10.23 9.64l-5.42-4.05L4 14.84l6.78 5.08L12.23 21l1.25-1.25C17 16.2 21.29 12.6 25 8.89z"
                                    fill="#FFF"
                                  />
                                </g>
                              </Checkbox>
                            </svg>
                          </div>
                        </withSvg(Checkbox)>
                        <input
                          disabled={true}
                          maxLength={50}
                          onChange={[Function]}
                          onKeyDown={[Function]}
                          type="text"
                          value="Выполнить важную задачу (создано в конструкторе)."
                        />
                      </div>
                      <div
                        className="actions"
                      >
                        <withSvg(Star)
                          checked={false}
                          className="toggleTaskFavoriteState"
                          color1="#3B8EF3"
                          color2="#000"
                          height={19}
                          inlineBlock={true}
                          onClick={[Function]}
                          width={19}
                        >
                          <div
                            className="toggleTaskFavoriteState"
                            onClick={[Function]}
                            onMouseEnter={[Function]}
                            onMouseLeave={[Function]}
                            style={
                              Object {
                                "display": "inline-block",
                                "height": 19,
                                "width": 19,
                              }
                            }
                          >
                            <svg
                              style={
                                Object {
                                  "display": "block",
                                  "height": 19,
                                  "width": 19,
                                }
                              }
                              version="1.1"
                              viewBox="0 0 90 85.8"
                            >
                              <Star
                                checked={false}
                                className="toggleTaskFavoriteState"
                                color1="#3B8EF3"
                                color2="#000"
                                hover={false}
                                inlineBlock={true}
                                onClick={[Function]}
                              >
                                <g>
                                  <path
                                    d="M61.6 51.4l5.7 26.4L45 64.5 22.7 77.8l5.7-26.4-19.3-16 24.2-2.8L45 8.7l11.6 23.8 24.2 2.8-19.2 16.1zM88 31.3L59.9 28l-13-26.6C46.6.5 45.8 0 45 0s-1.6.5-1.9 1.4L30.1 28 2 31.3c-1.9 0-2.7 2.4-1.2 3.5L23 53.3l-6.4 29.9c-.4 1.4.6 2.6 1.9 2.6.4 0 .8-.1 1.1-.4L45 70.2l25.4 15.2c.4.3.8.4 1.1.4 1.2 0 2.3-1.2 1.9-2.6L67 53.3l22.2-18.5c1.5-1.1.7-3.5-1.2-3.5z"
                                    fill="#000"
                                  />
                                </g>
                              </Star>
                            </svg>
                          </div>
                        </withSvg(Star)>
                        <withSvg(Edit)
                          checked={false}
                          className="updateTaskMessageOnClick"
                          color1="#3B8EF3"
                          color2="#000"
                          height={19}
                          inlineBlock={true}
                          onClick={[Function]}
                          width={19}
                        >
                          <div
                            className="updateTaskMessageOnClick"
                            onClick={[Function]}
                            onMouseEnter={[Function]}
                            onMouseLeave={[Function]}
                            style={
                              Object {
                                "display": "inline-block",
                                "height": 19,
                                "width": 19,
                              }
                            }
                          >
                            <svg
                              style={
                                Object {
                                  "display": "block",
                                  "height": 19,
                                  "width": 19,
                                }
                              }
                              version="1.1"
                              viewBox="0 0 21 21"
                            >
                              <Edit
                                checked={false}
                                className="updateTaskMessageOnClick"
                                color1="#3B8EF3"
                                color2="#000"
                                hover={false}
                                inlineBlock={true}
                                onClick={[Function]}
                              >
                                <g>
                                  <path
                                    d="M19.4 3.1L18 1.7 8.6 11l1.4 1.4 9.4-9.3zM19.3.3l1.4 1.4c.4.4.4 1 0 1.4L10.5 13.3c-.1.1-.2.2-.3.2l-2.9 1c-.3.1-.7-.1-.8-.4v-.4l1-2.9c0-.1.1-.2.2-.3L17.9.3c.4-.4 1-.4 1.4 0zM17 9h1v9.5c0 1.4-1.1 2.5-2.5 2.5h-13C1.1 21 0 19.9 0 18.5v-13C0 4.1 1.1 3 2.5 3H12v1H2.5C1.7 4 1 4.7 1 5.5v13c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5V9z"
                                    fill="#000"
                                  />
                                </g>
                              </Edit>
                            </svg>
                          </div>
                        </withSvg(Edit)>
                        <withSvg(Remove)
                          className="removeTask"
                          color1="#3B8EF3"
                          color2="#000"
                          height={17}
                          inlineBlock={true}
                          onClick={[Function]}
                          width={17}
                        >
                          <div
                            className="removeTask"
                            onClick={[Function]}
                            onMouseEnter={[Function]}
                            onMouseLeave={[Function]}
                            style={
                              Object {
                                "display": "inline-block",
                                "height": 17,
                                "width": 17,
                              }
                            }
                          >
                            <svg
                              style={
                                Object {
                                  "display": "block",
                                  "height": 17,
                                  "width": 17,
                                }
                              }
                              version="1.1"
                              viewBox="0 0 53.8 53.8"
                            >
                              <Remove
                                checked={false}
                                className="removeTask"
                                color1="#3B8EF3"
                                color2="#000"
                                hover={false}
                                inlineBlock={true}
                                onClick={[Function]}
                              >
                                <g>
                                  <path
                                    d="M53 49.5c1 1 1 2.6 0 3.5-.5.5-1.1.7-1.8.7-.6 0-1.3-.2-1.8-.7L26.9 30.4 4.3 53c-.5.5-1.1.7-1.8.7-.6 0-1.3-.2-1.8-.7-1-1-1-2.6 0-3.5l22.6-22.6L.7 4.3c-1-1-1-2.6 0-3.5 1-1 2.6-1 3.5 0l22.6 22.6L49.5.7c1-1 2.6-1 3.5 0 1 1 1 2.6 0 3.5L30.4 26.9 53 49.5z"
                                    fill="#000"
                                  />
                                </g>
                              </Remove>
                            </svg>
                          </div>
                        </withSvg(Remove)>
                      </div>
                    </li>
                  </Task>
                </div>
              </FlipMove>
            </FlipMovePropConverter>
          </ul>
        </div> */}






                </section>



      <footer>
      {/*<Checkbox
          inlineBlock
          checked={false}
          className = { Styles.toggleTaskCompletedState }
          color1="#363636"
          color2="#fff"
      />*/}
      
        {/*<Checkbox
          inlineBlock
          checked={false}
          color1="#363636"
          color2="#fff"
          //height={25}
          //onClick={[MockFunction]}
          //width={25}
        >
        </Checkbox>
          {/*<div
            //onClick={[MockFunction]}
            onMouseEnter={[Function]}
            onMouseLeave={[Function]}
            style={
              Object {
                "display": "block",
                "height": 25,
                "width": 25,
              }
            }
          >
            <svg
              style={
                Object {
                  "display": "block",
                  "height": 25,
                  "width": 25,
                }
              }
              version="1.1"
              viewBox="0 0 27 27"
            >
              <Checkbox
                checked={false}
                color1="#363636"
                color2="#fff"
                hover={false}
                //onClick={[MockFunction]}
              >
                <g>
                  <rect
                    fill="#fff"
                    height="25"
                    rx="5"
                    ry="5"
                    stroke="#363636"
                    style={
                      Object {
                        "strokeWidth": 2,
                      }
                    }
                    width="25"
                    x="1"
                    y="1"
                  />
                  <path
                    d="M22.12 6c-3.12 3.16-6.84 6.36-10.23 9.64l-5.42-4.05L4 14.84l6.78 5.08L12.23 21l1.25-1.25C17 16.2 21.29 12.6 25 8.89z"
                    fill="#fff"
                  />
                </g>
              </Checkbox>
            </svg>
          </div>
                  </withSvg(Checkbox)>*/}

        <span
          className="completeAllTasks"
        >
          Все задачи выполнены
                </span>
      </footer>
            </main>
            </section>
        );
    }
}
