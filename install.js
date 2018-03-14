var mysql = require('mysql');


module.exports = class Install {
    constructor(){
        
        this.con = {
          user      : "datamock",
          password  : "datamock0",
          database  : "db_datamock",
          host      : "localhost"
        }

        this.conexao = mysql.createConnection({
                host: this.con.host,
                user : this.con.user,
                password : this.con.password
        });

        this.checaConexao();       
    }
    
 
    checaConexao(callback){
        console.log("1 - Checando Conexão");
        
        this.conexao.connect(function(err){
            if(err){
                throw err;
            }else{
                console.log("Conexão ao banco de dados, com as credenciais, efetuadas com sucesso...");
                this.checaBanco();
            } 
        });

    }

    checaBanco(){
        console.log("2 - Checando a existência da base de dados");
        this.conexao.query("SHOW DATABASES LIKE 'db_datamock'"), function (err, result){
            if (err) throw err;
            console.log(result);
        }
    }

};
