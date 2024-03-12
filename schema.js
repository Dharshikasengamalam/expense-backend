const mongoose=require('mongoose')

const expensetracherschema=new mongoose.Schema({
    amount :{
        type:Number
    },
    category :{
        type:String
    },
    data:{
        type:String
    }
})
const Expense=mongoose.model('expensedetails',expensetracherschema)
module.exports={Expense}
