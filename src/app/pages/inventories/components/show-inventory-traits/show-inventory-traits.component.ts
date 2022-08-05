import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inventory } from '../../../../model/inventories';

@Component({
  selector: 'app-show-inventory-traits',
  templateUrl: './show-inventory-traits.component.html',
  styleUrls: ['./show-inventory-traits.component.scss']
})
export class ShowInventoryTraitsComponent implements OnInit {

  name

  constructor(
    public dialogRef: MatDialogRef<ShowInventoryTraitsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
