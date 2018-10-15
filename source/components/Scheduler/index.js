// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Task from 'components/Task';

export default class Scheduler extends Component {
    render () {
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
                        //onSubmit={[MockFunction]}
                    >
                        <input
                            className="createTask"
                            maxLength={50}
                            //onChange={[MockFunction]}
                            placeholder="Описaние моей новой задачи"
                            type="text"
                            value=""
                        />
                        <button>
                            Добавить задачу
                        </button>
                    </form>              
                </section>



      <footer>
       {/*} <withSvg(Checkbox)
          checked={false}
          color1="#363636"
          color2="#fff"
          height={25}
          </footer>onClick={[MockFunction]}
          width={25}
        >
          <div
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
        </withSvg(Checkbox)>
        <span
          className="completeAllTasks"
        >
          Все задачи выполнены
                </span>*/}
      </footer>
            </main>
            </section>
        );
    }
}
