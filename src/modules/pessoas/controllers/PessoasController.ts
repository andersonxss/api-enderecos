import { Request, Response } from 'express';
import CreatePessoaService from '../services/CreatePessoaService';
import CreateEnderecoService from '../../endereco/services/CreateEnderecoService';
import UpdateEnderecoService from '../../endereco/services/UpdateEnderecoService';
import ShowEnderecoPessoaService from '../../endereco/services/ShowEnderecoPessoaService';
import CheckEnderecoPessoaService from '../../endereco/services/CheckEnderecoPessoaService';
import DeletePessoaService from '../services/DeletePessoaService';
import ListPessoatService from '../services/ListPessoaService';
import ShowPessoaService from '../services/ShowPessoaService';
import UpdatePessoaService from '../services/UpdatePessoaService';
import UpdatePessoaStatusService from '../services/UpdatePessoaStatusService';

class PessoasController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listPessoas = new ListPessoatService();
    const showPessoa = new ShowPessoaService();

    const { codigoPessoa } = request.query as never;

    let pessoas;
    if (codigoPessoa !== undefined) {
      //Se codigopessoa for diferente de undefined, deve-se buscar pelo codigopessoa
      pessoas = await showPessoa.execute({ codigoPessoa });
    } else {
      pessoas = await listPessoas.execute();
    }

    return response.json(pessoas);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, sobrenome, idade, login, senha, enderecos, status } =
      request.body;
    const createPessoa = new CreatePessoaService();
    const createEnderecoService = new CreateEnderecoService();
    const listPessoas = new ListPessoatService();

    const pessoa = await createPessoa.execute({
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    if (pessoa && enderecos !== undefined) {
      //adicionando o codigo da pessoa cadastrada para serem relacionada com a tabela de endereco
      await enderecos.map(
        (elem: {
          codigoBairro: string;
          nomeRua: string;
          numero: number;
          complemento: string;
          cep: string;
        }) => {
          const codigo_pessoa = pessoa.codigo_pessoa;
          const codigo_bairro = elem.codigoBairro;
          const nome_rua = elem.nomeRua;
          const numero = elem.numero;
          const complemento = elem.complemento;
          const cep = elem.cep;

          createEnderecoService.execute({
            codigo_pessoa,
            codigo_bairro,
            nome_rua,
            numero,
            complemento,
            cep,
          });
        },
      );
    }
    const pessoas = await listPessoas.execute();
    return response.json(pessoas);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updatePessoa = new UpdatePessoaService();
    const createEnderecoService = new CreateEnderecoService();
    const updateEnderecoService = new UpdateEnderecoService();
    const checkEnderecoPessoaService = new CheckEnderecoPessoaService();
    const showPessoaEnderecos = new ShowEnderecoPessoaService();
    const {
      codigoPessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
      enderecos,
    } = request.body;

    const codigo_pessoa = codigoPessoa;
    let checkStatusEndereco;
    const pessoaEnderecos = await showPessoaEnderecos.execute({
      codigoPessoa,
    });

    const pessoa = await updatePessoa.execute({
      codigo_pessoa,
      nome,
      sobrenome,
      idade,
      login,
      senha,
      status,
    });

    if (pessoa && enderecos !== undefined) {
      //adicionando o codigo da pessoa cadastrada para serem relacionada com a tabela de endereco
      enderecos.map(
        async (elem: {
          codigoEndereco: string;
          codigoBairro: string;
          codigoPessoa: string;
          nomeRua: string;
          numero: number;
          complemento: string;
          cep: string;
        }) => {
          const codigo_endereco = elem.codigoEndereco;
          const codigo_bairro = elem.codigoBairro;
          const codigo_pessoa = pessoa.codigo_pessoa;
          const nome_rua = elem.nomeRua;
          const numero = elem.numero;
          const complemento = elem.complemento;
          const cep = elem.cep;

          // se existir dados no codigo_endereco, os dados serao atualizado, se nao, sera adicionado mais um endereco para o usuario
          if (codigo_endereco == undefined || codigo_endereco == '') {
            await createEnderecoService.execute({
              codigo_pessoa,
              codigo_bairro,
              nome_rua,
              numero,
              complemento,
              cep,
            });
          } else {
            await updateEnderecoService.execute({
              codigo_endereco,
              codigo_pessoa,
              codigo_bairro,
              nome_rua,
              numero,
              complemento,
              cep,
            });
            checkStatusEndereco = true;
          }
        },
      );

      //Se status estiver como true, deve - se remover os enderecos nao esteja passado no parametro ENDERECOS
      if (checkStatusEndereco === true) {
        const endereco = pessoaEnderecos.filter(item => {
          if (
            enderecos.findIndex(
              (elem: { codigoEndereco: string }) =>
                elem.codigoEndereco === item.codigoEndereco,
            ) === -1
          ) {
            return item;
          }
        });
        //Se estiver valor maior que zero, deve-se remover os enderecos dessa lista
        if (endereco.length > 0) {
          await checkEnderecoPessoaService.execute(endereco);
        }
      }
    }

    const listPessoas = new ListPessoatService();
    const pessoas = await listPessoas.execute();

    return response.json(pessoas);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigo_pessoa } = request.params;
    const updatePessoaStatus = new UpdatePessoaStatusService();
    const pessoa = await updatePessoaStatus.execute({
      codigo_pessoa,
    });
    return response.json(pessoa);
  }

  public async delete(request: Request, response: Response) {
    const { codigo_pessoa } = request.params;
    const deletePessoa = new DeletePessoaService();
    await deletePessoa.execute({ codigo_pessoa });
    const listPessoas = new ListPessoatService();
    const pessoas = await listPessoas.execute();
    return response.json(pessoas);
  }
}

export default PessoasController;
