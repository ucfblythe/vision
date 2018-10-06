import React, {Component } from 'react';
import Menu from './components/Menu'
import Content from './Content'
import './styles/app.css'

class App extends Component
{
    render()
    {
        return(
          <div>
              <Menu />
              <Content />
          </div>
        );
    }
}
export default App;