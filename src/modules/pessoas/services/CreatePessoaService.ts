import AppError from '@shared/http/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import PessoasRepository from '../typeorm/repositories/PessoasRepository';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

class CreatePessoaService {
  public async execute({
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: IRequest): Promise<Pessoa> {
    const pessoasRepository = getCustomRepository(PessoasRepository);
    const pessoaExists = await pessoasRepository.findByLogin(login);

    if (pessoaExists) {
      throw new AppError(
        'Já existe uma pessoa cadastrada com esse login.',
        404,
      );
    }

    const hashedPassWord = await hash(senha, 8);
    const pessoa = pessoasRepository.create({
      nome,
      sobrenome,
      idade,
      login,
      senha: hashedPassWord,
      status,
    });

    await pessoasRepository.save(pessoa);
    return pessoa;
  }
}

export default CreatePessoaService;
