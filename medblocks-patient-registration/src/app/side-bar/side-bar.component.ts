import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { IUserDetails } from 'src/shared/common.constants';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  public currentTab = 1;
  public userDetails!: IUserDetails;

  ngOnInit(): void{
    this.userDetails = JSON.parse(localStorage.getItem("userDetails") ?? "");
  }
}
