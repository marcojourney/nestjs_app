import { tuple } from '@core/type';

export const StatusEnum = tuple('ACTIVE', 'INACTIVE');
export type StatusType = (typeof StatusEnum)[number];