import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PhoneValidationService} from '../service/phone-validation.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Country} from '../model/country.model';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-country-code-list',
  templateUrl: './country-code-list.component.html',
  styleUrls: ['./country-code-list.component.css']
})
export class CountryCodeListComponent implements OnInit {

  @Output() countryChange = new EventEmitter<Country>();

  $countries: Observable<Country[]>;

  constructor(private _phoneValidationService: PhoneValidationService) {
    this.$countries = this._phoneValidationService.getCountryList()
      .pipe(map(countries => {
        let result: Country[] = [];
        Object.keys(countries).forEach(country =>
          result.push(new Country(countries[country].country_name, countries[country].dialling_code, country)))
        return result;
      }));
  //  TODO: Refactor this and make the component stateless
  }

  ngOnInit(): void {

  }

  selectCountry(selectedCountry: MatSelectChange) {
    this.countryChange.emit(selectedCountry.value);
  }
}
