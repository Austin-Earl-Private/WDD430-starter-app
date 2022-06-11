import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import {ContactItemComponent} from "../contact-item/contact-item.component";
import {RouterModule} from "@angular/router";
import {DndModule} from "ng2-dnd";



@NgModule({
    declarations: [
        ContactListComponent,
      ContactItemComponent,
    ],
    exports: [
        ContactListComponent,
        ContactItemComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        DndModule
    ]
})
export class ContactListModule { }
