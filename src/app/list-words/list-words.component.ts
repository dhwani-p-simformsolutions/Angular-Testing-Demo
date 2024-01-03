import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddWordComponent } from '../add-word/add-word.component';
import { WordService } from '../Services/word.service';

@Component({
  selector: 'app-list-words',
  templateUrl: './list-words.component.html',
  styleUrls: ['./list-words.component.scss'],
})
export class ListWordsComponent implements OnInit {
  isSpinnerDisplayed = false;
  usersDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayColumns: string[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  dialogRef: any;
  constructor(private wordService: WordService, public dialog: MatDialog) {
    this.displayColumns = ['word', 'action'];
  }

  ngOnInit() {
    this.usersDataSource.paginator = this.paginator;
    this.sortData();

    this.displayData();
  }

  private sortData() {
    this.sort.active = 'userName';
    this.sort.direction = 'asc';
    this.sort.disableClear = true;
    this.usersDataSource.sort = this.sort;
  }

  private displayData() {
    this.isSpinnerDisplayed = true;
    this.wordService.getWords().subscribe((data: any) => {
      console.log(data);
      this.usersDataSource.data = data;
      console.log(this.usersDataSource);
      this.isSpinnerDisplayed = false;
    });
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    this.dialogRef = this.dialog.open(AddWordComponent, {
      width: '250px',
      data: obj,
    });

    this.dialogRef
      .afterClosed()
      .subscribe((result: { event: string; data: any }) => {
        if (action == 'Update') {
          this.ngOnInit();
        }
      });
  }

  searchThis(data: any) {
    this.usersDataSource.filter = data.target.value.trim().toLocaleLowerCase();
  }

  deleteData(element: any) {
    console.log(element);
    this.wordService.deleteWord(element.id).subscribe((result: any) => {
      console.log('Deleted Successfully');
      this.ngOnInit();
    });
  }
}
