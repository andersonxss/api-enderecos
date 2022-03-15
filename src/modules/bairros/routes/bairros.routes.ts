import { Router } from 'express';
import BairrosController from '../controllers/BairrosController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';

const municipiosRouter = Router();
const bairrosController = new BairrosController();

municipiosRouter.get('/', isAuthenticated, bairrosController.index);

municipiosRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      codigoMunicipio: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  bairrosController.create,
);

municipiosRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      codigoBairro: Joi.string().uuid().required(),
      codigoMunicipio: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  bairrosController.update,
);

municipiosRouter.put(
  '/status/:codigoBairro',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoBairro: Joi.string().uuid().required(),
    },
  }),
  bairrosController.updateStatus,
);

municipiosRouter.delete(
  '/:codigoBairro',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoBairro: Joi.string().uuid().required(),
    },
  }),
  bairrosController.delete,
);

export default municipiosRouter;
