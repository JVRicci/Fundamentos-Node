// Streams são arquivos que são lidos aos poucos, por exemplo
// Um csv de mais de 10GB. 
// Ele pode ser lido de uma vez ou aos poucos
// A estratégia de node é ler aos poucos, dificultando gargalos e otimizando o processamento

// Existem 2 tipos de streams, as readables e as writebles
// As readables são aquelas que apenas lemos, e writebles podemos criar

// Importa o Readable para fazer leitura de readable streams
import {Readable, Writable, Transform} from 'node:stream'
import { stdin, stdout } from 'node:process'

class OneToHundredStream extends Readable{
    index = 1;

    _read(){
        const i = this.index++;

        // Adciona a cada 1 segundo informação
        setTimeout(()=>{
            // Caso o constador atingir 100, 
            // ele indica que não existem mais informações a serem enviadas
            if( i > 100){
                this.push(null)
            } else {
                // Informaçoes não podem ser armazenadas em tipos primitivos no node
                // Como por exemplo strings ou numbers,
                // É necessário criar um buffer e armazena-lo por ele
                const buf = Buffer.from(String(i))
                
                this.push(buf)
            }
        }, 1000)
    }
}

// Classe para criaçao de streams writables
// Em streams de escrita, dados não são retornaveis.
// Apenas criamos 

class MutiplyByTenStream extends Writable {
    // Chunk: serve para ler as informações de um buffer
    // Encoding: 
    // Callback: Finaliza o que foi feito na função, como se fosse um commit
    _write(chunk, encoding, callback){
        console.log(`\nNúmero multiplicado: ${Number(chunk.toString()) * 10}`)
        callback()
    }
}

// Stream para tranformar um dado já existente
// Faz com que o número seja negativo
class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1

        // No callback recebe dois valores
        // O primeiro, null, é referente ao retorno em caso de erro
        // O segundo é referente ao valor que foi transformado
        // É necessário que seja um buffer e, formato de string
        callback(null, Buffer.from(String(transformed)))
    }
}

// Faz com que seja impresso no terminal o que foi armazenado na classe
new OneToHundredStream()
    .pipe(process.stdout)

//Executa classe para multiplicar por 10
new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MutiplyByTenStream())

// Faz com que todas as linhas que você receba, seja encaminhada para uma saida
// proccess.stdin

// .pipe(proccess.stdout);