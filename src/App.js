import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';

import Header from './components/header/header';
import theme from './components/ui/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header /> <h1>Hello</h1>
    </ThemeProvider>
  );
}
export default App;
