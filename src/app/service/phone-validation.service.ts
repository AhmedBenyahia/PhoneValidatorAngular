import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CountryApiResponce} from '../model/country-api-responce';
import {PhoneValidationApiResponse} from '../model/phone-validaton-api-responce.model';

@Injectable({
  providedIn: 'root'
})
export class PhoneValidationService {

  constructor(private http: HttpClient) { }

  getCountryList() {
    return this.http.get<CountryApiResponce>(
      `${environment.phoneValidationApi}/countries`,
      {params: {access_key: environment.access_key}});
  }

  validatePhoneNumber(number: number) {
    return this.http.get<PhoneValidationApiResponse>(
      `${environment.phoneValidationApi}/validate`,
      {params: {access_key: environment.access_key, number}});
  }
}
