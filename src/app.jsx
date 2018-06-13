import React, { Component } from 'react';

import { CustomMessage } from './components';

class App extends Component {
    constructor() {
        super();
        this.state = {
            provider: 'provider'
        }
    }

    toggle = () => {
        this.setState({
            provider: this.state.provider === 'provider' ? 'custom_provider' : 'provider'
        })
    }

    render() {
        const { toggle } = this;
        return(
            <div>
                <button onClick={toggle}>Toggle provider</button>
                <CustomMessage providerName={this.state.provider} />
            </div>
        )
    }
}

export { App };