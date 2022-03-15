import { Router } from 'express';
import EnderecosController from '../controllers/EnderecosController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
const enderecosRouter = Router();
const enderecosController = new EnderecosController();

enderecosRouter.get('/', isAuthenticated, enderecosController.index);

// enderecosRouter.get(
//   '/:codigoEndereco',
//   isAuthenticated,
//   celebrate({
//     [Segments.PARAMS]: {
//       codigoEndereco: Joi.string().uuid().required(),
//     },
//   }),
//   enderecosController.show,
// );

// enderecosRouter.get(
//   '/pessoa/:codigo_pessoa',
//   isAuthenticated,
//   celebrate({
//     [Segments.PARAMS]: {
//       codigo_pessoa: Joi.string().uuid().required(),
//     },
//   }),
//   enderecosController.showEnderecoPessoa,
// );

enderecosRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object({
      codigoPessoa: Joi.string().uuid().required(),
      codigoBairro: Joi.string().uuid().required(),
      nomeRua: Joi.string().required(),
      numero: Joi.number().required(),
      complemento: Joi.string().required(),
      cep: Joi.string().required(),
    }),
  }),
  enderecosController.create,
);

enderecosRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      codigoEndereco: Joi.string().uuid().required(),
      codigoPessoa: Joi.string().uuid().required(),
      codigoBairro: Joi.string().uuid().required(),
      nomeRua: Joi.string().required(),
      numero: Joi.number().required(),
      complemento: Joi.string().required(),
      cep: Joi.string().required(),
    },
  }),
  enderecosController.update,
);

enderecosRouter.delete(
  '/:codigoEndereco',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoEndereco: Joi.string().uuid().required(),
    },
  }),
  enderecosController.delete,
);

export default enderecosRouter;
