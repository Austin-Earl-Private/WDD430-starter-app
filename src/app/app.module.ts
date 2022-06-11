import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { HeaderComponent } from './header.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactComponent } from './contact/contact.component';
import {ContactListModule} from "./contact/contact-list/contact-list.module";
import {DocumentComponent} from "./document/document.component";
import { DocumentListComponent } from './document/document-list/document-list.component';
import { DocumentItemComponent } from './document/document-item/document-item.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { MessageItemComponent } from './message/message-item/message-item.component';
import { MessageEditComponent } from './message/message-edit/message-edit.component';
import { DropdownDirective } from './share/dropdown.directive';
import {RouterModule} from "@angular/router";
import {routes} from "./app-routing.constants";
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';
import {FormsModule} from "@angular/forms";
import {DndModule} from "ng2-dnd";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactDetailComponent,
    ContactComponent,
    DocumentComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageListComponent,
    MessageItemComponent,
    MessageEditComponent,
    DropdownDirective,
    DocumentEditComponent,
    ContactEditComponent
  ],
    imports: [
        BrowserModule,
        ContactListModule,
        RouterModule.forRoot(routes),
        FormsModule,
        DndModule.forRoot(),
    ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
