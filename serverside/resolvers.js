const axios= require('axios');
const crypto = require('crypto');
const dotenv=require('./enviroment/enviromentVar');

//resolver to solve the  schema as per model structure which must be returned from api

let hash= crypto.createHash('md5').update(dotenv.ts+dotenv.PRIVKEY+dotenv.APIKEY).digest("hex");

const Query={
   characters: ()=>{ return axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${dotenv.ts}&apikey=aca653f68ece826792d50f50da4b9312&hash=${hash}`).then(res=>res.data) },
   character: (root,chId)=>{  return axios.get(`https://gateway.marvel.com/v1/public/characters/${chId.id}?ts=${dotenv.ts}&apikey=aca653f68ece826792d50f50da4b9312&hash=${hash}`).then(res=>res.data)} 
};


module.exports={Query}