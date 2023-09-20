import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

describe('RolesController', () => {
  let controller: RolesController;

  const mockRolesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: RolesService,
          useValue: mockRolesService,
        },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create => should create a new role by a given data', async () => {
    const createRoleDto = {
      name: 'Admin',
    } as CreateRoleDto;

    const role = {
      id: Date.now(),
      name: 'Admin',
    } as Role;

    jest.spyOn(mockRolesService, 'create').mockReturnValue(role);

    const result = await controller.create(createRoleDto);

    expect(mockRolesService.create).toBeCalled();
    expect(mockRolesService.create).toBeCalledWith(createRoleDto);

    expect(result).toEqual(role);
  });

  it('findAll => should return an array of role', async () => {
    //arrange
    const role = {
      id: Date.now(),
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };
    const roles = [role];
    jest.spyOn(mockRolesService, 'findAll').mockReturnValue(roles);

    //act
    const result = await controller.findAll();

    // assert
    expect(result).toEqual(roles);
    expect(mockRolesService.findAll).toBeCalled();
  });

  it('findOne => should find a role by a given id and return its data', async () => {
    //arrange
    const id = '1';
    const role = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockRolesService, 'findOne').mockReturnValue(role);

    //act
    const result = await controller.findOne(+id);

    expect(result).toEqual(role);
    expect(mockRolesService.findOne).toBeCalled();
    expect(mockRolesService.findOne).toBeCalledWith(+id);
  });

  it('update => should find a role by a given id and update its data', async () => {
    //arrange
    const id = 1;
    const updateRoleDto = {
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    } as UpdateRoleDto;
    const role = {
      id: 1,
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockRolesService, 'update').mockReturnValue(role);

    //act
    const result = await controller.update(id, updateRoleDto);

    expect(result).toEqual(role);
    expect(mockRolesService.update).toBeCalled();
    expect(mockRolesService.update).toBeCalledWith(+id, updateRoleDto);
  });

  it('remove => should find a role by a given id, remove and then return Number of affected rows', async () => {
    const id = 1;
    const role = {
      id: 1,
      name: 'Admin',
    };

    jest.spyOn(mockRolesService, 'remove').mockReturnValue(role);

    //act
    const result = await controller.remove(id);

    expect(result).toEqual(role);
    expect(mockRolesService.remove).toBeCalled();
    expect(mockRolesService.remove).toBeCalledWith(+id);
  });
});
