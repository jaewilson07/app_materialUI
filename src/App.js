import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';

import Header from './components/ui/header/header';
import theme from './components/ui/theme';

import { HEADER } from './constants';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          {HEADER.map((heading, index) => (
            <Route
              key={index}
              exact
              path={heading.path}
              component={heading.component}
            ></Route>
          ))}
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;
