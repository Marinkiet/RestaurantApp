import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor() { }
  @Input()
  visible=false;
  @Input()
  notFoundMessage = "Nothing Found!";
  @Input()
  routerLinkText = "Resturn to homepage";
  @Input()
  routerLink = "/";

  ngOnInit(): void {
  }

}
