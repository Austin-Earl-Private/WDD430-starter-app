import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { HeaderComponent } from './header.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactComponent } from './contact/contact.component';
import {ContactListModule} from "./contact/contact-list/contact-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactDetailComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    ContactListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
