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
    
    _buscaJson(callback){
        var myself = this;
        if(this._json == null){
            
            this._request.get(this._url, function(error,response,body){
                console.log('Erro: ', error == null ? "Sem erros" : error );
                console.log('Status Code: ', response && response.statusCode);
               if(!error && response.statusCode == 200){
                    console.log("Retornando valores da API");
                    myself._json = body;
                    console.log(myself._json);
                }else{
                    console.log("Erro ao retornar valores da API");
                    myself._json = null;
                } 
            });
        }

        var obj = JSON.parse(myself._json);

        for(var x in obj){
            console.log(x['numeroBeneficio']);
        }

        console.log(myself._json);
        callback(myself._json);

    }

  
    get(metodo,parametro,retorno){
        try{
            this["_"+metodo](parametro,retorno);
        }catch(e){
            if(e instanceof TypeError){
                console.log("Erro: Chamada a método inexistente");
            }
        }
    }



    _beneficio(parametro,retorno) {
        this._buscaJson(function(data){
           var obj = JSON.parse(data);
           console.log(obj); 
        });
    }
    
    _cpf(parametro,retorno){
        var myself = this;
        this._buscaJson(function(data){
            var obj = JSON.parse(data);
            //console.log(obj);
            retorno(data);
        });
    }

};

module.exports = JsonClient;