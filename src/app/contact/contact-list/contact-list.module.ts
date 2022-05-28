import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import {ContactItemComponent} from "../contact-item/contact-item.component";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        ContactListComponent,
      ContactItemComponent,
    ],
    exports: [
        ContactListComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class ContactListModule { }
