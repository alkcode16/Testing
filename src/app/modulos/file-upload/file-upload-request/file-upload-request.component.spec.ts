import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadRequestComponent } from './file-upload-request.component';

describe('FileUploadRequestComponent', () => {
  let component: FileUploadRequestComponent;
  let fixture: ComponentFixture<FileUploadRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadRequestComponent]
    });
    fixture = TestBed.createComponent(FileUploadRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
