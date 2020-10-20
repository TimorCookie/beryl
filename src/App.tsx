import React, { useState } from 'react';
import './styles/index.scss';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Input from './components/Input/input'
import Icon from './components/Icon/icon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Transition from './components/Transition/transition'

import AutoComplete from './components/AutoComplete/autoComplete'
library.add(fas)

function App() {
  const [show, setShow] = useState(false)
  const timos = ['react', 'angular', 'vue', 'js', 'ts',
    'ak', 'm4', '98k', 'awm', 'beryl']
  const handleFetch = (query: string) => {
    return timos.filter(name => name.includes(query))
  }
  return (
    <div className="App">
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={() => console.log(11)}
      />
      <Icon icon="bug" theme="primary" size="10x" />
      <Input size="lg" icon="bug" />
      <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} defaultOpenSubMenus={['2']}>
        <MenuItem>
          cool link
        </MenuItem>
        <MenuItem disabled>
          cool link 2
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            dropdown 1
          </MenuItem>
          <MenuItem>
            dropdown 2
          </MenuItem>
        </SubMenu>
        <MenuItem>
          cool link 3
        </MenuItem>
      </Menu>
      <Button size="lg" onClick={() => { setShow(!show) }} > Toggle </Button>
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-left"
      >
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
        </div>
      </Transition>
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-top"
        wrapper
      >
        <Button btnType="primary" size="lg">A Large Button </Button>
      </Transition>
    </div>
  );
}

export default App;
