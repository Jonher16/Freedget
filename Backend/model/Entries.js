const { Schema, model } = require("mongoose")

const EntriesSchema = Schema({
      title: String,
      desc: String,
      cat: String,
      date: String,
      income: Number,
      expense: Number,
})

module.exports = model('entries', EntriesSchema)
