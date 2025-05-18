import { Readable } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 0
    
    _read() {
        const i = this.index++;

        setTimeout(() => {
            if(i > 5){
                this.push(null)
            } else {
                const buf = Buffer.from(String(i))

                this.push(buf)
            }
        }, 1000)
    }
}

const nodeStream = new OneToHundredStream()
const webStream = Readable.toWeb(nodeStream)

// Faz um fetch para oservidor e envia os números para ele
// Esses números poderiam ser outras estruturas de dados

fetch('http://localhost:3334', {
  method: 'POST',
  body: webStream,
  duplex: 'half', // <- ESSENCIAL! O padrão fetch da web não espera stream como retorno
  headers: {
    'Content-Type': 'text/plain'
  }
})
  .then(res => res.text())
  .then(console.log)
  .catch(console.error)