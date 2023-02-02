import {
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsSelectByString,
  FindOptionsWhere,
} from 'typeorm';
import { Operand } from '../models';
import { QueryHelper } from './query.helper';

export type SqlQuerySelectOptions<T> = FindOptionsSelect<T> | FindOptionsSelectByString<T>;

export class SqlQuery<T> {
  where: FindOptionsWhere<T> | FindOptionsWhere<T>[];
  order: FindOptionsOrder<T>;
  relations: FindOptionsRelations<T>;
  select: SqlQuerySelectOptions<T>;
  skip: number;
  take: number;

  constructor(defaultWhereClause: FindOptionsWhere<T> = {}) {
    this.where = { ...defaultWhereClause };
  }

  addWhereClause<T>(field: string, value: T | T[], operand: Operand, relation?: string) {
    QueryHelper.buildWhereClause(field, value, operand, relation ? this.where[relation] : this.where);
    return this;
  }

  addOrder(sortBy: string, sortDir: 'asc' | 'desc') {
    this.order = { ...this.order, ...QueryHelper.getOrder(sortBy, sortDir) };
    return this;
  }

  setOffset(page = 1, pageSize = 20) {
    const { skip, take } = QueryHelper.calculateOffset(page, pageSize);
    this.take = take;
    this.skip = skip;
    return this;
  }

  setRelations(relations: FindOptionsRelations<T>) {
    this.relations = relations;
    return this;
  }

  setSelect(select: FindOptionsSelect<T> | FindOptionsSelectByString<T>) {
    if (select) this.select = select;
    return this;
  }
}
