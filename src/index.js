import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Routes, Route} from 'react-router-dom';
/*
<Router>
<Route path='/' component = {App} />
</Router>,
<App />,
*/

ReactDOM.render(
    <Routes>
      <Route path="/" element={<App />}> <App/> </Route>
    </Routes>,
  document.getElementById('root')
);

