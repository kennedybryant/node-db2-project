const Car = require('./cars-model')

const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if (!car) {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`
      })
    } else {
      req.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  try {
    if (!req.body.vin) {
      res.status(400).json({
        message: 'vin is missing'
      })
    } else if (!req.body.make) {
      res.status(400).json({
        message: 'make is missing'
      })
    } else if (!req.body.model) {
      res.status(400).json({
        message: 'model is missing'
      })
    } else if (!req.body.mileage) {
      res.status(400).json({
        message: 'mileage is missing'
      })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
  
}

const checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)) {
    next()
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await Car.getByVin(req.body.vin)
    if (!existing) {
      next()
    } else {
      next({ status: 400, message: `vin ${req.body.vin} already exists`})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}