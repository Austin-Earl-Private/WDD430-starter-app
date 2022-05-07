import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import {ContactItemComponent} from "../contact-item/contact-item.component";



@NgModule({
    declarations: [
        ContactListComponent,
      ContactItemComponent,
    ],
    exports: [
        ContactListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ContactListModule { }
