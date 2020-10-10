import React, { useContext } from 'react';
import classnames from 'classnames';

import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';


export interface ISubMenuProps {
  index?: number;
  className?: string;
  title?: string
}

const SubMenu: React.FC<ISubMenuProps> = ({ className, index, title, children }) => {
  const context = useContext(MenuContext)
  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type

      if (displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className='beryl-submenu'>
        {childrenComponent}
      </ul>
    )
  }
  return (
    <li className={classes} key={index}>
      <div className="submenu-title">
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu