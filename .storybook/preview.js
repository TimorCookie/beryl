import "../src/styles/index.scss"
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import "./fix_info_style.scss"
import React from 'react'

addDecorator(withInfo); 
const wrapperStyle = {
  padding: '20px 40px',
}
const storyWrapper = (stroyFn) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
)
addDecorator(storyWrapper)
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  info: {inline: true, header: false}
}
