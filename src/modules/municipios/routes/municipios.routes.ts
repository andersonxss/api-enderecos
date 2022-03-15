import { Router } from 'express';
import MunicipiosController from '../controllers/MunicipiosController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
const municipiosRouter = Router();
const municipiosController = new MunicipiosController();

municipiosRouter.get('/', isAuthenticated, municipiosController.index);

municipiosRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      codigoUF: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  municipiosController.create,
);

municipiosRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      codigoMunicipio: Joi.string().uuid().required(),
      codigoUF: Joi.string().uuid().required(),
      nome: Joi.string().required(),
      status: Joi.number().required(),
    },
  }),
  municipiosController.update,
);

municipiosRouter.put(
  '/status/:codigoMunicipio',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoMunicipio: Joi.string().uuid().required(),
    },
  }),
  municipiosController.updateStatus,
);

municipiosRouter.delete(
  '/:codigoMunicipio',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      codigoMunicipio: Joi.string().uuid().required(),
    },
  }),
  municipiosController.delete,
);

export default municipiosRouter;
