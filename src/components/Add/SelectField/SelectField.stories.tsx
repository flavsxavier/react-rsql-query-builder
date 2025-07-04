import React from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'

import { SelectField, type SelectFieldProps } from '.'

export default {
  title: 'components/Add/SelectField',
  component: SelectField
} as Meta<React.JSXElementConstructor<SelectFieldProps>>

const Template: StoryFn<React.JSXElementConstructor<SelectFieldProps>> = (
  args
) => <SelectField {...args} />

const defaultProps: SelectFieldProps = {
  fields: [
    { selector: 'name', label: 'Name', type: 'string' },
    { selector: 'age', label: 'Age', type: 'number' },
    { selector: 'isActive', label: 'Active', type: 'boolean' },
    {
      selector: 'status',
      label: 'Status',
      type: 'array',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Deactivate', value: 'deactivate' },
        { label: 'Pending', value: 'pending' }
      ]
    }
  ],
  onSelectField: () => undefined
}

export const Default = Template.bind({})
Default.args = defaultProps
