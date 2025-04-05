import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStudentModalComponent } from './register-student-modal.component';

describe('RegisterStudentModalComponent', () => {
  let component: RegisterStudentModalComponent;
  let fixture: ComponentFixture<RegisterStudentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterStudentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
