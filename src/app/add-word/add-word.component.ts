import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WordService } from '../Services/word.service';

@Component({
  selector: 'app-add-word',
  templateUrl: './add-word.component.html',
  styleUrls: ['./add-word.component.scss'],
})
export class AddWordComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    public wordService: WordService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddWordComponent>,
    public router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.initForm();
  }
  initForm() {
    this.formGroup = new FormGroup({
      word: new FormControl('', [Validators.required]),
    });
    this.formGroup.patchValue({
      word: this.data.word,
    });

    console.log(this.formGroup);
  }
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
  wordProcess() {
    console.log(this.formGroup.value);
    if (this.formGroup.valid) {
      if (this.data.action == 'Update') {
        this.wordService
          .updateWord(this.formGroup.value, this.data.id)
          .subscribe((result: any) => {
            console.log('UPDATED WORD');
          });
        this.closeDialog();
      } else {
        this.wordService
          .addWord(this.formGroup.value)
          .subscribe((result: any) => {
            if(result){
            console.log('ADDED WORD');
          this.router.navigateByUrl('/list-word')}
          });
      }
      console.log('here', this.formGroup.value, 'Valid');
    }
  }
}

