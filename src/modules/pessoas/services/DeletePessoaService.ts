import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import PessoasRepository from '../typeorm/repositories/PessoasRepository';
interface IRequest {
  codigo_pessoa: string;
}
class DeletePessoaService {
  public async execute({ codigo_pessoa }: IRequest): Promise<void> {
    const pessoasRepository = getCustomRepository(PessoasRepository);
    const municipio = await pessoasRepository.findOne(codigo_pessoa);
    if (!municipio) {
      throw new AppError('Pessoa nao encontrada.', 404);
    }
    await pessoasRepository.remove(municipio);
  }
}

export default DeletePessoaService;
