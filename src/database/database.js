// Lib responsável por criar arquivos com dados persistentes
import fs from 'node:fs/promises'

// Faz com que o arquvivo db seja criado nesse exato mesmo diretório que esse arquivo está
const databasePath = new URL('./db.json', import.meta.url)

// Classe responsável por fazer toda a gerencia do BD
export class Database{
    // O sinal # faz com que a variável fique privada dentro da classe
    #database = {}
    
    construtor(){
        fs.readFile(databasePath, 'utf8')
        .then( data => {
            this.#database = JSON.parse(data)
        })
        .catch(()=> {
            this.#persist()
        })
    }

    #persist () {
        fs.writeFile(databasePath,
            JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? [];
        return data;
    }

    insert(table, data) {
        if (Array.isArray (this.#database[table])) {
            this.#database[table].push(data);
        } else {
            this.#database[table] = [data];
        }

        this.#persist();

        return data; 
    }
}