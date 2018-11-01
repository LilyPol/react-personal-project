import React, { Component } from 'react';

import { object } from 'prop-types';
import Styles from './styles.m.css';

export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired,
    };

    state = {
        error: false,
    }

    componentDidCatch (error, stack) {
        console.log('ERROR:', error);
        console.log('STACKTRACE:', stack.componentStack);
    }

    render () {
        if (this.state.error) {
            return (
                <section>
                    <span> A mysterious error occured.</span>
                    <p>Our space engineers fixing that already!</p>
                </section>
            );
        }

        return this.props.children;
    }
}