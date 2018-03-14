
class mockaroo{
    
    constructor(){
        this.request = require('request');
        console.log("Consultando API do Mockaroo...");
    }

    obterMock(callback){
       
        this.request.get('https://my.api.mockaroo.com/participabeneficio.json?key=b7b9ce40', function(error,response,body)
        {
            console.log('Erro: ', error);
            console.log('Status Code: ', response && response.statusCode);

            if(!error && response.statusCode == 200){
                console.log("Retornando valores da API");
                callback(body);
                
            }else{
                console.log("Erro ao retornar valores da API");
                callback(null);
            }
        });
    }
};

module.exports = mockaroo;