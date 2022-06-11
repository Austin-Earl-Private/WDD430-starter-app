import { Component, OnInit } from '@angular/core';
import {Document} from "../document.model";
import {NgForm} from "@angular/forms";
import {DocumentService} from "../document.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {

  originalDocument: Document;
  document: Document;
  editMode = false;
  constructor(private documentService: DocumentService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      const id = params['id'];
      if(!id){
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(id);
      if(!this.originalDocument){
        return;
      }
      this.editMode = true;
      this.document = {...this.originalDocument};
    })
  }

  onSubmit(form: NgForm){
      const value= form.value;
      this.document.url = value.url;
      this.document.name = value.name;
      this.document.description = value.description
    if(this.editMode){
      this.documentService.updateDocument(this.originalDocument,this.document);
    }else{
      this.documentService.addDocument(this.document);
    }
    this.router.navigate(['/documents'])

  }
  onCancel(){
    this.router.navigate(['/documents'])
  }

}
