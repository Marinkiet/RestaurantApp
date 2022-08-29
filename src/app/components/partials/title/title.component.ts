import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  constructor() { }

  //default input values
  @Input()
  title!:string;

  @Input()
  margin? = '16px 0 16px 14px ';

  @Input()
  fontSize? = '18px';

  ngOnInit(): void {
  }

}
