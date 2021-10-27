export class PhoneValidationApiResponse {
  valid!: boolean;
  number!: number;
  local_format!: number;
  international_format!: string;
  country_prefix!: string;
  country_code!: string;
  country_name!: string;
  location!: string;
  carrier!: string;
  line_type!: string
  success?: boolean;
  error?: {
    code: number;
    type: string;
    info: string
  }
}
