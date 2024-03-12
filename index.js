 /**
  * adding a new expenses
  * post:expenses details
  * 
  * 
  * displaying exixsting recordes-get expenses
  * get
  * 
  * delete an expense-delete expense
  * post:id of the entery
  * 
  * update an exisiting one-update 
  * post:expense user entries
  * database schema
  * amount,category,date
  *  

const bodyParser=require('body-parser')
 const  mongoose=require('mongoose')
const express=require('express')
const {Expense} =require('./schema.js')
 const app=express()
 app.use(bodyParser.json())

 async function connectToDb(){
    try{
    await mongoose.connect('mongodb+srv://dharshikas:dharshika2004@cluster1.45814yt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1')
    console.log('DB connection established ');
    app.listen(8000,function(){
        console.log('listening on port 8000.....')
    })}
    catch(error){
           console.log(error)
           console.log('couldnnpz t connect')
    }
 }
 connectToDb()

 app.post('/add-expense',function(request,response){
    response.status(200).json(request.body)
  app.listen(8000,function(){
    console.log("running on port 2000...")
  })
 })*/

 const mongoose= require('mongoose')
const express = require('express')
const {Expense} = require('./schema.js')
const bodyparser=require('body-parser')
const cors=require('cors')

const app=express()
app.use(bodyparser.json())
app.use(cors())
async function connectTodb(){
    try{
        await mongoose.connect('mongodb+srv://dharshikas:dharshika2004@cluster1.45814yt.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Cluster1')
        console.log("db connection established");
        const port=process.env.PORT || 8000
        app.listen(port,function(){
         console.log(`listening on port ${port}...`)
         
        })
    }
    catch(error){
        console.log(error);
        console.log("couldn't connect to db connection");
    }
}
connectTodb();

app.post('/add-expense',async function(request,response){
    try{
    await Expense.create({
        "amount" : request.body.amount,
        "category" : request.body.category,
        "date" : request.body.date
       });
       response.status(200).json({
        "status":"inserted sucessfully"
       });
    }
    catch(error){
        response.status(200).json({
            "error-occurrence":error,
            "status":"not inserted sucessfully"
        });
    }
})

app.get('/get-expenses', async function(request, response) {
    try {
        const expenseDetails = await Expense.find()
        response.status(200).json(expenseDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch data",
            "error" : error
        })
    }
})

app.delete('/delete-expense/:id', async function(request, response) {
    try {
        const expenseEntry = await Expense.findById(request.params.id)
        if(expenseEntry) {
            await Expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" : "entry deleted"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "entry not found"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})

app.patch('/update-expense/:id', async function(request, response) {
    try {
        const expenseEntry = await Expense.findById(request.params.id)
        if(expenseEntry) {
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "entry updated"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "entry not found"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not update entry",
            "error" : error
        })
    }
})