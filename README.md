# react-router-wrapper

A higher order component for react-router v4 for matching route-components before render, without a centralized config. Still a very early and rough proof of concept.

One of the neat things in react-router v4 is that Routes are simply components, using the standard React lifecycle. This also means that we do not have to have a centralized route-config, but can instead co-localize our routes with our components. One of the tricky things about the migration path from earlier versions is however that sometimes we need to know which components are going to get rendered, before actually rendering them, for example when pre-fetching data, either on the server or when navigating in the client.

The proposed solution is something like `react-router-addons-routes` which provides a way to yet again centralize the route-config, in order to be able to match it before rendering. `react-router-wrapper` is an attempt at keeping the same kind of config-objects as in `react-router-addons-routes`, but keeping route-declarations co-localized in the components (but outside render), instead of having a centralized config.

The library consists of two parts. The main part is the `withRoutes`-higher order component and the other is the `renderRoutes`-helper, that simply takes a route-configuration-object and returns corresponding Routes (and Switch:es).

## withRoutes

```
import { withRoutes, renderRoutes } from 'react-router-wrapper';

const ComponentThatHasRoutes = ({ routes }) => {
    return (
        <div>
            <h1>This component has routes</h1>
            {renderRoutes(routes)}
        </div>
    );
};

const WrappedComponent = withRoutes([
    { path: '/some/route', exact: true, component: Child1 },
    { path: '/some/route/deeper', component: Child2 }
])(ComponentThatHasRoutes);
```

This would result in:

```
<div>
    <h1>This component has routes</h1>
    <Route path='/some/route' exact component={Child1} />
    <Route path='/some/route/deeper' component={Child2} />
</div>
```

Calling `WrappedComponent.getMatchedComponents(pathToMatch)` is then possible before rendering and returns an array of components that are going to get rendered. This works recursively on the children as well if they also use withRoutes. When you have the components, you can call any static methods on them to get data dependencies or other neat stuff.

Note that while possibly confusing you can easily have extra routes in your render() if you have no need of matching them pre-render. `getMatchedComponents` is only one possible static method on the wrapper-component. Others can easily be added to get the entire route-tree, the matched routes as a tree instead of in an array etc.

## Build

`npm run build` builds files to dist/

## Example

So far only a very basic client-example exists, based on the Basic react router v4-example found here: https://reacttraining.com/react-router/

When I find the time I will add a client preloading example as well as a serverside example. Looking at the code for the current example should hint at their implementations.

1. Clone repo
2. `npm install`
3. `npm start` fires up a server
4. Go to `http://localhost:8080/basic/` for the example

## Feedback

This is still an early concept, I would love all kinds of input and feedback on it. Feel free to reach out and to toy around with it!
