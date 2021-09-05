import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PeriodicElement } from 'src/app/views/home/home.component';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class ElementDialogComponent implements OnInit {
  element!: PeriodicElement;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: PeriodicElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
    ) {}

  ngOnInit(): void {
    if(this.data.ID != null){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  
}