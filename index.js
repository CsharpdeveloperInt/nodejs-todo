const express = require('express')
const app = express()
const todoRoutes = require('./routes/todo')
const path = require('path')
const sequelize = require('./database')
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'public')))
app.use(express.json())
app.use('/api/todo',todoRoutes)
app.use((req,res,next)=>{
    res.sendFile('/index.html')
})

//Запускаем сервер, и сервер БД
async function start(){

      try {
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        app.listen(PORT,()=>{
          console.log(`Server is running on port ${PORT}`)});
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

start()