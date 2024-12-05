import React, { useState } from 'react'
import builder from '@rsql/builder'
import { ExpressionNode } from '@rsql/ast'

import { SelectFieldProps } from '../Add/SelectField'
import { FilterItem } from '../../types'
import {
  defaultOperators,
  rsqlRemoveFilter,
  rsqlReplaceFilter,
  searchableSelectField,
  selectFieldToComparisonOperator
} from '../../utils'
import { Layout } from './Layout'

export type FilterProps = Pick<SelectFieldProps, 'fields'> & {
  search: ExpressionNode | undefined
  setSearch: (search: ExpressionNode | undefined) => void
}
const initialFieldState: FilterItem = {
  label: '',
  operators: [],
  selector: '',
  type: 'string',
  value: '',
  operator: '=='
}
const Filter: React.FC<FilterProps> = ({ fields, search, setSearch }) => {
  const [field, setField] = useState<FilterItem>(initialFieldState)
  const [originalFilter, setOriginalFilter] =
    useState<FilterItem>(initialFieldState)
  const [editionFilter, setEditionFilter] =
    useState<FilterItem>(initialFieldState)

  const makeField = (item: FilterItem): FilterItem => ({
    ...item,
    operator: selectFieldToComparisonOperator(item.operator),
    value: searchableSelectField.includes(item.operator)
      ? `*${item.value}*`
      : item.value
  })

  const handleSelectField = (selector: string) => {
    const field = fields.find((item) => item.selector === selector)
    if (!field) return
    const [operator] = field.operators || defaultOperators[field.type]
    setField({ ...field, selector, operator, value: '' })
  }

  const handleUnselectField = () => {
    setField(initialFieldState)
  }

  const onAddFilterItem = () => {
    const rsqlField = makeField(field)
    const comparison = builder.comparison(
      rsqlField.selector,
      rsqlField.operator,
      rsqlField.value
    )
    setSearch(search ? builder.and(search, comparison) : comparison)
    setField(initialFieldState)
  }

  const handleSelectFilter = (item: FilterItem) => {
    setOriginalFilter(item)
    setEditionFilter({
      ...item,
      value: searchableSelectField.includes(item.operator)
        ? item.value.slice(1, -1)
        : item.value
    })
  }

  const handleRemoveFilter = () => {
    setSearch(
      rsqlRemoveFilter(
        {
          ...editionFilter,
          operator: selectFieldToComparisonOperator(editionFilter.operator)
        },
        search
      )
    )
    setOriginalFilter(initialFieldState)
    setEditionFilter(initialFieldState)
  }

  const handleEditFilter = () => {
    const newFilter = makeField(editionFilter)
    setSearch(
      rsqlReplaceFilter(
        {
          ...originalFilter,
          operator: selectFieldToComparisonOperator(originalFilter.operator)
        },
        newFilter,
        search
      )
    )
    setOriginalFilter(initialFieldState)
    setEditionFilter(initialFieldState)
  }

  return (
    <Layout
      fields={fields}
      search={search}
      onSelectField={handleSelectField}
      onUnselectField={handleUnselectField}
      field={field}
      setField={setField}
      onAddFilterItem={onAddFilterItem}
      onSelectFilter={handleSelectFilter}
      onRemoveFilter={handleRemoveFilter}
      editionFilter={editionFilter}
      setEditionFilter={setEditionFilter}
      onEditFilter={handleEditFilter}
    />
  )
}

export { Filter }
