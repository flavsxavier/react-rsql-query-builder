import React, { useState } from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'

import { SelectFilter, type SelectFilterProps } from '.'

export default {
  title: 'components/Add/SelectFilter',
  component: SelectFilter
} as Meta<React.JSXElementConstructor<SelectFilterProps>>

const Template: StoryFn<React.JSXElementConstructor<SelectFilterProps>> = (
  args
) => {
  const [value, setValue] = useState(args.value)
  return <SelectFilter {...args} value={value} setValue={setValue} />
}

const defaultProps: SelectFilterProps = {
  onApply: () => undefined,
  operator: 'equals',
  selector: 'age',
  type: 'string',
  label: 'Age',
  operators: [
    'equals',
    'notEquals',
    'lessThanOrEqual',
    'moreThanOrEqual',
    'lessThan',
    'moreThan'
  ],
  value: '2',
  setValue: () => undefined,
  onRemove: () => undefined,
  setOperator: () => undefined
}

export const Default = Template.bind({})
Default.args = defaultProps

export const Boolean = Template.bind({})
Boolean.args = {
  ...defaultProps,
  operator: 'equals',
  selector: 'isActive',
  type: 'boolean',
  label: 'Active',
  value: 'true'
}

export const ArrayField = Template.bind({})
ArrayField.args = {
  ...defaultProps,
  label: 'Status',
  selector: 'status',
  type: 'array',
  operators: ['in', 'out'],
  operator: 'in',
  value: ['active'],
  options: [
    { label: 'Active', value: 'active' },
    { label: 'Deactivate', value: 'deactivate' },
    { label: 'Pending', value: 'pending' },
    { label: 'Closed', value: 'closed' },
    { label: 'Soon', value: 'soon' }
  ]
}
