import type { ComparisonNode, ExpressionNode } from '@rsql/ast'
import builder from '@rsql/builder'

import type { FilterItem } from '../types.ts'
import { isSameRsqlFilter } from './isSameRsqlFilter'

export const rsqlRemoveFilter = (
  field: FilterItem,
  search?: ExpressionNode
): ExpressionNode | undefined => {
  if (!search) return search
  if (search.type === 'LOGIC') {
    const left = rsqlRemoveFilter(field, search.left)
    const right = rsqlRemoveFilter(field, search.right)
    if (!left) return right
    if (!right) return left
    return builder.logic([left, right], search.operator)
  }
  if (isSameRsqlFilter(field, search as ComparisonNode)) return undefined
  return search
}
