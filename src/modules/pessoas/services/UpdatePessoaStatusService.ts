import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import PessoasRepository from '../typeorm/repositories/PessoasRepository';
interface IRequest {
  codigo_pessoa: string;
}
class UpdatePessoaService {
  public async execute({ codigo_pessoa }: IRequest): Promise<Pessoa> {
    const pessoasRepository = getCustomRepository(PessoasRepository);
    const pessoa = await pessoasRepository.findById(codigo_pessoa);
    if (!pessoa) {
      throw new AppError('Pessoa nao encontrada.', 404);
    }

    pessoa.status = pessoa.status == 1 ? 2 : 1;
    await pessoasRepository.save(pessoa);
    return pessoa;
  }
}

export default UpdatePessoaService;
