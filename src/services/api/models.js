import Joi from 'joi'

export const timeSchema = Joi.object().keys({
  time: Joi.date()
})

export const tokenSchema = Joi.object().keys({
  token: Joi.string().required().trim().min(2).max(2560)
})

export const pushSchema = Joi.object().keys({
  title: Joi.string().required().trim().min(2).max(256),
  body: Joi.string().required().trim().min(2).max(2560),
  color: Joi.string().trim().min(4).max(7),
  ttl: Joi.number().positive(),
  badge: Joi.number().min(0).max(10000),
  payload: Joi.object()
})
