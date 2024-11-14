// Requiring modules


const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const utils = require('./utils.js');
const isValid = require('./isValid.js');
var fs = require('fs/promises');


// Configuring Swagger

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


// Defining the port we will be listening on
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
app.get('/contacts/:name',(req, res)=>{ //Retrives a specific contact or a list of contacts that start with a letter or string
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
app.get('/contacts',(req, res) => {   // Retrieves all contacts from the file
  res.send(contacts.sort((a, b) => a.FirstName.localeCompare(b.FirstName)));

});

app.use(express.json());

app.post('/save/contact',(req, res) => {  // Saves a contact from body if all the properties have values
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


// Transforms the information from the file into an array of objects
let contacts = [];
var result = utils.readFromCsv("contact_information.csv");

result.then((data)=>{

  let columns = [];
  let lines = data.split("\n");
  let props = lines[0].split(',');

  props = props.map(p => p.replace(' ',''));

  

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



