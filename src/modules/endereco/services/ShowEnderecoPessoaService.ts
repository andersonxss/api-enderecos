import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
import EnderecosRepository from '../typeorm/repositories/EnderecosRepository';
interface IRequest {
  codigoPessoa: string;
}
class ShowEnderecoService {
  public async execute({ codigoPessoa }: IRequest): Promise<Endereco[]> {
    const enderecosRepository = getCustomRepository(EnderecosRepository);

    const enderecopessoa = await enderecosRepository.findByIdPessoa(
      codigoPessoa,
    );
    if (!enderecopessoa.length) {
      throw new AppError(
        'Endereco nao encontrado que estaja relacionado com essa pessoa.',
        404,
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = enderecopessoa.map(elem => {
      return {
        codigoEndereco: elem.codigo_endereco,
        codigoBairro: elem.codigo_bairro,
        codigoPessoa: elem.codigo_pessoa,
        nomeRua: elem.nome_rua,
        numero: elem.numero,
        complemento: elem.complemento,
        cep: elem.cep,
        bairro: {
          codigoBairro: elem.bairros.codigo_bairro,
          codigoMunicipio: elem.bairros.codigo_municipio,
          nome: elem.bairros.nome,
          status: elem.bairros.status,
          municipio: {
            codigoMunicipio: elem.bairros.municipios.codigo_municipio,
            codigoUF: elem.bairros.municipios.codigo_uf,
            nome: elem.bairros.municipios.nome,
            status: elem.bairros.municipios.status,
            uf: {
              codigoUF: elem.bairros.municipios.ufs.codigo_uf,
              nome: elem.bairros.municipios.ufs.nome,
              sigla: elem.bairros.municipios.ufs.sigla,
              status: elem.bairros.municipios.ufs.status,
            },
          },
        },
      };
    });

    return dados;
  }
}

export default ShowEnderecoService;
