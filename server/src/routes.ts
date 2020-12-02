import { Router } from 'express'
import {celebrate, Joi} from 'celebrate'

import groupsControl from './controllers/groups'
import productsControl from './controllers/products'
import fabricsControl from './controllers/fabrics'
import providersControl from './controllers/providers'
import pricesControl from './controllers/prices'

const routes = Router()

routes.get('/groups', groupsControl.index)
routes.post('/groups', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        desired: Joi.number().positive().required(),
        minimum: Joi.number().positive().required()
    }).required()
}), groupsControl.create)
routes.put('/groups/:id', celebrate({
    body: Joi.object().keys({
        name: Joi.string(),
        desired: Joi.number().positive(),
        minimum: Joi.number().positive(),
    }).required()
}, {abortEarly: false}), groupsControl.update)
routes.delete('/groups/:id', groupsControl.delete)

routes.get('/products', productsControl.index)
routes.get('/products/:id', productsControl.show)
routes.post('/products', celebrate({
    body: Joi.object().keys({
        ref: Joi.string().required(),
        group_id: Joi.number().integer().positive().required(),
        name: Joi.string().required(),
        costs: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            value: Joi.number().positive().precision(2).required()
        })).min(1),
        fabrics: Joi.array().items(Joi.object().keys({
            fabric_id: Joi.number().positive().integer().required(),
            efficiency: Joi.number().positive().precision(3).required(),
        })).min(1),
        prices: Joi.array().items(Joi.object().keys({
            price_id: Joi.number().positive().integer().required(),
            value: Joi.number().positive().precision(2).required(),
        })),
    }).required()
}, {abortEarly: false}), productsControl.create)
routes.put('/products/:id', celebrate({
    body: Joi.object().keys({
        ref: Joi.string(),
        group_id: Joi.number().integer().positive(),
        name: Joi.string(),
        costs: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            value: Joi.number().positive().precision(2).required()
        })).min(1),
        fabrics: Joi.array().items(Joi.object().keys({
            fabric_id: Joi.number().positive().integer().required(),
            efficiency: Joi.number().positive().precision(3).required(),
        })).min(1),
        prices: Joi.array().items(Joi.object().keys({
            price_id: Joi.number().positive().integer().required(),
            value: Joi.number().positive().precision(2).required(),
        }))
    }).required()
}, {abortEarly: false}), productsControl.update)
routes.delete('/products/:id', productsControl.delete)

routes.get('/providers', providersControl.index)
routes.post('/providers', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        tax: Joi.number().integer().min(0).required()
    }).required()
}, {abortEarly: false}), providersControl.create)
routes.put('/providers/:id', celebrate({
    body: Joi.object().keys({
        name: Joi.string(),
        tax: Joi.number().integer().min(0)
    }).required()
}, {abortEarly: false}), providersControl.update)
routes.delete('/providers/:id', providersControl.delete)

routes.get('/fabrics', fabricsControl.index)
routes.post('/fabrics', celebrate({
    body: Joi.object().keys({
        provider_id: Joi.number().positive().integer().required(),
        name: Joi.string().required(),
        width: Joi.number().positive().required(),
        grammage: Joi.number().positive().integer().required(),
        price: Joi.number().positive().precision(2).required()
    }).required()
}, {abortEarly: false}), fabricsControl.create)
routes.put('/fabrics/:id', celebrate({
    body: Joi.object().keys({
        provider_id: Joi.number().positive().integer(),
        name: Joi.string(),
        width: Joi.number().positive(),
        grammage: Joi.number().positive().integer(),
        price: Joi.number().positive().precision(2)
    }).required()
}, {abortEarly: false}), fabricsControl.update)
routes.delete('/fabrics/:id', fabricsControl.delete)

routes.get('/prices', pricesControl.index)
routes.get('/prices/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().positive().integer().required()
    }).required()
}, {abortEarly: false}), pricesControl.show)
routes.post('/prices', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        expected: Joi.number().positive().required(),
        default: Joi.boolean()
    }).required()
}, {abortEarly: false}), pricesControl.create)
routes.put('/prices/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().positive().integer().required()
    }).required(),
    body: Joi.object().keys({
        name: Joi.string(),
        expected: Joi.number().positive(),
        default: Joi.boolean()
    }).required()
}, {abortEarly: false}), pricesControl.update)
routes.delete('/prices/:id', celebrate({
    params: Joi.object().keys({
        id: Joi.number().positive().integer().required()
    }).required()
}, {abortEarly: false}), pricesControl.delete)

export default routes