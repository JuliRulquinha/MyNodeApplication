// // //Crio um objeto 'triangle'
// // var triangle = {
// //     ladoA : 8,
// //     ladoB : 5,
// //     ladoC : 17
// // };


// // //Crio uma promise que retorna se o objeto "triangle" e valido
// // var p = new Promise((resolve, reject) => {
// //     if(triangle.ladoA + triangle.ladoB < triangle.ladoC){
// //         reject("Not a valid triangle.");
// //     }
// //     else{
// //         resolve("That is a valid triangle.");
// //     }
// //  })//.then((response)=>{
// // //     console.log(response);
// // // }).catch((response)=>{
// // //     console.log(response);
// // // })

// // //Crio uma function assincrona para tratar resolve || reject
// // async function myAsyncFunction() {
// //     try {
// //         let result = await p;
// //         console.log(result);
// //     } catch (error) {
// //         console.log(error);
// //     }
    
// // }
// // //Chamo a function
// // myAsyncFunction();

// // console.log(process);

// const bodyParser = require('body-parser')
// const express = require('express')
// const app = express()

// app.use(bodyParser.json());

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// app.post('/test', function(req, res){
//     var obj = req.body;
//     console.log(obj);
//     var listaDeMensagens = [];

//     for (let i = 0; i < obj.qtd; i++) {
//         listaDeMensagens.push((i+1)+"-"+obj.message);
//     }
//     res.json(listaDeMensagens);
// })

// app.listen(3000,()=>{
//     console.log("Waiting for something")})

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const utils = require('./utils.js');
const isValid = require('./isValid.js');
var fs = require('fs/promises');

const swaggerOptions = {
  swaggerDefinition : {
    openapi: '3.0.0',
    info: {
      title:'My API',
      version: '1.0.0',
      description:'It only returns contact info for now',
    }
  },
  apis:["./main.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



app.listen(5500);


/**
 * @swagger
 * /contacts/{name}:
 *   get:
 *     summary: Busca um contato pelo nome
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome do contato que você quer buscar
 *     responses:
 *       200:
 *         description: Retorna o contato solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nome do contato
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do contato
 *       404:
 *         description: Contato não encontrado
 */
app.get('/contacts/:name',(req, res)=>{
  let name = req.params.name;
  let contact = contacts.filter(c => c.FirstName.startsWith(name)).sort((a, b) => a.FirstName.localeCompare(b.FirstName));

  res.send(contact); 
})

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Busca um contato pelo nome
 *     parameters:
 *       - in: path
 *         description: Retorna todos os
 *     responses:
 *       200:
 *         description: Retorna o contato solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nome do contato
 *                 phone:
 *                   type: string
 *                   description: Número de telefone do contato
 *       404:
 *         description: Contato não encontrado
 */
app.get('/contacts',(req, res) => {
  res.send(contacts.sort((a, b) => a.FirstName.localeCompare(b.FirstName)));

});

app.use(express.json());

app.post('/save/contact',(req, res) => {
  const data = req.body;
  let props = [];
  for(d in data){
    data[d];
    props.push(data[d]);
  }
  let contactToSave = props.join(",");
  if (isValid(data) === true) {
    console.log("Dados recebidos:", data);
    res.status(200).send("Dados válidos e salvos com sucesso.");
  } else {
    console.error("Dados inválidos.");
    res.status(400).send("Dados inválidos.");
  }

  fs.appendFile("contact_information.csv",contactToSave);
})

let contacts = [];
var result = utils.readFromCsv("contact_information.csv");

result.then((data)=>{

  let columns = [];
  let lines = data.split("\n");
  let props = lines[0].split(',');

  props = props.map(p => p.replace(' ',''));

  
  
  //Preciso pegar os valores guardados em prop
  

  for(let i = 1; i <lines.length ; i++){ 
  
    columns = lines[i].split(',');
    let person = {};

    for(let j = 0; j < columns.length; j++){

      person[props[j]] = columns[j];
    
    }

    contacts.push(person);

    }
    console.log(contacts);
  }
)



// for(let i = 0; i<1; i++){
  
//   console.log("estou na linha "+i)
//   for(let j = 0; j<3; j++){
//     console.log("estou na coluna "+j);
//   }

// }

// let numbers1 = [2,3,1,4];
// let numbers2 = [2,2,5,3];
// let numbers3 = [];
// for(let i= 0; i<numbers1.length;i++){
//   numbers3[i] = numbers1[i]+numbers2[i];
// }

// for(let i = 0; i<numbers1.length; i++){
//   numbers3[i]= numbers1[i]*2;
// }

// console.log(numbers3);

