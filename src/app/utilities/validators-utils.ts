import { ValidationErrors } from "@angular/forms";

/**
 * This is a constant Map object that maps validator names to their error messages
 * and validator errors key. The error messages can include placeholders in the form
 * of {x} which will be replaced with the corresponding argument passed to stringFormat.
 * 
 * validatorErrorsKey is an optional array of validator error. These arrays are used to
 * extract the necessary values from the validatorErrors object to be passed as arguments
 * to stringFormat.
 */
const messages = new Map<string, {message: string, validatorErrorsKey?: string[]}>([
    ['required', {message: 'This field is required'}],
    ['minlength', {message: 'This field must be at least ${requiredLength} characters long'}],
    ['maxlength', {message: 'This field must be at most ${requiredLength} characters long'}],
    ['min', {message: 'This field must be at least ${requiredLength}'}],
    ['max', {message: 'This field must be at most ${requiredLength}'}],
    ['pattern', {message: 'This field must match the pattern ${requiredPattern}'}],
    ['email', {message: 'This field must be a valid email address'}],
    ['forbiddenName', {message: 'This name is forbidden'}],
    ['forbiddenSurname', {message: 'This surname is forbidden'}],
    ['forbiddenUsername', {message: 'This username is forbidden'}],
]);


/**
 * This function takes a string template as its firts argument and a list of variable arguments.
 * It replaces occurences of {x} in the template with the corresponding argument from the list.
 * If the argument at the specified index is not defined, the original {x} is left in the string.
 * @param template
 * @param args 
 * @returns 
 */
const stringFormat = (template: string | undefined, ...args: any[]) => {
    if (template) {
        return template.replace(/{(\d+)}/g, (match, index) => {
            return typeof args[index] !=='undefined'? args[index] : match;
        });
    }

    return undefined;
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
export const getValidatorErrorMessage = (validatorName: string, validatorErrors?: ValidationErrors): string | undefined => {
    let args = messages.get(validatorName)?.validatorErrorsKey?.map(name => validatorErrors?.[name]);

    return (args) ? stringFormat(messages.get(validatorName)?.message, args) : messages.get(validatorName)?.message;
};