import {Routes} from "@angular/router";
import {DocumentComponent} from "./document/document.component";
import {MessageListComponent} from "./message/message-list/message-list.component";
import {ContactComponent} from "./contact/contact.component";
import {DocumentDetailComponent} from "./document/document-detail/document-detail.component";
import {DocumentEditComponent} from "./document/document-edit/document-edit.component";
import {ContactItemComponent} from "./contact/contact-item/contact-item.component";
import {ContactDetailComponent} from "./contact/contact-detail/contact-detail.component";
import {ContactEditComponent} from "./contact/contact-edit/contact-edit.component";

export let routes: Routes = [
  {path:"",component:DocumentComponent},
  {path:"documents",component:DocumentComponent, children:[
      {path:":id",component:DocumentDetailComponent},
      {path:":id/edit",component:DocumentEditComponent},
    ]},
  {path:"messages",component:MessageListComponent},
  {path:"contacts",component:ContactComponent, children:[
      {path:"new",component:ContactEditComponent},
      {path:":id",component:ContactDetailComponent},
      {path:":id/edit",component:ContactEditComponent},
    ]},
]
