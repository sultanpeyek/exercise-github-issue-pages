import React from 'react';
import styles from './App.module.css';
import classNames from 'classnames';
import { Switch, Route } from 'react-router-dom';

import IssuesListPage from './pages/IssuesListPage/IssuesListPage';
import IssueDetailPage from './pages/IssueDetailPage/IssueDetailPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function App() {
  return (
    <div className={classNames([styles.App])}>
      <Switch>
        <Route exact path={['/', '/!#']} component={IssuesListPage} />
        <Route path="/issues/:id" component={IssueDetailPage} />
        <Route path="/profile/:id" component={ProfilePage} />
      </Switch>
    </div>
  );
}

export default App;
