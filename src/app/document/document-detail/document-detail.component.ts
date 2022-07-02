import {Component, Input, OnInit} from '@angular/core';
import {Document} from "../document.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DocumentService} from "../document.service";
import {WindRefService} from "../../wind-ref.service";

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
   document:Document ;
   nativeWindow: any;
  constructor(private router: Router, private route: ActivatedRoute, private docService:DocumentService, private windowService: WindRefService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param)=>{
      this.document = this.docService.getDocument(param['id'])
    })
    this.nativeWindow = this.windowService.getNativeWindow();
  }

  onView() {
    if(this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }
  onDelete() {
    this.docService.deleteDocument(this.document);
    this.router.navigate(['/documents.js'])
  }

}
