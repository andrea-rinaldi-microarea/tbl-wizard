import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'tblw-sidebar-menu-item',
  templateUrl: './sidebar-menu-item.component.html',
  styleUrls: ['./sidebar-menu-item.component.scss']
})
export class SidebarMenuItemComponent implements OnInit {

  @Input() public link: string;

  constructor() { }

  ngOnInit() {
  }

}
