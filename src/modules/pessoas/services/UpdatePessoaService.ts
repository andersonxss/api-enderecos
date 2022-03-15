import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import PessoasRepository from '../typeorm/repositories/PessoasRepository';
interface IRequest {
  codigo_pessoa: string;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}
class UpdatePessoaService {
  public async execute({
    codigo_pessoa,
    nome,
    sobrenome,
    idade,
    login,
    senha,
    status,
  }: IRequest): Promise<Pessoa> {
    const pessoasRepository = getCustomRepository(PessoasRepository);

    const pessoa = await pessoasRepository.findById(codigo_pessoa);

    if (!pessoa) {
      throw new AppError('Pessoa nao encontrada.', 404);
    }

    pessoa.nome = nome;
    pessoa.sobrenome = sobrenome;
    pessoa.idade = idade;
    pessoa.login = login;
    pessoa.senha = senha;
    pessoa.status = status;
    await pessoasRepository.save(pessoa);
    return pessoa;
  }
}

export default UpdatePessoaService;
