import { TestBed } from '@angular/core/testing';

import { UtilitiesService } from './utilities.service';
import {Country} from '../model/country.model';

describe('UtilitieService', () => {
  let service: UtilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map the result of get country api', () => {
    // Prepare
    const countries = {
      "AF": {
        "country_name": "Afghanistan",
        "dialling_code": "+93"
      }
    };

    const countryArray = [new Country('Afghanistan', '+93', 'AF')]

    // Act
    const result = service.mapApiCountryResponse(countries);
    // Validate
    expect(result).toEqual(countryArray);
  });
});
