import { Request, Response } from 'express';
import CreateEnderecoService from '../services/CreateEnderecoService';
import UpdateEnderecoService from '../services/UpdateEnderecoService';
import ListEnderecoService from '../services/ListEnderecoService';
import ShowEnderecoService from '../services/ShowEnderecoService';
import ShowEnderecoPessoaService from '../services/ShowEnderecoPessoaService';
import DeleteEnderecoService from '../services/DeleteEnderecoService';

class EnderecosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listEnderecos = new ListEnderecoService();
    const enderecoShow = new ShowEnderecoService();
    const showEnderecoPessoa = new ShowEnderecoPessoaService();

    const { codigoEndereco, codigoPessoa } = request.query as never;

    let enderecos;
    if (codigoEndereco !== undefined && codigoPessoa !== undefined) {
      //Se codigoEnderecoa ou  codigoPessoa for diferente de undefined, deve-se buscar pelo id
      enderecos = await enderecoShow.execute({ codigoEndereco });
    } else if (codigoEndereco !== undefined) {
      //Se codigoPessoa  for diferente de undefined, deve-se pelo por id
      enderecos = await enderecoShow.execute({ codigoEndereco });
    } else if (codigoPessoa !== undefined) {
      //Se codigoPessoa for diferente de undefined, deve-se buscar pela codigoEndereco
      enderecos = await showEnderecoPessoa.execute({ codigoPessoa });
    } else {
      //Se não existir parâmetro, deve-se buscar todas endercos
      enderecos = await listEnderecos.execute();
    }

    return response.json(enderecos);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const listEnderecos = new ListEnderecoService();
    const { codigoPessoa, codigoBairro, nomeRua, numero, complemento, cep } =
      request.body;
    const createEndereco = new CreateEnderecoService();
    const codigo_pessoa = codigoPessoa;
    const codigo_bairro = codigoBairro;
    const nome_rua = nomeRua;
    await createEndereco.execute({
      codigo_pessoa,
      codigo_bairro,
      nome_rua,
      numero,
      complemento,
      cep,
    });
    const enderecos = await listEnderecos.execute();
    return response.json(enderecos);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const listEnderecos = new ListEnderecoService();
    const updateEndereco = new UpdateEnderecoService();
    const {
      codigoEndereco,
      codigoPessoa,
      codigoBairro,
      nomeRua,
      numero,
      complemento,
      cep,
    } = request.body;

    const codigo_endereco = codigoEndereco;
    const codigo_pessoa = codigoPessoa;
    const codigo_bairro = codigoBairro;
    const nome_rua = nomeRua;
    await updateEndereco.execute({
      codigo_endereco,
      codigo_pessoa,
      codigo_bairro,
      nome_rua,
      numero,
      complemento,
      cep,
    });
    const enderecos = await listEnderecos.execute();
    return response.json(enderecos);
  }

  public async delete(request: Request, response: Response) {
    const listEnderecos = new ListEnderecoService();
    const deleteEndereco = new DeleteEnderecoService();
    const { codigoEndereco } = request.params;
    await deleteEndereco.execute({ codigoEndereco });
    const enderecos = await listEnderecos.execute();
    return response.json(enderecos);
  }
}

export default EnderecosController;
