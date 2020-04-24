/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ErrorBoundary} from 'strapi-helper-plugin';
// Utils
import pluginId from '../../pluginId';
// Containers
import ExportPage from '../ExportPage';
import ImportPage from '../ImportPage';
import UtilPage from '../UtilPage';

const App = () => {
  return (
    <div>
      <ErrorBoundary>
        <Switch>
          <Route path={`/plugins/${pluginId}/export`} component={ExportPage}
                 exact/>
          <Route path={`/plugins/${pluginId}/import`} component={ImportPage}
                 exact/>
          <Route path={`/plugins/${pluginId}/utilities`} component={UtilPage}
                 exact/>
          <Redirect to={`/plugins/${pluginId}/export`}/>
        </Switch>
      </ErrorBoundary>
    </div>
  );
};

export default App;
