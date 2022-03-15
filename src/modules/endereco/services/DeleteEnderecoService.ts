import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import EnderecosRepository from '../typeorm/repositories/EnderecosRepository';
interface IRequest {
  codigoEndereco: string;
}
class DeleteEnderecoService {
  public async execute({ codigoEndereco }: IRequest): Promise<void> {
    const enderecoRepository = getCustomRepository(EnderecosRepository);
    const endereco = await enderecoRepository.findOne(codigoEndereco);
    if (!endereco) {
      throw new AppError('Endereco nao encontrado.', 404);
    }
    await enderecoRepository.remove(endereco);
  }
}

export default DeleteEnderecoService;
