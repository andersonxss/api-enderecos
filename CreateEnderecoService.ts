// import AppError from '@shared/http/errors/AppError';
import { getConnection } from 'typeorm';
import Endereco from '../typeorm/entities/Endereco';
//import EnderecosRepository from '../typeorm/repositories/EnderecosRepository';

interface IEndereco {
  codigo_pessoa: string;
  codigo_bairro: string;
  nome_rua: string;
  numero: number;
  complemento: string;
  cep: string;
}

interface IRequest {
  enderecos: IEndereco[];
}
class CreateEnderecoService {
  public async execute({ enderecos }: IRequest) {
    if (enderecos.length > 0) {
      return await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Endereco)
        .values(enderecos)
        .execute();
    }
    //const enderecosRepository = getCustomRepository(EnderecosRepository);
    // const municipioExists = await enderecosRepository.findByNome(nome);
    // if (municipioExists) {
    //   throw new AppError('Já existe um municipio cadastrado com esse nome.');
    // }
    // const endereco = enderecos.map(elem => {
    //   const {
    //     codigo_pessoa,
    //     codigo_bairro,
    //     nome_rua,
    //     numero,
    //     complemento,
    //     cep,
    //   } = elem;

    //   const dados = enderecosRepository.create({
    //     codigo_pessoa,
    //     codigo_bairro,
    //     nome_rua,
    //     numero,
    //     complemento,
    //     cep,
    //   });
    //   return enderecosRepository.save(dados);
    // });

    //return endereco;
  }
}

export default CreateEnderecoService;
