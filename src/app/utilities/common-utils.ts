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

export const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const toConsole = (label: string, value: any) => {
  const tc = value => console.log(label, value);
  R.tap(tc, value);
};

export const parseApiErrors = (response: any): string[] => {
  const result: string[] = [];
  
  if (R.isNotNil(R.path(['error'], response))) {
    if (R.equals('string', R.type(R.path(['error'], response)))) {
      result.push(R.path(['error'], response));
    }
    else {
      const errorsMap = R.path(['error', 'errors'], response);

      if(R.is(Object, errorsMap)) {
        // iterating over keys
        R.forEachObjIndexed((errorMsgs, field: any) => {
          // adding each error to the result array
          R.forEach(errorMsg => {
            result.push(`${field}: ${errorMsg}`);
          }, errorMsgs);
        }, errorsMap);
      }
    }
  }

  return result;
};

export class EntityActions {
  static readonly ADD: string = 'Add';
  static readonly UPDATE: string = 'Update';
  static readonly DELETE: string = 'Delete';
}