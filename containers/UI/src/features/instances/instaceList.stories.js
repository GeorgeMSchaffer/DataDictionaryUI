import React from 'react';
import InstanceList from './InstanceList';
import { instances } from './mockInstancesAPI';
import { browserHistory } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../../app/store';
import { storiesOf } from '@storybook/react';
import Provider from '../../utils/Provider';
import withReduxEnhancer from 'addon-redux/enhancer'
import { applyMiddleware } from 'redux'

export default {
  component: InstanceList,
  title:'Failed Instances List',
  instances: [],
  si_id:666
};
const Template = (args)=>{
  return (
    <ReduxProvider store={store}>
      <InstanceList {...args} />;
    </ReduxProvider>
  );
}

const withProvider = (story) => (
  <Provider store={store}>
    { story() }
  </Provider>
)

export const Default = Template.bind({});
Default.args = {
  instances: [],
  si_id: undefined
};


export const Loaded = Template.bind({});
Loaded.args = {
  instances:[]
};

storiesOf('InstanceList', module)
  .addDecorator(withProvider)
  .add()