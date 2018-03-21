let instance = null;

class JsonClient {
    
    constructor(){
        
        this._request = require('request');
        this._url = "https://api.myjson.com/bins/107dd7";
        this._json = null;

        if(!instance){
            instance = this
            console.log("Criando novo singleton");
         }
         return instance;

    } 
    
    get(tipo,parametro,retorno){
        var myself = this;
        return new Promise(function(resolve,reject){
            myself.___search(tipo,parametro).then(function(resultado){
                retorno(resultado);
            });
        });
    }

    ___search(tipo,parametro){
        var myself = this;

        return new Promise(function(resolve,reject){
            myself.___parse().then(function(val){
                var jsonRetorno = new Array();
                var filtro;
                
                for(var i = 0; i < val.length; i++){
                    switch(tipo){
                        case 'beneficio' :
                            if(val[i].numeroBeneficio == parametro)
                                jsonRetorno.push(val[i]);
                        break;
                        case 'cpf' :
                            if(val[i].numeroCPF == parametro)
                            jsonRetorno.push(val[i]);
                        break;

                        case 'nit' :
                            if(val[i].numeroNIT == parametro)
                            jsonRetorno.push(val[i]);
                        break;

                        case 'nome' :
                            if(val[i].nome == parametro.nome && val[i].nomeMae == parametro.nomeMae && val[i].dataNascimento == parametro.dataNascimento)
                            jsonRetorno.push(val[i]);
                        break;
                    }
                }
                
                if(jsonRetorno.length > 0){
                    resolve(jsonRetorno);    
                }else{
                    resolve({"retorno" : "Nenhum resultado encontrado"});
                }
    
           }).catch(function(err){
                console.error(err);
           });
        });
    }

    ___parse(){
        var self = this;
            return new Promise(function(resolve,reject){
               if(self._json == null){
                   self._request.get(self._url, function(error,response,body){
                       if(error) return reject(error);
                       try{
                            self._json = JSON.parse(body);
                            resolve(self._json);
                       }catch(e){
                           reject(e);
                       }
                   });
               }else{
                   resolve(self._json);
               }
            });
        
    }

};

module.exports = JsonClient;