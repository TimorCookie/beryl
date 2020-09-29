import React, { useState } from 'react';
import classnames from 'classnames'

type Menumode = 'vertical' | 'horizontal'
type SelectCallback = (selectedIndex: number) => void
export interface ImenuProps {
  defaultIndex?: number;
  mode?: Menumode;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCallback
}

interface ImenuContext {
  index: number;
  onSelect?: SelectCallback
}
export const MenuContext = React.createContext<ImenuContext>({ index: 0 })

const Menu: React.FC<ImenuProps> = (props) => {
  const { defaultIndex, mode, className, style, onSelect, children } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classnames('beryl-menu', className , {
    'menu-vertical': mode === 'vertical'
  })
  const handleClick = (index: number) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedMenuContext: ImenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedMenuContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps={
  defaultIndex: 0,
  mode: 'horizontal'
}

export default Menu