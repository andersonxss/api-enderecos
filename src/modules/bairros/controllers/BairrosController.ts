import { Request, Response } from 'express';
import CreateBairroService from '../services/CreateBairroService';
import DeleteBairroService from '../services/DeleteBairroService';
import ListBairrotService from '../services/ListBairroService';
import ShowBairroService from '../services/ShowBairroService';
import ShowBairroMunicipioService from '../services/ShowBairroMunicipioService';
import UpdateBairroService from '../services/UpdateBairroService';
import UpdateBairroStatusService from '../services/UpdateBairroStatusService';

class BairrosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBairros = new ListBairrotService();
    const showBairro = new ShowBairroService();
    const showBairroMunicipio = new ShowBairroMunicipioService();
    const { codigoBairro, codigoMunicipio } = request.query as never;

    let bairros;
    if (codigoBairro !== undefined && codigoMunicipio !== undefined) {
      //Se codigoBairro ou  codigoMunicipio for diferente de undefined, deve-se buscar pelo id
      bairros = await showBairro.execute({ codigoBairro });
    } else if (codigoBairro !== undefined) {
      //Se codigoMunicipio  for diferente de undefined, deve-se pelo por id
      bairros = await showBairro.execute({ codigoBairro });
    } else if (codigoMunicipio !== undefined) {
      //Se codigoMunicipio for diferente de undefined, deve-se buscar pela codigoMunicipio
      bairros = await showBairroMunicipio.execute({ codigoMunicipio });
    } else {
      //Se não existir parâmetro, deve-se buscar todas Ufs
      bairros = await listBairros.execute();
    }

    return response.json(bairros);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { codigoMunicipio, nome, status } = request.body;
    const createBairro = new CreateBairroService();
    const codigo_municipio = codigoMunicipio;
    await createBairro.execute({ codigo_municipio, nome, status });
    const listBairros = new ListBairrotService();
    const bairros = await listBairros.execute();
    return response.json(bairros);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { codigoBairro, codigoMunicipio, nome, status } = request.body;

    const updateBairro = new UpdateBairroService();
    await updateBairro.execute({
      codigoBairro,
      codigoMunicipio,
      nome,
      status,
    });
    const listBairros = new ListBairrotService();
    const bairros = await listBairros.execute();
    return response.json(bairros);
  }

  public async updateStatus(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { codigoBairro } = request.params;
    const updateBairro = new UpdateBairroStatusService();
    const bairro = await updateBairro.execute({
      codigoBairro,
    });
    return response.json(bairro);
  }

  public async delete(request: Request, response: Response) {
    const { codigoBairro } = request.params;
    const deleteBairro = new DeleteBairroService();
    await deleteBairro.execute({ codigoBairro });
    const listBairros = new ListBairrotService();
    const bairros = await listBairros.execute();
    return response.json(bairros);
  }
}

export default BairrosController;
