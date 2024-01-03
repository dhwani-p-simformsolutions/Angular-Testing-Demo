import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WordService } from './word.service';
import { baseUrl } from 'src/environments/environment';

describe('WordService', () => {
  let service: WordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [WordService],
    });
  });

  it('should be created', inject([WordService], (service: WordService) => {
    expect(service).toBeTruthy();
  }));

  it('should get word', inject(
    [WordService, HttpTestingController],
    (service: WordService, httpMock: HttpTestingController) => {
      const mockWords = [
        {
          id: 1,
          word: 'word1',
          definition: 'definition1',
        },
        {
          id: 2,
          word: 'word2',
          definition: 'definition2',
        },
      ];
      service.getWords().subscribe((words) => {
        expect(words).toEqual(mockWords);
      });

      const req = httpMock.expectOne(`${baseUrl}/words`);
      expect(req.request.method).toEqual('GET');

      req.flush(mockWords);
      httpMock.verify();
    }
  ));

  it('should add word', inject(
    [WordService, HttpTestingController],
    (service: WordService, httpMock: HttpTestingController) => {
      const mockWord = {
        word: 'word1',
      };

      service.addWord(mockWord).subscribe((words) => {
        expect(words).toEqual(mockWord);
      });

      const req = httpMock.expectOne(`${baseUrl}/words`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(mockWord);
      req.flush(mockWord);
      httpMock.verify();
    }
  ));

  it('should update word', inject(
    [WordService, HttpTestingController],
    (service: WordService, httpMock: HttpTestingController) => {
      const mockWord = {
        word: 'word1',
      };
      service.updateWord(mockWord, 1).subscribe((words) => {
        expect(words).toEqual(mockWord);
      });
      const req = httpMock.expectOne(`${baseUrl}/words/1`);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(mockWord);

      req.flush(mockWord);
      httpMock.verify();
    }
  ));

  it('should delete word', inject(
    [WordService, HttpTestingController],
    (service: WordService, httpMock: HttpTestingController) => {
      const id = 1;
      service.deleteWord(1).subscribe((res) => {
        expect(res).toBeNull();
      });

      const req = httpMock.expectOne(`${baseUrl}/words/${id}`);
      expect(req.request.method).toEqual('DELETE');
      expect(req.request.body).toBeNull();
      req.flush(null);
      httpMock.verify();
    }
  ));
});
