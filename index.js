var express = require('express');
var app = module.exports = express();
var mockaroo = require('./mockaroo.js');
var faker = require('faker');

var JsonClient = require('./jsonclient');

app.get('/', function(req,res){
    m = new mockaroo();
    
    m.obterMock(function(response){
        console.log(response);
        res.setHeader('Content-Type', 'application/json');    
        res.send(response);
    });
     
    return;
});


app.get('/buscaPorBeneficio', function(req,res){ 

    const singleton = new JsonClient();

    singleton.get('cpf',"19273929615", function(resultado){
        res.send(resultado);
    });


   
});

app.get('/install', function(req,res){
    var Install = require('./install');
    Install = new Install();
    
});

app.get('/faker', function(req,res){

    var name = faker.name.findName();

    
    res.send(name);

});


var server = app.listen(3000, function(){
    console.log("Node server is running...");
})