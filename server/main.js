'use strict'

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const MySQLEvents = require('mysql-events')
const port = 8080
const dsn = {
  host: 'localhost',
  user: 'root',
  password: '',
}

let messages = [
	{
		id: 1,
		text: 'Test',
		author: 'jegutierrez'
	}
]

app.use(express.static('public'))

app.get('/hello', function(req, res){
	res.status(200).send(`Hello world`)
})

let mysqlEventWatcher = MySQLEvents(dsn)
let watcher = mysqlEventWatcher.add(
  'menuweb',
  function (oldRow, newRow) {
     //row inserted
    //console.log(`Cambio1`)

    if (oldRow === null) {
      //insert code goes here 
    }
 
     //row deleted 
    if (newRow === null) {
      //delete code goes here 
    }
 
     //row updated 
    if (oldRow !== null && newRow !== null) {
      io.sockets.emit('count', "change")
    }
    //console.log(`Cambio3`)
  }
)

io.on('connection', function(socket){
	console.log(`New connection`)
	socket.emit('messages', messages)
	socket.on('send-msg', function(data){
		setInterval(function(){
			messages.push(data)
			io.sockets.emit('messages', messages)
		}, 2000)
	})
	
})

/*let i = 0
setInterval(function(){
	io.sockets.emit('count', i)
	i++
}, 2000)*/


server.listen(port, function(){
	console.log(`Server is running, port ${port}`)
})