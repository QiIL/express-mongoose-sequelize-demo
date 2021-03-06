/**
 * 人类
 */
'use strict'

const { savePerson, findPerson, updatePerson } = require('../services/person')
const { personSchema } = require('../models/mongodb/person')
const { validate } = require('../services/body_validate')

module.exports = {
  find: async (req, res) => {
    try {
      let persons = await findPerson({})
      return res.json({ data: persons })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  create: async (req, res) => {
    try {
      let reqData = await validate(personSchema, req.body)
      let newPerson = await savePerson(reqData)
      return res.status(201).json({ data: newPerson })
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  update: async (req, res) => {
    try {
      let filter = { _id: req.params.id }
      let reqData = await validate(personSchema, req.body)
      console.log(reqData)
      let updated = await updatePerson(filter, reqData)
      return res.status(201).json({ data: updated })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: err.message })
    }
  }
}
