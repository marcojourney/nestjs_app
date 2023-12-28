import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RolesModule } from 'src/modules/roles/roles.module';
import { RolesService } from 'src/modules/roles/roles.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { RolesController } from 'src/modules/roles/roles.controller';
import { CreateRoleDto } from 'src/modules/roles/dto/create-role.dto';
import { UpdateRoleDto } from 'src/modules/roles/dto/update-role.dto';
import { Util } from '@helpers/util.helper';

describe('RoleController (e2e)', () => {
  let app: INestApplication;
  let controller: RolesController;

  const rolesService = {
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockRoleRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RolesModule],
    })
      .overrideProvider(RolesService)
      .useValue(rolesService)
      .overrideProvider(getRepositoryToken(Role))
      .useValue(mockRoleRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    controller = moduleFixture.get<RolesController>(RolesController);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be define', () => {
    expect(controller).toBeDefined();
  });

  describe('/roles (GET)', () => {
    jest.spyOn(rolesService, 'findAll');

    it('should be define', () => {
      expect(rolesService.findAll).toBeDefined();
    });

    it('should call service.findAll', () => {
      controller.findAll();
      Util.getInstance().helloWorld();
      expect(rolesService.findAll).toBeCalledTimes(1);
    });

    it('/GET roles', () => {
      return request(app.getHttpServer()).get('/roles').expect(200);
    });

    it('/roles/:id (GET)', () => {
      const roleId = 1;
      request(app.getHttpServer()).get(`/roles/${roleId}`).expect(200);
    });
  });

  describe('/roles (POST)', () => {
    jest.spyOn(rolesService, 'create');

    it('should be defined', () => {
      expect(rolesService.create).toBeDefined();
    });

    it('should call service.create', () => {
      controller.create({} as CreateRoleDto);
      expect(rolesService.create).toBeCalledTimes(1);
    });
  });

  describe('/roles (PUT)', () => {
    jest.spyOn(rolesService, 'update');

    it('should be defined', () => {
      expect(rolesService.update).toBeDefined();
    });

    it('should call the database', () => {
      rolesService.update({} as UpdateRoleDto);
      expect(rolesService.update).toBeCalledTimes(1);
    });
  });

  describe('/roles (DELETE)', () => {
    jest.spyOn(rolesService, 'delete');

    it('should be defined', () => {
      expect(rolesService.delete).toBeDefined();
    });

    it('should call the database', () => {
      rolesService.delete(1);
      expect(rolesService.delete).toBeCalledTimes(1);
    });
  });
});

const baseURL = 'http://localhost:3000/';
describe('Role', () => {
  const apiRequest = request(baseURL);

  describe('GET: roles', () => {
    it('should have the response', async () => {
      const response = await apiRequest.get('roles');
      expect(response.status).toBe(200);
    });
  });

  describe('GET: roles/:id', () => {
    it('should have the response', async () => {
      const response = await apiRequest.get('roles/1');
      expect(response.status).toBe(200);
    });
  });

  describe('POST: roles', () => {
    it('should have the response', async () => {
      const response = await apiRequest.post('roles').send({ name: 'Staff' });
      expect(response.status).toBe(201);
    });
  });

  describe('PUT: roles/:id', () => {
    it('should have the response', async () => {
      const response = await apiRequest.put('roles').send({ name: 'Staff' });
      expect(response.status).toBe(201);
    });
  });
});
