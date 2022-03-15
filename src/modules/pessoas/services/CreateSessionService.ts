import AppError from '@shared/http/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import PessoasRepository from '../typeorm/repositories/PessoasRepository';
import authConfig from '@config/auth';

interface IRequest {
  login: string;
  senha: string;
}

interface IResponse {
  pessoa: Pessoa;
  token: string;
}

class CreateSessionService {
  public async execute({ login, senha }: IRequest): Promise<IResponse> {
    const pessoaRepository = getCustomRepository(PessoasRepository);

    const pessoa = await pessoaRepository.findByLogin(login);

    if (!pessoa) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const senhaConfirmed = await compare(senha, pessoa.senha);

    if (!senhaConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: pessoa.codigo_pessoa,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { pessoa, token };
  }
}

export default CreateSessionService;
