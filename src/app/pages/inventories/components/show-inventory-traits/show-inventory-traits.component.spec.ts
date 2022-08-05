import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowInventoryTraitsComponent } from './show-inventory-traits.component';

describe('ShowInventoryTraitsComponent', () => {
  let component: ShowInventoryTraitsComponent;
  let fixture: ComponentFixture<ShowInventoryTraitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowInventoryTraitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowInventoryTraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
