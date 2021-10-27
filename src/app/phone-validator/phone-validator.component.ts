import { Component, OnInit } from '@angular/core';
import {Country} from '../model/country.model';
import {FormControl, Validators} from '@angular/forms';
import {PhoneValidationService} from '../service/phone-validation.service';
import {Observable} from 'rxjs';
import {PhoneValidationApiResponse} from '../model/phone-validaton-api-responce.model';

@Component({
  selector: 'app-phone-validator',
  templateUrl: './phone-validator.component.html',
  styleUrls: ['./phone-validator.component.css']
})
export class PhoneValidatorComponent implements OnInit {

  selectedCountry!: Country;
  phoneNumber = new FormControl('', [Validators.required]);

  // We are subscribing in the template with the async pipe
  $validationResult!: Observable<PhoneValidationApiResponse>;

  constructor(private _phoneValidationService: PhoneValidationService) { }

  ngOnInit(): void {
  }

  changeCountry(country: Country) {
    this.selectedCountry = country;
  }

  validateNumber() {
    this.$validationResult = this._phoneValidationService.validatePhoneNumber(
      this.phoneNumber.value,
      this.selectedCountry?.countryCode ?? '');
  }
}
