import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { AddWordComponent } from './add-word/add-word.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListWordsComponent } from './list-words/list-words.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA,MatDialogRef  } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AddWordComponent,
    ListWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule

    
  ],
  providers: [    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef , useValue: {} }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
