import * as R from 'ramda';

export const appendQueryString = (key, path, formValues, queryStrings) => 
    R.ifElse(
        R.path(path),
        R.append(`${key}=${R.path(path, formValues)}`),
        R.identity
    )(queryStrings);

export const updateQueryStrings = (formValues, queryStrings) =>
    R.pipe(
        R.partial(appendQueryString, ['title', ['title']]),
        R.partial(appendQueryString, ['gender', ['genderId']]),
        R.partial(appendQueryString, ['nextReleases', ['nextReleases']]),
        R.partial(appendQueryString, ['onCinemas', ['onCinemas']])
    )(formValues, queryStrings); 