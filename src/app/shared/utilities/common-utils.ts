import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActorDto } from '@models/actor/actor-dto';
import { ActorFormValue } from '@store/actor/actor.reducer';
import { NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';
import * as R from 'ramda';
import Swal, { SweetAlertIcon } from 'sweetalert2';

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

export const base64ToFile = (base64: string, filename: string): File => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/);
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type: mime? mime[1] : undefined});
}

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

export const showPopup = (title: string, text: string, icon: SweetAlertIcon, showCancelBt: boolean) => Swal.fire({
  title: title,
  text: text,
  icon: icon,
  showCancelButton: showCancelBt
})

export const formatDate = (date: Date) => {
  date = new Date(date);
  
  const format = new Intl.DateTimeFormat(
    'en',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }
  );

  // taking the array returned by format.formatToParts(date)
  // and destructuring the first three objects  in the array,
  // that correspond to month, day, and yer. 
  const [
    {value: month},,
    {value: day},,
    {value: year}
  ] = format.formatToParts(date);

  return `${year}-${month}-${day}`;
}

export const getDateValueConverter = (): NgrxValueConverter<Date | null, string | null> => {
  return {
    convertViewToStateValue: (value) => {
      if(value === null) {
        return null;
      }

      // the value provided by the date picker is in local time but will be recreated with the date as UTC
      value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
  };
};

export const transformActorApiResponse = (apiResponse: any): ActorFormValue => {
  return {
    ...apiResponse,
    dateOfBirth: typeof apiResponse.dateOfBirth === 'string'
      ? (apiResponse.dateOfBirth as string).substring(0, 10)
      : (apiResponse.dateOfBirth as Date).toISOString().substring(0, 10),
    picture: typeof apiResponse.picture === 'string' ? apiResponse.picture : '',
  };
};

export class EntityActions {
  static readonly ADD: string = 'Add';
  static readonly UPDATE: string = 'Update';
  static readonly DELETE: string = 'Delete';
}
