import { Router } from 'express';
import PessoasController from '../controllers/PessoasController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
const pessoasRouter = Router();
const pessoasController = new PessoasController();

pessoasRouter.get('/', isAuthenticated, pessoasController.index);

pessoasRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      idade: Joi.number().required(),
      login: Joi.string().required(),
      senha: Joi.string().required(),
      status: Joi.number().required(),
      enderecos: Joi.array(),
    },
  }),
  pessoasController.create,
);

pessoasRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      codigoEndereco: Joi.string(),
      codigoPessoa: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      sobrenome: Joi.string().required(),
      idade: Joi.number().required(),
      login: Joi.string().required(),
      senha: Joi.string().required(),
      status: Joi.number().required(),
      enderecos: Joi.array(),
    },
  }),
  pessoasController.update,
);

pessoasRouter.put(
  '/status/:codigoPessoa',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoPessoa: Joi.string().uuid().required(),
    },
  }),
  pessoasController.updateStatus,
);

pessoasRouter.delete(
  '/:codigoPessoa',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoPessoa: Joi.string().uuid().required(),
    },
  }),
  pessoasController.delete,
);

export default pessoasRouter;
