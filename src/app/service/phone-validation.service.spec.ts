import { TestBed } from '@angular/core/testing';

import { PhoneValidationService } from './phone-validation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {environment} from '../../environments/environment';
import {CountryApiResponce} from '../model/country-api-responce';
import {PhoneValidationApiResponse} from '../model/phone-validaton-api-responce.model';

describe('PhoneValidationService', () => {

  // Variable Declaration
  let service: PhoneValidationService;
  let httpMock: HttpTestingController;
  let countries:CountryApiResponce;
  let phoneValidationRes = new PhoneValidationApiResponse();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(PhoneValidationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // to ensure that there are no outstanding requests to be made
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the list of countries', () => {
    // preparing the mocked result
    countries = {
      "AF": {
        "country_name": "Afghanistan",
        "dialling_code": "+93"
      },
      "AL": {
        "country_name": "Albania",
        "dialling_code": "+355"
      },
      "DZ": {
        "country_name": "Algeria",
        "dialling_code": "+213"
      },
    };

    // subscribe to the service
    service.getCountryList().subscribe((res) => {
      expect(res).toBe(countries);
    });

    // the service URL
    const url = `${environment.phoneValidationApi}/countries?access_key=${environment.access_key}`;
    // expect exactly one request that matches
    const req = httpMock.expectOne(url);
    // expect that the request methode is an GET
    expect(req.request.method).toBe('GET');
    // expect that the response type is JSON
    expect(req.request.responseType).toEqual('json');
    // The flush method completes the request using the data passed to it
    req.flush(countries);

  });

  it('should validate the phone number', () => {
    // preparing the mocked result
    const number = 21652458752;
    const countryCode = 'US';
    phoneValidationRes = {
      "valid": true,
      "number": 21653415455,
      "local_format": 53415455,
      "international_format": "+21653415455",
      "country_prefix": "+216",
      "country_code": "TN",
      "country_name": "Tunisia",
      "location": "",
      "carrier": "Orange Tunisie SA",
      "line_type": "mobile"
    }

    // subscribe to the service
    service.validatePhoneNumber(number, countryCode).subscribe((res) => {
      expect(res).toBe(phoneValidationRes);
    });

    // the service URL
    const url = `${environment.phoneValidationApi}/validate?access_key=${environment.access_key}&number=${number}&country_code=${countryCode}`;
    // expect exactly one request that matches
    const req = httpMock.expectOne(url);
    // expect that the request methode is an GET
    expect(req.request.method).toBe('GET');
    // expect that the response type is JSON
    expect(req.request.responseType).toEqual('json');
    // The flush method completes the request using the data passed to it
    req.flush(phoneValidationRes);

  });
});
