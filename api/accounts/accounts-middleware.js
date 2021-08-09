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
  const { name } = req.body
  const nameToUse = name.trim()

  const accounts = Accounts.getAll()
  accounts.map((account) => {
    if(account.name === nameToUse) {
      res.status(400).json({ message: "that name is taken" })
    } else {
      next()
    }
  })
}

exports.checkAccountId = (req, res, next) => {
  let { id } = req.params

  Accounts.getById(id)
    .then((account) => {
      if(!account) {
        res.status(404).json({ message: "account not found" })
      } else {
        req.account = account
        next()
      }
    })
    .catch(next)
}
