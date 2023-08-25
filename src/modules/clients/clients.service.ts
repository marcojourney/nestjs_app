import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { BaseService } from 'src/cores/base.service';

@Injectable()
export class ClientsService extends BaseService {
  constructor(
    @InjectRepository(Client) private readonly clientRepository: Repository<Client>,
    private jwtService: JwtService,
    ) {
      super();
    }

  async create(createClientDto: CreateClientDto) {
    const secret = process.env.JWT_ACCESS_SECRET;
    const appId = crypto.randomBytes(32).toString('hex');
    const appSecret = crypto.randomBytes(32).toString('hex');

    const payload = {
      appId,
      appSecret,
    };

    const token = await this.jwtService.signAsync(
      payload,
      {
        secret,
        expiresIn: '30m'
      },
    );

    await this.clientRepository.insert({
      ...createClientDto,
      appId,
      appSecret
    });

    return {
      name: createClientDto.name,
      appId,
      appSecret,
      token
    };
  }

  signIn(appId: string, appSecret: string) {
    const token = Buffer.from(`${appId}:${appSecret}`).toString('base64');
    return token;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return this.responseSuccess();
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
