const express= require('express');
 const router=express.Router();
 const axios= require('axios');
 const crypto=require('crypto')
 const dotenv=require('../enviroment/enviromentVar');

let ts = new Date().getTime();
 
let hash= crypto.createHash('md5').update(dotenv.ts+dotenv.PRIVKEY+dotenv.APIKEY).digest("hex");

 let characterProfile={};
 
//this get method will return a profile object for specified character
//example : http://localhost:5000/api/marvel/character/profile/1011334
router.get('/:id',(req,res)=>{
    let characterId=req.params.id;
   //call backs for forming structure of the respond object
   axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${dotenv.ts}&apikey=aca653f68ece826792d50f50da4b9312&hash=${hash}`).then(resp=>{
    
   // restapi to fetch stories belonging to character
    axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}/stories?ts=${dotenv.ts}&apikey=aca653f68ece826792d50f50da4b9312&hash=${hash}`).then(resp2=>{
         
          //api call to fetch comics belonging to character
          axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${dotenv.ts}&apikey=aca653f68ece826792d50f50da4b9312&hash=${hash}`).then(resp3=>{
               
               
               let {name}=resp.data.data.results[0];
               let {path}=resp.data.data.results[0].thumbnail;
               
               //use forloop to extract title and description
               let allStory=[];
               let allComics=[];
               for(var i=0; i<resp2.data.data.results.length;i++)
               {
                      let stories= {title:resp2.data.data.results[i].title,
                        description:resp2.data.data.results[i].description}
                        allStory.push(stories)
               }
               for(var i=0; i<resp3.data.data.results.length;i++)
               {
                      let comics= {title:resp2.data.data.results[i].title,
                        description:resp2.data.data.results[i].description}
                        allComics.push(comics)
               }
               characterProfile.name=name;
               characterProfile.imagePath=path;
               characterProfile.stories=allStory;
               characterProfile.comics=allComics;
               //exposing the object to end client
               res.json(characterProfile);
              
    
          }).catch((err)=>{
            res.json(err)
            });
   
    }).catch((err)=>{
      res.json(err)
      });
      
     
    
   }).catch((err)=>{
   res.json(err)
   });

   
 });

 module.exports=router;