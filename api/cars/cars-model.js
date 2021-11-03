const db = require('../../data/db-config')

const getAll = () => {
  const result = db('cars')
  return result
}

const getById = (id) => {
  const result = db('cars').where('id', id).first()
  return result
}

const getByVin = (vin) => {
  const result = db('cars').where('vin', vin).first()
  return result
}

const create = (carData) => {
  return db('cars').insert(carData).then(([id]) => {
    return getById(id)
  })
}
module.exports = {
  getAll,
  getById,
  getByVin,
  create
}