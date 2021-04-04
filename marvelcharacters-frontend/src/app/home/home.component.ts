import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MarvelcharactersService } from '../services/marvelcharacters.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'MarvelCharacters';
  allCharacters=[];
  characterDetails=[];
  selected = [];
  id_details= this.selected[0]===undefined? 0: this.selected[0];
  characterAllstories=[];
  characterAllcomics=[];
  imageUrl:String
  ext:String;
  constructor(private characterservice: MarvelcharactersService, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
     
      
  }


   

 
   //triigged event when the item is dropped
  onDrop(event: CdkDragDrop<string[]>){
     if(this.selected.length==0){
      this.selected.push(this.allCharacters[event.previousIndex]);
     }else{
       this.selected.splice(0,1);
       this.selected.push(this.allCharacters[event.previousIndex])
     }

     this.id_details=Number(this.selected[0].id);
     
     this.getSingleCharDetails(this.id_details);
  }
  //getting all characters from serve
  getCharacter(){
    this.spinner.show();
    this.characterservice.getAllCharaters().then((data)=>{
      this.allCharacters=[...data];
       this.spinner.hide();
    });
  }
 
  //getting detials of dropped character to be displayed
  getSingleCharDetails(id){
    
     
    this.characterservice.getSingleCharacter(id).then((data)=>{
      this.characterDetails.push(data);
      this.characterAllcomics=[...data.character.data.results[0].comics.items];
      this.characterAllstories=[...data.character.data.results[0].stories.items]
      this.imageUrl=data.character.data.results[0].thumbnail.path;
      this.ext=data.character.data.results[0].thumbnail.extension;
    });
   
  
  }



}
