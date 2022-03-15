import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import EnderecosRepository from '../typeorm/repositories/EnderecosRepository';
interface IRequest {
  codigo_pessoa: string;
  codigo_bairro: string;
  nome_rua: string;
  numero: number;
  complemento: string;
  cep: string;
}

class CreateEnderecoService {
  public async execute({
    codigo_pessoa,
    codigo_bairro,
    nome_rua,
    numero,
    complemento,
    cep,
  }: IRequest): Promise<Endereco> {
    const enderecosRepository = getCustomRepository(EnderecosRepository);

    const endereco = enderecosRepository.create({
      codigo_pessoa,
      codigo_bairro,
      nome_rua,
      numero,
      complemento,
      cep,
    });

    await enderecosRepository.save(endereco);
    return endereco;
  }
}

export default CreateEnderecoService;
