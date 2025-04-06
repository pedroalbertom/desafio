import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementDialogComponent } from './admin-management-dialog.component';

describe('AdminManagementDialogComponent', () => {
  let component: AdminManagementDialogComponent;
  let fixture: ComponentFixture<AdminManagementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManagementDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
