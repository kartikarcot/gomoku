import { Component, OnInit } from '@angular/core';
import { checkAndUpdateBinding } from '../../../node_modules/@angular/core/src/render3/instructions';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  rows:number = 20;
  winner:string="";
  row1:123;
  col1:123;
  clr:boolean[]=[];
  blk:boolean[]=[];
  wht:boolean[]=[];
  rowArr:number[]=[];
  state:number[] = [];
  player:boolean = true;
  constructor() { 
    //this.setBoolArrays();
    for(var i =0 ; i<this.rows; i++){
      this.rowArr[i]=i;
      //this.state[i]=[];
      for(var j =0 ; j<this.rows; j++){
        this.clr[this.rows*i+j]=true;
        this.blk[this.rows*i+j]=false;
        this.wht[this.rows*i+j]=false;
        this.state[this.rows*i+j]=0;
      }
    }  
  }
  ngOnInit() {
    
  }

  setBoolArrays(){
    for(var i =0 ; i<this.rows; i++){
      for(var j =0 ; j<this.rows; j++){
        this.clr[this.rows*i+j]=true;
        this.blk[this.rows*i+j]=false;
        this.wht[this.rows*i+j]=false;
      } 
    }  
  }

  
  putCoin(i,j){
    if(this.blk[this.rows*i+j]||this.wht[this.rows*i+j])
      console.log("Occupied Space");
    else if(this.player){
      this.player=!this.player;
      this.blk[this.rows*i+j]=!this.blk[this.rows*i+j];
      this.state[this.rows*i+j] = 1;
    }
    else{
      this.player=!this.player;
      this.wht[this.rows*i+j]=!this.wht[this.rows*i+j];
      this.state[this.rows*i+j] = 2;
    }
    if(this.checkIfGame()){
      if(this.player)
        this.winner="Player 1 wins!";
      else
        this.winner="Player 2 wins!";
    }

    
  }

  // checkUp(i,j){
  //   for(var k=0; k<5; k++)
  //     if((i-k)<0 || this.state[this.rows*i+j]!=this.state[this.rows*(i-k)+j])
  //       return false;
  //   return true;
  // }

  checkDown(i,j){
    for(var k=0; k<5; k++)
      if((i+k)>this.rows || this.state[this.rows*(i+k)+j]===0 || this.state[this.rows*i+j]!=this.state[this.rows*(i+k)+j])
        return false;
    return true;
  }
  // checkLeft(i,j){
  //   for(var k=0; k<5; k++)
  //     if((j-k)<0 || this.state[this.rows*i+j]!=this.state[this.rows*i+(j-k)])
  //       return false;
  //   return true;
  // }
  checkRight(i,j){
    for(var k=0; k<5; k++)
      if((j+k)>this.rows || this.state[this.rows*i+(j+k)]===0 || this.state[this.rows*i+j]!=this.state[this.rows*i+(j+k)])
        return false;
    return true;
  }
  checkLeftDia(i,j){
    for(var k=0; k<5; k++)
      if((i+k)>this.rows || (j-k) < 0 || this.state[this.rows*(i+k)+(j-k)]===0|| this.state[this.rows*i+j]!=this.state[this.rows*(i+k)+(j-k)])
        return false;
    return true;
  }

  checkRightDia(i,j){
    for(var k=0; k<5; k++)
      if((i+k)>this.rows || (j+k) > this.rows || this.state[this.rows*(i+k)+(j-k)]===0 || this.state[this.rows*i+j]!=this.state[this.rows*(i+k)+(j+k)])
        return false;
    return true;
  }

  checkIfGame(){
    for(var i =0 ; i<this.rows; i++){
      for(var j =0 ; j<this.rows; j++){
        if(
          this.checkRight(i,j)||
          this.checkDown(i,j)||
          this.checkLeftDia(i,j)||
          this.checkRightDia(i,j)
        ){
            this.setBoolArrays();
            this.winner="";
            return true;
          }
      }
    }  
    return false;
  }

  


  
}



