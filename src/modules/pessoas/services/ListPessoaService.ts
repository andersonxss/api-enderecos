import { getCustomRepository } from 'typeorm';
import Pessoa from '../typeorm/entities/Pessoa';
import PessoasRepository from '../typeorm/repositories/PessoasRepository';

class ListPessoaService {
  public async execute(): Promise<Pessoa[]> {
    const pessoasRepository = getCustomRepository(PessoasRepository);
    const pessoa = await pessoasRepository.find({
      relations: ['enderecos'],
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dados: Array<any> = pessoa.map(elem => {
      const codigoPessoa = elem.codigo_pessoa;

      return {
        codigoPessoa: codigoPessoa,
        nome: elem.nome,
        sobrenome: elem.sobrenome,
        idade: elem.idade,
        login: elem.login,
        senha: elem.senha,
        status: elem.status,
        enderecos: elem.enderecos.map(endereco => {
          return {
            codigoEndereco: endereco.codigo_endereco,
            codigoBairro: endereco.codigo_bairro,
            codigoPessoa: endereco.codigo_pessoa,
            nomeRua: endereco.nome_rua,
            numero: endereco.numero,
            complemento: endereco.complemento,
            cep: endereco.cep,
          };
        }),
      };
    });

    return dados;
  }
}

export default ListPessoaService;
