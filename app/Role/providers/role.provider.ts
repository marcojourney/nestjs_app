
/**
 * File: Role.provider.ts
 * Description: This TypeScript file contains example code.
 * Author: Unknown
 * Created At: October 15, 2023
*/
import { 
   getDataSourceToken, 
   getRepositoryToken, 
   InjectRepository
   } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { Role } from '../entities';
import { RoleRepositoryMethods } from '../repositories';

export const RoleRepositoryProvider = {
  provide: getRepositoryToken(Role),
  inject: [getDataSourceToken()],
  useFactory(dataSource: DataSource) {
    return dataSource.getRepository(Role).extend(RoleRepositoryMethods);
  }
};

export const InjectRoleRepository = () => InjectRepository(Role);
