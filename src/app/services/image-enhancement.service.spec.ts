/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageEnhancementService } from './image-enhancement.service';

describe('ImageEnhancementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageEnhancementService]
    });
  });

  it('should ...', inject([ImageEnhancementService], (service: ImageEnhancementService) => {
    expect(service).toBeTruthy();
  }));
});
