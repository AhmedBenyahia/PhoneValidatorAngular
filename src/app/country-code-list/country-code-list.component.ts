import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PhoneValidationService} from '../service/phone-validation.service';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Country} from '../model/country.model';
import {MatSelectChange} from '@angular/material/select';
import {UtilitiesService} from '../service/utilities.service';

@Component({
  selector: 'app-country-code-list',
  templateUrl: './country-code-list.component.html',
  styleUrls: ['./country-code-list.component.css']
})
export class CountryCodeListComponent implements OnInit {

  @Output() countryChange = new EventEmitter<Country>();

  $countries: Observable<Country[]>;

  constructor(private _phoneValidationService: PhoneValidationService, private _utilService: UtilitiesService) {
    this.$countries = this._phoneValidationService.getCountryList().pipe(map(_utilService.mapApiCountryResponse));
  }

  ngOnInit(): void {
  }

  selectCountry(selectedCountry: MatSelectChange) {
    this.countryChange.emit(selectedCountry.value);
  }
}
