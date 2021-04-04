import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'
//import { from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MarvelcharactersService {
  endpointBaseURL= environment.SERVER_URL;
  constructor() { }
   
  
  //fetch data from http://localhost:5000/characters
  async getAllCharaters(){
   
 
     const  response= await fetch(this.endpointBaseURL,{
            method: 'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({
                query:`{
                         characters{
                           data{
                             results{
                                   id
                                  name
                                 }
                             }
                          } 
                        }               
                       `
            })
        });
    
        const responseBody=await response.json();
        return responseBody.data.characters.data.results;
    
  }

  //fetch data from http://localhost:5000/character/:id
  async getSingleCharacter(id:number){

     const  response= await fetch(this.endpointBaseURL,{
            method: 'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({
                query:` 
                query ($id:Int){
   
                  character(id:$id){
                     status
                    
                    data{
                       offset
                       results{
                        name
                        thumbnail{
                          path
                          extension
                        }
                        comics{
                          available
                          items{
                            name
                          }
                        }
                        stories{
                           items{
                            name
                          }
                             }
                      
                      }
                    }
                  }
                }     
                
                `,
                variables:{id}
            })
        });
    
        const responseBody=await response.json();
        
        return responseBody.data;
    
  }

}
