import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions'
import Input from './input'

export default {
  title: 'example/Input',
  component: Input,
} as Meta

const template: Story<any> = (args) => <Input {...args} onClick={action('clicked')} style={{width: '300px'}}/>
export const DefaultInput = template.bind({})
export const DisabledInput = template.bind({})
DisabledInput.args = {
  disabled: true
}
export const IconInput = template.bind({})
IconInput.args = {
  icon:"home"
}
export const LargeInput = template.bind({})
LargeInput.args = {
  size:"lg"
}
export const SmallInput = template.bind({})
SmallInput.args = {
  size:"sm"
}
export const AppendInput = template.bind({})
AppendInput.args = {
  append:".com",
  prepend: 'https://'
}