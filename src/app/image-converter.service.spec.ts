import { TestBed, inject } from '@angular/core/testing';

import { ImageConverterService } from './image-converter.service';

describe('ImageConverterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageConverterService]
    });
  });

  it('should be created', inject([ImageConverterService], (service: ImageConverterService) => {
    expect(service).toBeTruthy();
  }));
});
