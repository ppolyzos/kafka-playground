export interface BaseDbCriteria {
  excludeIds?: string[];
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}
