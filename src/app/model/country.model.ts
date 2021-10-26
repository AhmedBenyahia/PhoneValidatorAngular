export class Country {
  countryName: string;
  diallingCode: string;
  countryCode: string


  constructor(countryName: string, diallingCode: string, countryCode: string) {
    this.countryName = countryName;
    this.diallingCode = diallingCode;
    this.countryCode = countryCode;
  }
}
