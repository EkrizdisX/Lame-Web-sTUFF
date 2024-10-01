const express=require('express')

// express app

const app=express()

app.listen(3000,() => {
    console.log("hello this is shivu ")
})

app.get('/', (req,res) => {
    res.json({msg:'hello this is valodeamort  '})

})