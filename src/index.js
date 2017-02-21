import React, { Component } from 'react';
import { matchPath } from 'react-router';

export default function withRoutes(routes) {
    return function createWrappedComponent(component) {
        return class RouterWrapper extends Component {
            static getChildComponent() {
                return component;
            }

            static getMatchedComponents(path, lastMatch) {
                let lm = lastMatch || { url: '/' };
                return routes.reduce((acc, route) => {
                    let rPath = route.path.replace('#{matchUrl}', lm.url);
                    let match = matchPath(path, rPath, { exact: Boolean(route.exact) });
                    if (match) {
                        if (route.component) {
                            if (route.component.getChildComponent) {
                                acc.push(route.component.getChildComponent());
                            } else {
                                acc.push(route.component);
                            }
                            if (route.component.getMatchedComponents) {
                                acc.push(...route.component.getMatchedComponents(path, match));
                            }
                        }
                    }
                    return acc;
                }, lastMatch ? [] : [component]);
            }

            render() {
                return React.createElement(component, { ...this.props, routes });
            }
        };
    };
}
