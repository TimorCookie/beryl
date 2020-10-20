import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
// import { action } from '@storybook/addon-actions'
import AutoComplete from './autoComplete'

export default {
  title: 'example/AutoComplete',
  component: AutoComplete,
} as Meta

const timos = ['react', 'angular', 'vue', 'js', 'ts', 'ak', 'm4', '98k', 'awm', 'beryl']

const template: Story<any> = (args) => {
  const handleFetch = (query: string) => {
    return timos.filter(name => name.includes(query))
  }
  // const handleChange = (e: ChangeEvent<HTMLInputElement>)=> {
  //   return e.target.value
  // }
  return <AutoComplete {...args} style={{ width: '300px' }} fetchSuggestions={handleFetch}/>;
}
export const Default = template.bind({})
// Default.args = {
//   onChange: handleChange,
//   fetchSuggestions: handleFetch,
// }