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


app.get('/buscaBeneficio', function(req,res){ 
   
    const singleton = new JsonClient();
    
    if(req.query.beneficio){
        singleton.get('beneficio',req.query.beneficio, function(resultado){
            res.send(resultado);
        });
    }else if(req.query.cpf){
        singleton.get('cpf',req.query.cpf, function(resultado){
            res.send(resultado);
        });
    }else if(req.query.nit){
        singleton.get('nit',req.query.nit, function(resultado){
            res.send(resultado);
        });
    }else if(req.query.nome && req.query.nomeMae && req.query.dataNascimento){

        var parametro = {
            nome : req.query.nome,
            nomeMae : req.query.nomeMae,
            dataNascimento : req.query.dataNascimento
        }

        singleton.get('nome',parametro, function(resultado){
            res.send(resultado);
        });

    }else{
        res.send("Erro: Falta parâmetro");
    }
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