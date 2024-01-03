import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ListWordsComponent } from './list-words.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { WordService } from '../Services/word.service';
import { of } from 'rxjs';

describe('ListWordsComponent', () => {
  let component: ListWordsComponent;
  let fixture: ComponentFixture<ListWordsComponent>;
  const wordServiceMock = jasmine.createSpyObj('WordService', [
    'getWords',
    'deleteWord',
  ]);
  let wordServiceSpy: jasmine.SpyObj<WordService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ListWordsComponent],
      imports: [
        BrowserAnimationsModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
      ],
      providers: [
        { provide: WordService, useValue: wordServiceMock },
        { provide: Router, useClass: Router },
      ],
    }).compileComponents();
    wordServiceSpy = TestBed.inject(WordService) as jasmine.SpyObj<WordService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWordsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch words and display them', fakeAsync(() => {
    const testData = [
      { id: 1, word: 'example' },
      { id: 2, word: 'test' },
    ];
    wordServiceSpy.getWords.and.returnValue(of(testData));

    component.ngOnInit();

    tick(); // Simulate the passage of time until all pending asynchronous activities finish

    expect(wordServiceSpy.getWords).toHaveBeenCalled();
    expect(component.usersDataSource.data).toEqual(testData);
    expect(component.isSpinnerDisplayed).toBeFalse();
  }));
  
  it('should delete a word', fakeAsync(() => {
    const wordToDelete = { id: 1, word: 'example' };
    wordServiceSpy.deleteWord.and.returnValue(of({}));
  
    spyOn(component, 'ngOnInit'); // Spy on ngOnInit
  
    component.deleteData(wordToDelete);
  
    tick(); // Simulate the passage of time until all pending asynchronous activities finish
  
    expect(wordServiceSpy.deleteWord).toHaveBeenCalledWith(wordToDelete.id);
    expect(component.ngOnInit).toHaveBeenCalled(); // Verify ngOnInit is called
  
    flush(); // Finish any pending microtasks, if necessary
  }));
  
});
