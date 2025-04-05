import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentDialogComponent } from './register-student-dialog.component';

describe('RegisterStudentDialogComponent', () => {
  let component: RegisterStudentDialogComponent;
  let fixture: ComponentFixture<RegisterStudentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStudentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
