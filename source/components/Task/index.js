// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';
import { withProfile } from 'components/HOC/withProfile';
import { string, arrayOf, func, shape } from 'prop-types';

@withProfile
export default class Task extends PureComponent {
    constructor () {
        super();
        //this._removePost = this._removePost.bind(this);
    }

    /*static propTypes = {
        //_likePost: func.isRequired,
        id:        string.isRequired,
        completed: string.isRequired,
        favorite:  string.isRequired,
        message:   string.isRequired,
        /*likes: arrayOf (
            shape({                
                firstName: string.isRequired,
                id:        string.isRequired,
                lastName:  string.isRequired,
            }),
        ).isRequired,*/
    /*};*/

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    render () {
        //_getTaskShape();

        console.log('TaskRender this.props', this.props)
        const { /*avatar, 
            firstName, 
            lastName, 
            comment, 
            created, 
            _likePost, */
            id,
            tasks, 
            //likes 
        } = this.props;

        console.log('TaskRender this.props', this.props.id)
        console.log('TaskRender this.props', tasks)

        return <li className = { Styles.task }>задача {id}-{tasks}</li>;
       
        //{cross}                    
    }
}
