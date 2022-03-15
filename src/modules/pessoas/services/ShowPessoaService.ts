import AppError from '@shared/http/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import PessoasRepository from '../typeorm/repositories/PessoasRepository';
interface IRequest {
  codigoPessoa: string;
}
class ShowPessoaService {
  public async execute({ codigoPessoa }: IRequest): Promise<Pessoa> {
    const pessoasRepository = getCustomRepository(PessoasRepository);
    const pessoa = await pessoasRepository.findOne(codigoPessoa, {
      relations: ['enderecos'],
    });
    if (!pessoa) {
      throw new AppError('Pessoa nao encontrada.', 404);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: any = {
      codigoPessoa: pessoa.codigo_pessoa,
      nome: pessoa.nome,
      sobrenome: pessoa.sobrenome,
      idade: pessoa.idade,
      login: pessoa.login,
      senha: pessoa.senha,
      status: pessoa.status,
      enderecos: pessoa.enderecos.map(endereco => {
        return {
          codigoEndereco: endereco.codigo_endereco,
          codigoBairro: endereco.codigo_bairro,
          codigoPessoa: endereco.codigo_pessoa,
          nomeRua: endereco.nome_rua,
          numero: endereco.numero,
          complemento: endereco.complemento,
          cep: endereco.cep,
          bairro: {
            codigoBairro: endereco.bairros.codigo_bairro,
            codigoMunicipio: endereco.bairros.codigo_municipio,
            nome: endereco.bairros.nome,
            status: endereco.bairros.status,
            municipio: {
              codigoMunicipio: endereco.bairros.municipios.codigo_municipio,
              codigoUF: endereco.bairros.municipios.codigo_uf,
              nome: endereco.bairros.municipios.nome,
              status: endereco.bairros.municipios.status,
              uf: {
                codigoUF: endereco.bairros.municipios.ufs.codigo_uf,
                nome: endereco.bairros.municipios.ufs.nome,
                sigla: endereco.bairros.municipios.ufs.sigla,
                status: endereco.bairros.municipios.ufs.status,
              },
            },
          },
        };
      }),
    };
    return dados;
  }
}

export default ShowPessoaService;
