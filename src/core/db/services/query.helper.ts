import { isArray } from 'class-validator';
import { Operand, Sorting } from '../models';
import { getQueryBuilder } from './query.builder';

export class QueryHelper {
  static getOrder = (sortBy: string, sortDir: 'asc' | 'desc') => {
    if (!sortBy) return {};
    return { [sortBy]: sortDir?.toLowerCase() === 'asc' ? 'ASC' : 'DESC' };
  };

  static getMultipleOrdering = (orderings: Sorting[]) => {
    let order = {};
    orderings.forEach(({ sortBy, sortDir }) => (order = { ...order, ...this.getOrder(sortBy, sortDir) }));
    return order;
  };

  static calculateOffset = (page = 1, pageSize = 20) => {
    const MAX_RESULTS = Math.pow(10, 6);
    pageSize = !pageSize || pageSize < 0 ? MAX_RESULTS : pageSize;
    page = page < 0 ? 1 : page;

    const take = Math.max(0, Math.min(pageSize, MAX_RESULTS));
    const skip = Math.max(0, (page - 1) * take);
    return { skip, take };
  };

  static buildWhereClause<P>(field: string, value: P | P[], operand: Operand, obj = {}) {
    if (typeof value === undefined) return obj;

    if (typeof value === 'string') {
      if (value.length === 0) return obj;
      if (value.includes(',')) {
        return getQueryBuilder('array', 'in')(
          obj,
          field,
          value.split(',').map((v) => v.trim())
        );
      }

      return getQueryBuilder('string', operand)(obj, field, value);
    }

    if (typeof value === 'boolean') return getQueryBuilder('boolean', operand)(obj, field, value);
    if (typeof value === 'number') return getQueryBuilder('number', operand)(obj, field, value);

    if (isArray(value)) {
      const array = value as any[];
      if (array.length === 0) return obj;

      return getQueryBuilder('array', operand)(obj, field, value);
    }

    return obj;
  }
}
