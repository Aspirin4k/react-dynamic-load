import React, { Component } from 'react';
import Loadable from 'react-loadable';

const providersNames = [ 'custom_provider', 'provider' ];
const providers = providersNames.reduce((acc, val) => {
    acc[val] = Loadable({
        loader: () => import(
            /* webpackMode: "lazy" */
            /* webpackChunkName: "[request]" */
            `./${val}/provider.js`
        ),
        loading: () => null
    });
    return acc;
}, {})

const proxy = {
    get: (obj, property) => {
        // should probably cache property and return it instead of wrapper class
        return class extends Component {
            constructor() {
                super();
                this.LoadedComponent = null;
                this.state = {
                    initialized: false
                }
            }

            componentDidMount() {
                const { providerName } = this.props;
                const correctProviderName = providerName && providersNames.includes(providerName) ? providerName : providersNames[0];

                // Should propably cache provider
                // Also can use hooks on loading and loaded here
                providers[correctProviderName].preload().then((module) => {
                    console.log('Loaded new module!', module)
                    const provider = module.default;
                    this.LoadedComponent = provider[`get${property}`]();
                    this.setState({initialized: true});
                });
            }

            render() {
                const { LoadedComponent } = this;
                // Can display preloader or something
                return this.state.initialized ? <LoadedComponent {...this.props} /> : null;
            }
        }
    }
}

const ComponentProxy = new Proxy({}, proxy);

module.exports = ComponentProxy;