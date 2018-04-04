const express = require('express');
const app = express()
const port = 8000;
const moment = require('moment'); //for formatting dates
const path = require('path')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(express.static(__dirname+'/client/dist'))

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/notes')

//Schemas 
var NoteSchema = new mongoose.Schema({
	text: {type:String, minlength:3}
}, {timestamps:true})
mongoose.model('Note', NoteSchema)
var Note = mongoose.model('Note')


//Routes
app.get('/notes', function(req,res){
	Note.find({}, null, {sort: '-createdAt'}, function(err, notes){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{ 
			res.json({message: "Success", data: notes})
		}
	})
})
app.post('/notes', function(req,res){
	var note = new Note({text:req.body.text})
	note.save(function(err){
		if(err){
			res.json({message: "Error", error: err})
		}
		else{
			res.json({message: "Success"})
		}
	})
})
app.all("*", (req,res,next)=>{
	res.sendFile(path.resolve("./client/dist/index.html"))
})

//Listening
app.listen(port, function(){
	console.log(`Listening on port ${port}`);
})