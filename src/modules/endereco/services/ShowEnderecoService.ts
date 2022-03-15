import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import EnderecosRepository from '../typeorm/repositories/EnderecosRepository';
interface IRequest {
  codigoEndereco: string;
}
interface IDados {
  codigoEndereco: string;
  codigoPessoa: string;
  codigoBairro: string;
  nome_rua: string;
  numero: number;
  complemento: string;
  cep: string;
}
class ShowEnderecoService {
  public async execute({
    codigoEndereco,
  }: IRequest): Promise<IDados | Endereco> {
    const enderecosRepository = getCustomRepository(EnderecosRepository);
    const endereco = await enderecosRepository.findOne(codigoEndereco);
    if (!endereco) {
      throw new AppError('Endereco nao encontrada.', 404);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: any = {
      codigoEndereco: endereco.codigo_endereco,
      codigoPessoa: endereco.codigo_pessoa,
      codigoBairro: endereco.codigo_bairro,
      nomeRua: endereco.nome_rua,
      numero: endereco.numero,
      complemento: endereco.complemento,
      cep: endereco.cep,
    };
    return dados;
  }
}

export default ShowEnderecoService;
