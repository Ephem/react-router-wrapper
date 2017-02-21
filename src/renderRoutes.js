import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

export default function renderRoutes(routes, currentUrl) {
    return routes.map((route) => {
        if (Array.isArray(route)) {
            return (
                <Switch>
                    {renderRoutes(route)}
                </Switch>
            );
        }
        return <Route
            key={route.path} {...route}
            path={route.path && route.path.replace('#{match.url}', currentUrl)} />;
    });
};
