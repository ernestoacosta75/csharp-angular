import {
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import * as R from 'ramda';

/**
 * This is a constant Map object that maps validator names to their error messages
 * and validator errors key. The error messages can include placeholders in the form
 * of {x} which will be replaced with the corresponding argument passed to stringFormat.
 *
 * validatorErrorsKey is an optional array of validator error. These arrays are used to
 * extract the necessary values from the validatorErrors object to be passed as arguments
 * to stringFormat.
 */
const messages = new Map<
  string,
  { message: string; validatorErrorsKey?: string[] }
>([
  ['required', { message: 'This field is required' }],
  [
    'minlength',
    {
      message: 'This field must be at least {0} characters long',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  [
    'maxlength',
    {
      message: 'This field must be at most {0} characters long',
      validatorErrorsKey: ['requiredLength'],
    },
  ],
  ['min', { message: 'This field must be at least {0}' }],
  ['max', { message: 'This field must be at most {0}' }],
  ['pattern', { message: 'This field must match the pattern {0}' }],
  ['email', { message: 'This field must be a valid email address' }],
  ['forbiddenName', { message: 'This name is forbidden' }],
  ['forbiddenSurname', { message: 'This surname is forbidden' }],
  ['forbiddenUsername', { message: 'This username is forbidden' }],
]);

/**
 * This function takes a string template as its firts argument and a list of variable arguments.
 * It replaces occurences of {x} in the template with the corresponding argument from the list.
 * If the argument at the specified index is not defined, the original {x} is left in the string.
 * @param template
 * @param args
 * @returns
 */
const stringFormat = (
  template: string | undefined,
  ...args: any[]
): string | undefined => {
  if (!template) {
    return undefined;
  }

  return template.replace(/{(\d+)}/g, (match, index) => {
    const arg = args[parseInt(index, 10)];
    return typeof arg !== 'undefined' ? arg : match;
  });
};

export const firstLetterUpperCase = (): ValidatorFn => {
  return (control: AbstractControl) => {
    const value = <string>control.value;

    const isValid = R.pipe(
      R.defaultTo(''),
      R.head,
      R.toUpper,
      R.equals(R.__, R.head(value))
    )(value);

    if (!isValid) {
      return {
        firstLetterUpperCase: {
          message: 'The first letter must be capitalized',
        },
      };
    }
  };
};

const getCustomValidatorFn = (validatorName: string): ValidatorFn => {
  switch (validatorName) {
    case 'firstLetterUpperCase':
      return firstLetterUpperCase();
    default:
      return null;
  }
}

/**
 * This function takes two arguments:
 * @param validatorName
 * @param validatorErrors
 * @returns
 *
 * The function first retreives the object {message: string, validatorErrorsKey?: string[]}
 * associated with the validator name from the messages map.
 */
export const getValidatorErrorMessage = (
  validatorName: string,
  control: AbstractControl
): string | undefined => {
  const validatorMessage = messages.get(validatorName)?.message;
  const validatorErrorsKey = messages.get(validatorName)?.validatorErrorsKey;

  if (validatorErrorsKey && control.errors) {
    const args = validatorErrorsKey.map((name) => {
        const errorKey = Object.keys(control.errors).find(key => control.errors[key].hasOwnProperty(name));

        return errorKey ? control.errors[errorKey][name] : undefined;
    });
    return stringFormat(validatorMessage, ...args);
  } else {
    const customValidatorFn = getCustomValidatorFn(validatorName);
    if (customValidatorFn) {
      const errorMessage = customValidatorFn(control);
      if (errorMessage && errorMessage[validatorName]) {
        return errorMessage[validatorName].message;
      }
    }
  }

  return validatorMessage;
};
