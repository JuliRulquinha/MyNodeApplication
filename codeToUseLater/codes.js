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

