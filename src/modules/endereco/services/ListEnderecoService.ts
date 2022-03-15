import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import EnderecosRepository from '../typeorm/repositories/EnderecosRepository';

class ListEnderecoService {
  public async execute(): Promise<Endereco[]> {
    const enderecosRepository = getCustomRepository(EnderecosRepository);
    const endereco = await enderecosRepository.find();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = endereco.map(elem => {
      return {
        codigoEndereco: elem.codigo_endereco,
        codigoPessoa: elem.codigo_pessoa,
        codigoBairro: elem.codigo_bairro,
        nomeRua: elem.nome_rua,
        numero: elem.numero,
        complemento: elem.complemento,
        cep: elem.cep,
      };
    });

    return dados;
  }
}

export default ListEnderecoService;
