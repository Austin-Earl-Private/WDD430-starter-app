import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output('selectedFeatureEvent') route = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onSelected(event:string){
    this.route.emit(event);
  }

}
