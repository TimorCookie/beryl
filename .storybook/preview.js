import "../src/styles/index.scss"
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
addDecorator(withInfo); 
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  info: {inline: true}
}