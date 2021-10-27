import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneValidatorComponent } from './phone-validator.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Country} from '../model/country.model';
import {FormControl} from '@angular/forms';
import {PhoneValidationService} from '../service/phone-validation.service';
import {HttpClientStub} from '../shared/stub/http-client.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Observable, of} from "rxjs";
import {PhoneValidationApiResponse} from '../model/phone-validaton-api-responce.model';
import {By} from '@angular/platform-browser';

describe('PhoneValidatorComponent', () => {
  let component: PhoneValidatorComponent;
  let fixture: ComponentFixture<PhoneValidatorComponent>;
  let service: PhoneValidationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [ PhoneValidatorComponent ],
      providers: [PhoneValidationService],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(PhoneValidationService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the select country variable value when called', () => {
    // Arrange
    const value: Country = new Country('Tunisia', '+216', 'TN');
    // Act
    component.changeCountry(value);
    // Assert
    expect(component.selectedCountry).toBe(value);
  });

  it('should call the validatePhoneNumber method from the service', () => {
    // Arrange
    const number = 12345678;
    const countryCode = 'TN';
    component.phoneNumber = new FormControl();
    component.phoneNumber.setValue(number);
    component.selectedCountry = new Country('Tunisia', '+216', countryCode);
    const spy = spyOn(service, 'validatePhoneNumber').and.returnValue(of(new PhoneValidationApiResponse()));
    // Act
    component.validateNumber();
    // Assert
    expect(spy).toHaveBeenCalledOnceWith(number, countryCode);
    expect(component.$validationResult).toBeInstanceOf(Observable);
    expect(component.$validationResult).toBeTruthy();
  });

  it('should call the validateNumber Fn when the validation button is clicked', () => {
    // Arrange
    const button = fixture.debugElement.query(By.css('.submit-btn'));
    const spy = spyOn(component, 'validateNumber');
    // Act
    button.triggerEventHandler('click', {});
    // Assert
    expect(spy).toHaveBeenCalled();
  });
});
