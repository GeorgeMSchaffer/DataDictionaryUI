import React from 'react';
import InstanceItem from './InstanceItem';

export default {
  component: InstanceItem,
  title: 'Instance Item',
  text: 'Storybook',
  complete:true
};

const Template = args => <InstanceItem {...args} />;

export const Default = Template.bind({});
Default.args = {
    complete: true,
    text: 'Storybook Examples'
};


export const Empty = Template.bind({});
Empty.args = {
    ...Default.args.InstanceItem,
    text:''
};

export const Filled = Template.bind({});
Filled.args = {
  InstanceItem: {
    ...Default.args.InstanceItem,
    text:'Filled Example'
   },
};
