import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  rows:number = 20;
  row1:123;
  col1:123;
  rowArr:number[]=[];
  constructor() { 
    for(var i =0 ; i<this.rows; i++){
      this.rowArr[i]=i*40;
    }  
  }
  ngOnInit() {
    
  }
}
