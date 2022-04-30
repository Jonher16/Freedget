const express = require('express') //npm install express
//const fileUpload = require('express-fileupload')
const app = express()  
const port = 4000
const cors = require('cors') //npm i cors

//Database
const mongoose = require('mongoose')

//app.use(fileUpload())
app.use(cors()) 
app.use(express.json())

const url = "mongodb://localhost:27017/finance"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}).then(db => console.log('Connected to database'))
  .catch(error=>console.log(error))

const EntriesSchema = mongoose.Schema({
  title: String,
  desc: String,
  cat: String,
  date: String,
  income: Number,
  expense: Number,
})

const EntriesModel = mongoose.model('entries', EntriesSchema)


app.get('/finance', async (req, res) => {
    let entries = await EntriesModel.find().sort({"date": 1})
    res.json( entries )
    console.log(entries)
})

app.get('/getdata/:month', async (req, res) => {
  const { month } = req.params 
  let entries = await EntriesModel.find({date: { "$regex": month, "$options": "i" }}).sort({"date":1})
  res.json( entries )
})

app.get('/months', async (req, res) => {
  let entries = await EntriesModel.find().sort({"date": 1})
  let dup_months = []
  entries.map(entry=>{
   let stringArray = entry.date.split("-")
   let date = stringArray[0]+"-"+stringArray[1]
    dup_months.push(date)
  })
  let months = [...new Set(dup_months)]
  res.json( months )
})

app.post('/newentry', async (req, res) => {
  const {title, desc, date, cat, income, expense} = req.body
  const entry = new EntriesModel({ title, desc, date, cat, income, expense})
  await entry.save() 
  res.json({ msg: "Entry OK" });
  console.log("Entry successful")
});

app.delete('/deleteentry/:id', async (req, res) => {
  const { id } = req.params
  await EntriesModel.deleteOne({ _id: id })
  res.json({ msg:'Entry deleted' })
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})