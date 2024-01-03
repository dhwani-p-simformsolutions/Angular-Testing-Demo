import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AddWordComponent } from './add-word.component';
import { WordService } from '../Services/word.service';

describe('AddWordComponent', () => {
  let component: AddWordComponent;
  let fixture: ComponentFixture<AddWordComponent>;
  let wordServiceMock: jasmine.SpyObj<WordService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<AddWordComponent>>;

  beforeEach(waitForAsync(() => {
    wordServiceMock = jasmine.createSpyObj('WordService', ['addWord', 'updateWord']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [AddWordComponent],
      imports: [MatDialogModule, ReactiveFormsModule],
      providers: [
        { provide: WordService, useValue: wordServiceMock },
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.data = { word: 'example', action: 'Update', id: 1 };
    component.ngOnInit();

    expect(component.formGroup.value).toEqual({ word: 'example' });
  });

  it('should close the dialog', () => {
    component.closeDialog();

    expect(matDialogRefSpy.close).toHaveBeenCalledWith('Pizza!');
  });

  it('should update a word', () => {
    const updateWordSpy = spyOn(wordServiceMock, 'updateWord').and.returnValue(of({}));
    component.data = { action: 'Update', id: 1 };
    component.formGroup.setValue({ word: 'updatedExample' });
    component.wordProcess();
  
    console.log(updateWordSpy.calls.allArgs());  // Log all arguments passed to the spy
  
    expect(updateWordSpy).toHaveBeenCalledWith({ word: 'updatedExample' }, 1);
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
  
  it('should add a word', () => {
    const addWordSpy: jasmine.Spy<any> = spyOn(wordServiceMock, 'addWord').and.returnValue(of({}));
    // component.data = { action: 'Add' };
    // component.formGroup.setValue({ word: 'example' });
    // component.wordProcess();
  
    // console.log(addWordSpy.calls.allArgs());  // Log all arguments passed to the spy
  
    // expect(addWordSpy).toHaveBeenCalledWith({ word: 'example' });
    // expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/list-word');
    // expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
    
});
