import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentManagementDialogComponent } from './student-management-dialog.component';

describe('StudentManagementDialogComponent', () => {
  let component: StudentManagementDialogComponent;
  let fixture: ComponentFixture<StudentManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentManagementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
