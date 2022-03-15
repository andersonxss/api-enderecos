import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import EnderecosRepository from '../typeorm/repositories/EnderecosRepository';
interface IRequest {
  codigo_endereco: string;
  codigo_pessoa: string;
  codigo_bairro: string;
  nome_rua: string;
  numero: number;
  complemento: string;
  cep: string;
}
class UpdateEnderecoService {
  public async execute({
    codigo_endereco,
    codigo_pessoa,
    codigo_bairro,
    nome_rua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<Endereco> {
    const enderecosRepository = getCustomRepository(EnderecosRepository);
    const endereco = await enderecosRepository.findById(codigo_endereco);
    if (!endereco) {
      throw new AppError('Endereco nao encontrada.', 404);
    }

    endereco.codigo_pessoa = codigo_pessoa;
    endereco.codigo_bairro = codigo_bairro;
    endereco.nome_rua = nome_rua;
    endereco.numero = numero;
    endereco.complemento = complemento;
    endereco.cep = cep;

    await enderecosRepository.save(endereco);
    return endereco;
  }
}

export default UpdateEnderecoService;
