import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCodeListComponent } from './country-code-list.component';
import {Country} from '../model/country.model';
import {MatSelectChange} from '@angular/material/select';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('CountryCodeListComponent', () => {
  let component: CountryCodeListComponent;
  let fixture: ComponentFixture<CountryCodeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCodeListComponent ],
      imports: [
        HttpClientTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
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

  it('should call emit an event when selectCountry FN is called ', () => {
    // Arrange
    const value: Country = new Country('Tunisia', '+216', 'TN');
    const spy = spyOn(component.countryChange, 'emit');
    // Act
    // @ts-ignore
    component.selectCountry(new MatSelectChange(null, value));
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledOnceWith(value);
  });


  it('should call the selectCountry Fn when the select value change', () => {
    // Arrange
    const button = fixture.debugElement.query(By.css('mat-select'));
    const spy = spyOn(component, 'selectCountry');
    // Act
    button.triggerEventHandler('selectionChange', {});
    // Assert
    expect(spy).toHaveBeenCalled();
    // @ts-ignore
  });
});
