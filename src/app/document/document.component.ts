import { Component, OnInit } from '@angular/core';
import {Document} from "./document.model";

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  selectedDocument: Document;

  constructor() { }

  ngOnInit(): void {
  }

}
