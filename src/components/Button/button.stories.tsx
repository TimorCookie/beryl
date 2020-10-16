import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import Button from './button'

export default {
  title: 'example/Button',
  component: Button
} as Meta

const template: Story<any> = (args) => <Button {...args} onClick={action('clicked')}>{args.btnTxt}</Button>;
export const DefaultButton = template.bind({})
DefaultButton.args = {
  btnTxt: 'default button'
}
export const PrimaryButton = template.bind({})
PrimaryButton.args = {
  btnType: 'primary',
  btnTxt: 'primary button'
}

export const DangerButton = template.bind({})

DangerButton.args = {
  btnType: 'danger',
  btnTxt: 'danger button'
}
export const LinkButton = template.bind({})
LinkButton.args = {
  btnType: 'link',
  btnTxt: 'link button'
}
export const LargeButton = template.bind({})
LargeButton.args = {
  size: 'lg',
  btnTxt: 'large button'
}
export const SmallButton = template.bind({})
SmallButton.args = {
  size: 'sm',
  btnTxt: 'small button'
}