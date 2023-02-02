import {
  Any,
  Between,
  ILike,
  In,
  IsNull,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
  Raw,
} from 'typeorm';
import { Operand } from '../models';

const resolveJson = (obj: any, field: string, value: number | string | boolean) => {
  const [main, nested] = field.split('->');

  if (!nested) {
    obj[field] = typeof value === 'string' ? ILike(value) : value;
    return;
  }

  const expression =
    typeof value === 'string'
      ? `LOWER(REPLACE(JSON_EXTRACT(${main}, ${nested}), '"', '')) like LOWER('${value}')`
      : `JSON_EXTRACT(${main}, ${nested}) = ${value}`;

  obj[main] = Raw(() => expression);
};

const queryFor = {
  string: {
    eq: (obj: any, field: string, value: string) => resolveJson(obj, field, value),
    neq: (obj: any, field: string, value: string) => (obj[field] = Not(value)),
    not: (obj: any, field: string, value: string) => (obj[field] = Not(value)),
    starts: (obj: any, field: string, value: string) => resolveJson(obj, field, `${value}%`),
    ends: (obj: any, field: string, value: string) => resolveJson(obj, field, `%${value}`),
    contains: (obj: any, field: string, value: string) => resolveJson(obj, field, `%${value}%`),
    in: (obj: any, field: string, value: string) => resolveJson(obj, field, `%${value}%`),
    nin: (obj: any, field: string, value: string) => (obj[field] = Not(ILike(`%${value}%`))),
    lte: (obj: any, field: string, value: string) => (obj[field] = LessThanOrEqual(value)),
    lt: (obj: any, field: string, value: string) => (obj[field] = LessThan(value)),
    gte: (obj: any, field: string, value: string) => (obj[field] = MoreThanOrEqual(value)),
    gt: (obj: any, field: string, value: string) => (obj[field] = MoreThan(value)),
    isNull: (obj: any, field: string) => (obj[field] = IsNull()),
    isNotNull: (obj: any, field: string) => (obj[field] = Not(IsNull())),
  },
  boolean: {
    eq: (obj: any, field: string, value: boolean) => resolveJson(obj, field, value),
    neq: (obj: any, field: string, value: boolean) => (obj[field] = Not(value)),
    not: (obj: any, field: string, value: boolean) => (obj[field] = Not(value)),
    isNull: (obj: any, field: string) => (obj[field] = IsNull()),
    isNotNull: (obj: any, field: string) => (obj[field] = Not(IsNull())),
  },
  number: {
    eq: (obj: any, field: string, value: number) => resolveJson(obj, field, value),
    neq: (obj: any, field: string, value: number) => (obj[field] = Not(value)),
    not: (obj: any, field: string, value: number) => (obj[field] = Not(value)),
    lte: (obj: any, field: string, value: number) => (obj[field] = LessThanOrEqual(value)),
    lt: (obj: any, field: string, value: number) => (obj[field] = LessThan(value)),
    gte: (obj: any, field: string, value: number) => (obj[field] = MoreThanOrEqual(value)),
    gt: (obj: any, field: string, value: number) => (obj[field] = MoreThan(value)),
    isNull: (obj: any, field: string) => (obj[field] = IsNull()),
    isNotNull: (obj: any, field: string) => (obj[field] = Not(IsNull())),
  },
  array: {
    eq: (obj: any, field: string, value: any[]) => (obj[field] = value),
    in: (obj: any, field: string, value: any[]) => (obj[field] = In(value)),
    contains: (obj: any, field: string, value: any[]) => (obj[field] = In(value)),
    nin: (obj: any, field: string, value: any[]) => (obj[field] = Not(In(value))),
    any: (obj: any, field: string, value: any[]) => (obj[field] = Any(value)),
    isNull: (obj: any, field: string) => (obj[field] = IsNull()),
    isNotNull: (obj: any, field: string) => (obj[field] = Not(IsNull())),
    between: (obj: any, field: string, values: any[]) => {
      if (values.filter((c) => c !== undefined && c !== null).length === 2) {
        obj[field] = Between(values[0], values[1]);
        return;
      }
      if (values[0] !== undefined && values[0] !== null) obj[field] = MoreThanOrEqual(values[0]);
      if (values[1] !== undefined && values[1] !== null) obj[field] = LessThanOrEqual(values[1]);
    },
  },
};

export const getQueryBuilder = (type: keyof typeof queryFor, operand: Operand) => {
  if (!queryFor[type][operand]) throw new Error('unsupported');
  return queryFor[type][operand];
};
