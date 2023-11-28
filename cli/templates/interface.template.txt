import * as T from '../common';

export interface FindOneOptions {
  id?: string;
  search?: string;
}

export interface FindAllOptions extends FindOneOptions {
  ids?: string[];
  attributes?: string[];

  // pagination
  limit?: number;
  offset?: number;
}