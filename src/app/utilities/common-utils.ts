import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as R from 'ramda';

export const writeSearchParametersOnUrl = (formValues: any): string => {
  const queryStrings = [];

  R.forEachObjIndexed((value, key) => {
    if (typeof key !== 'symbol') {
      if (R.is(String, value) && value.trim() !== '') {
        queryStrings.push(`${key}=${encodeURIComponent(value)}`);
      } else if (R.is(Number, value) && value !== 0) {
        queryStrings.push(`${key}=${value}`);
      } else if (R.is(Boolean, value)) {
        queryStrings.push(`${key}=${value}`);
      }
    }
  }, formValues);

  return R.reject(R.is(Object), queryStrings).join('&');
};

export const readQueryParamsFromActivatedRoute = (activatedRoute: ActivatedRoute, form: FormGroup): any => {
    activatedRoute.queryParams.subscribe((params) => {
        var obj: any = {};
  
        const addPropertyIfExists = (param: string) => {
          if (params[param]) {
            obj[param] = params[param];
          }
        };
  
        const queryParamsToRead = Object.keys(params);
  
        R.forEach(addPropertyIfExists, queryParamsToRead);

        return obj;
      });
};
