import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';

import Menu, { ImenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: ImenuProps = {
  defaultIndex: 0,
  className: 'test',
  onSelect: jest.fn()
}

const testVerProps: ImenuProps = {
  defaultIndex: 0,
  mode: 'vertical'
}
const generateMenu = (props:ImenuProps)=> {
  return(
    <Menu {...props}>
      <MenuItem index={0} >
        active item
      </MenuItem>
      <MenuItem index={1} disabled>
        disabled item
      </MenuItem>
      <MenuItem index={2}>
        last one
      </MenuItem>
    </Menu>
  )
}

let wrapper:RenderResult, menuElement:HTMLElement, disabledElement:HTMLElement, activeElement:HTMLElement, lastElement:HTMLElement
describe('test Menu and MenuItem component', () => {
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('test-menu')
    disabledElement = wrapper.getByText('disabled item')
    activeElement = wrapper.getByText('active item')
    lastElement = wrapper.getByText('last one')
  })
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('beryl-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback', () => {
    fireEvent.click(lastElement)
    expect(lastElement).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toBeCalledWith(1)
  })
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup()
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('beryl-menu menu-vertical')
  })
})