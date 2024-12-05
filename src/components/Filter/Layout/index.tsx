import React, { useRef } from 'react'
import { ExpressionNode } from '@rsql/ast'
import { useTranslation } from 'react-i18next'

import {
  comparisonToSelectFieldOperator,
  rsqlToFilterItems
} from '../../../utils'
import { Item } from '../../FilterItem'
import { SelectField, SelectFieldProps } from '../../Add/SelectField'
import { SelectFilter } from '../../Add/SelectFilter'
import { FilterItem } from '../../../types'
import { Popover, PopoverContent, PopoverTrigger } from '../../Popover'

export type FilterProps = SelectFieldProps & {
  onUnselectField: () => void
  search?: ExpressionNode
  field: FilterItem
  onAddFilterItem: () => void
  setField: (filter: FilterItem) => void
  onSelectFilter: (item: FilterItem) => void
  onRemoveFilter: () => void
  editionFilter: FilterItem
  onEditFilter: () => void
  setEditionFilter: (filter: FilterItem) => void
}
const Layout: React.FC<FilterProps> = ({
  fields,
  search,
  field,
  onSelectField,
  onAddFilterItem,
  setField,
  onUnselectField,
  onSelectFilter,
  editionFilter,
  onEditFilter,
  setEditionFilter,
  onRemoveFilter
}) => {
  const { t } = useTranslation()
  const appliedFilters = rsqlToFilterItems(fields, search)
  const selectFieldRef = useRef<HTMLDivElement>(null)

  return (
    <main className="rsql-main">
      <Popover>
        <PopoverTrigger className="rsql-popover-trigger">
          {t('add')}
        </PopoverTrigger>
        <PopoverContent>
          <section className="rsql-filter-box">
            {!field.selector && (
              <SelectField
                fields={fields}
                onSelectField={onSelectField}
                ref={selectFieldRef}
              />
            )}
            {field.selector && (
              <SelectFilter
                onApply={onAddFilterItem}
                label={field.label}
                selector={field.selector}
                type={field.type}
                operators={field.operators}
                operator={field.operator}
                setOperator={(operator) => setField({ ...field, operator })}
                value={field.value}
                setValue={(value) => setField({ ...field, value })}
                onCancel={onUnselectField}
                options={
                  fields.find((item) => item.selector === field.selector)
                    ?.options
                }
                onSearchItems={field.onSearchItems}
              />
            )}
          </section>
        </PopoverContent>
      </Popover>
      <ul className="rsql-filters">
        {appliedFilters.map((item) => (
          <Popover key={`${item.selector}-${item.operator}`}>
            <PopoverTrigger asChild>
              <Item
                key={item.selector + item.operator + item.value}
                onSelectFilter={onSelectFilter}
                {...item}
                operator={comparisonToSelectFieldOperator(
                  item.operator,
                  !Array.isArray(item.value) ? item.value : ''
                )}
              />
            </PopoverTrigger>
            <PopoverContent>
              <SelectFilter
                onApply={onEditFilter}
                label={editionFilter.label}
                selector={editionFilter.selector}
                type={editionFilter.type}
                operators={editionFilter.operators}
                operator={editionFilter.operator}
                setOperator={(operator) =>
                  setEditionFilter({ ...editionFilter, operator })
                }
                value={editionFilter.value}
                setValue={(value) =>
                  setEditionFilter({ ...editionFilter, value })
                }
                onRemove={onRemoveFilter}
                options={
                  fields.find(
                    (item) => item.selector === editionFilter.selector
                  )?.options
                }
                onSearchItems={editionFilter.onSearchItems}
              />
            </PopoverContent>
          </Popover>
        ))}
      </ul>
    </main>
  )
}

export { Layout }
