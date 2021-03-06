import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
// import { action } from '@storybook/addon-actions'
import AutoComplete, { DataSourceType } from './autoComplete'

export default {
  title: 'example/AutoComplete',
  component: AutoComplete,
} as Meta
interface WeaponProps {
  value: string;
  bullet: string
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string
}
const weapon = [
  {
    value: 'ak47',
    bullet: '7.62mm'
  },
  {
    value: 'beryl',
    bullet: '7.62mm'
  },
  {
    value: '98k',
    bullet: '7.62mm'
  },
  {
    value: 'm416',
    bullet: '0.56mm'
  },
  {
    value: 'm16A4',
    bullet: '0.56mm'
  }
]
const handleFetch = (query: string) => {
  return weapon.filter(name => name.value.includes(query))
}
const renderOption = (item: DataSourceType<WeaponProps>) => {
  return (
    <>
      <p>name: {item.value}</p>
      <p>type: {item.bullet}</p>
    </>
  )
}
const fetchGithub = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then(({ items }) => {
      let results = (items && items.length > 10) ? (items.slice(0, 10)) : items
      return results.map((item: GithubUserProps) => ({ value: item.login, ...item }))
    })
    .catch(err => {
      console.warn(err)
    })
}
const template: Story<any> = (args) => {
  return <AutoComplete {...args} style={{ width: '300px' }} />;
}
export const Default = template.bind({})
Default.args = {
  fetchSuggestions: handleFetch,
}
export const RenderWithOption = template.bind({})
RenderWithOption.args = {
  fetchSuggestions: handleFetch,
  renderOption
}
export const awaitSource = template.bind({})
awaitSource.args = {
  fetchSuggestions: fetchGithub
}