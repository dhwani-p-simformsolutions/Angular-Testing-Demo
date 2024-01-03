import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWordComponent } from './add-word/add-word.component';
import { ListWordsComponent } from './list-words/list-words.component';

const routes: Routes = [
  { path: 'add-word', component: AddWordComponent },
  { path: '', component: ListWordsComponent },
  { path: 'list-word', component: ListWordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
