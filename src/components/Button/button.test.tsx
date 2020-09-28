import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
  onClick: jest.fn()
}
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  classname: 'testing-class'
}
const linkProps:ButtonProps ={
  btnType: ButtonType.Link,
  size: ButtonSize.Small,
  href: 'https://www.baidu.com'
}
const disabledProps:ButtonProps ={
  btnType: ButtonType.Danger,
  size: ButtonSize.Small,
  disabled: true,
  onClick: jest.fn()
}
describe('test Button component', () => {
  it('shold render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>default button</Button>)
    const element = wrapper.getByText('default button') as HTMLButtonElement

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element)
    expect(defaultProps.onClick).toBeCalled()
  });

  it('should render the correct component based on diffenrent props', () => {
    const wrapper = render(<Button {...testProps}>Timokie</Button>)
    const element = wrapper.getByText('Timokie') as HTMLButtonElement

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-lg testing-class')
  });

  it('should render a link when btnType equals link and href is provided', ()=> {
    const wrapper = render(<Button {...linkProps}>Link Button</Button>)
    const element = wrapper.getByText('Link Button') as HTMLAnchorElement

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn btn-link btn-sm')
    expect(element.tagName).toEqual('A')
  });

  it('should render disabled button when disabled props set to true', ()=> {
    const wrapper = render(<Button {...disabledProps}>Disabled Button</Button>)
    const element = wrapper.getByText('Disabled Button') as HTMLButtonElement

    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-sm btn-danger')
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toBeCalled()
  })
})
