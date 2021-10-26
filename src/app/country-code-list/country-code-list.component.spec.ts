import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCodeListComponent } from './country-code-list.component';

describe('CountryCodeListComponent', () => {
  let component: CountryCodeListComponent;
  let fixture: ComponentFixture<CountryCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCodeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
