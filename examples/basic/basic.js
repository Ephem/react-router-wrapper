import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Link, Route, withRouter } from 'react-router-dom';

import { withRoutes, renderRoutes } from 'react-router-wrapper';

class Home extends Component {
    static getName() {
        return 'Home';
    }
    render() {
        return <h2>Home</h2>;
    }
}
class About extends Component {
    static getName() {
        return 'About';
    }
    render() {
        return <h2>About</h2>;
    }
}
class Topic extends Component {
    static getName() {
        return 'Topic';
    }
    render() {
        return <h3>{this.props.match.params.topicId}</h3>;
    }
}

class TopicsDumb extends Component {
    static getName() {
        return 'Topics';
    }
    render() {
        const { routes, match } = this.props;
        return (
            <div>
                <h2>Topics</h2>
                <ul>
                    <li><Link to={`${match.url}/rendering`}>Rendering with React</Link></li>
                    <li><Link to={`${match.url}/components`}>Components</Link></li>
                    <li><Link to={`${match.url}/props-v-state`}>Props v. State</Link></li>
                </ul>

                {renderRoutes(routes, match.url)}
                <Route exact path={match.url} render={() => (
                    <h3>Please select a topic.</h3>
                )}/>
            </div>
        );
    }
}

const Topics = withRoutes([
    { path: '#{match.url}/:topicId', component: Topic }
])(TopicsDumb);

class RootDumb extends Component {
    static getName() {
        return 'Root';
    }
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>
                {renderRoutes(this.props.routes)}
            </div>
        );
    }
}

const Root = withRoutes([
    { path: '/', exact: true, component: Home },
    { path: '/about', component: About },
    { path: '/topics', component: Topics }
])(RootDumb);

const App = () => {
    return (
        <BrowserRouter basename='/basic'>
            <Root />
        </BrowserRouter>
    );
}

const componentsThatWillGetRendered = Root.getMatchedComponents(window.location.pathname.replace('/basic', ''));

document.getElementById('components-list').innerHTML = componentsThatWillGetRendered.reduce(
    (acc, component) => acc + `<li>${component.getName()}</li>`, ''
);

setTimeout(() => render(<App />, document.getElementById('react-app')), 1000);
