import { Router } from 'express'
import {celebrate, Joi} from 'celebrate'

import groupsControl from './controllers/groups'
import productsControl from './controllers/products'
import fabricsControl from './controllers/fabrics'
import providersControl from './controllers/providers'

const routes = Router()

routes.get('/groups', groupsControl.index)
routes.post('/groups', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required()
    }).required()
}), groupsControl.create)

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
        price: Joi.number().positive().precision(2).default(null)
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
        price: Joi.number().positive().precision(2).default(null)
    }).required()
}, {abortEarly: false}), productsControl.update)
routes.delete('/products/:id', productsControl.delete)

routes.get('/providers', providersControl.index)
routes.post('/providers', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        tax: Joi.number().positive().precision(2).required()
    }).required()
}, {abortEarly: false}), providersControl.create)
routes.put('/providers/:id', celebrate({
    body: Joi.object().keys({
        name: Joi.string(),
        tax: Joi.number().precision(2)
    }).required()
}, {abortEarly: false}), providersControl.update)
routes.delete('/providers/:id', providersControl.delete)

routes.get('/fabrics', celebrate({
    query: Joi.object().keys({
        provider_id: Joi.number().positive().integer()
    })
}), fabricsControl.index)
routes.post('/fabrics', celebrate({
    body: Joi.object().keys({
        provider_id: Joi.number().positive().integer().required(),
        name: Joi.string().required(),
        grammage: Joi.number().positive().default(null).precision(3),
        price: Joi.number().positive().precision(2).required()
    }).required()
}, {abortEarly: false}), fabricsControl.create)
routes.put('/fabrics/:id', celebrate({
    body: Joi.object().keys({
        provider_id: Joi.number().positive().integer(),
        name: Joi.string(),
        grammage: Joi.number().positive().precision(3),
        price: Joi.number().positive().precision(2)
    }).required()
}, {abortEarly: false}), fabricsControl.update)
routes.delete('/fabrics/:id', fabricsControl.delete)

export default routes