const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body
  const nameLength = name.trim().length

  if(!name || !budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (nameLength < 3 || nameLength > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof budget !== 'number') {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    next()
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
