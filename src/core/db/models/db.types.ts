export type Operand =
  | 'eq'
  | 'neq'
  | 'lte'
  | 'lt'
  | 'gte'
  | 'gt'
  | 'in'
  | 'nin'
  | 'not'
  | 'starts'
  | 'ends'
  | 'contains'
  | 'isNull'
  | 'isNotNull'
  | 'any'
  | 'between';

export type TextFilter = 'in' | 'eq' | 'starts' | 'ends';
