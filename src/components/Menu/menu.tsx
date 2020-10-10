import React, { useState } from 'react';
import classnames from 'classnames';
import { MenuItemProps } from './menuItem';
type Menumode = 'vertical' | 'horizontal'
type SelectCallback = (selectedIndex: string) => void
export interface ImenuProps {
  defaultIndex?: string;
  mode?: Menumode;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: SelectCallback,
  defaultOpenSubMenus?: string[]
}

interface ImenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: Menumode,
  defaultOpenSubMenus?: string[]
}
export const MenuContext = React.createContext<ImenuContext>({ index: '0' })

const Menu: React.FC<ImenuProps> = (props) => {
  const { defaultIndex, mode, className, style, onSelect, children, defaultOpenSubMenus } = props
  const [currentActive, setActive] = useState(defaultIndex)
  const classes = classnames(
    'beryl-menu',
    className,
    {
      'menu-vertical': mode === 'vertical',
      'menu-horizontal': mode !== 'vertical'
    }
  )
  const handleClick = (index: string) => {
    setActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  const passedMenuContext: ImenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName !== 'MenuItem' && displayName !== 'SubMenu') {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      } else {
        return React.cloneElement(childElement, { index: index.toString() })
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedMenuContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}

export default Menu