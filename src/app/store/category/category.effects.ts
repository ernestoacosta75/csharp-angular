import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "@apis/category.service";
import * as CategoryActions from '@store/category/category.actions';
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import * as R from 'ramda';
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { categoryFeature } from './category.reducer';
import { CategoryDto } from "@models/category/category";
import { extractFriendlyErrorMessage } from "@shared/utilities/common-utils";

@Injectable()
export class CategoryEffects {

    constructor(private actions$: Actions, 
                private categoryService: CategoryService, 
                private router: Router,
                private store: Store) {

    }

    loadCategories$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.loadCategories),
        switchMap(action => this.categoryService.getAll(action.page, action.itemsToShowAmount)
        .pipe(
            map(response => {
                const categories = R.path<any>(['body'], response);
                const recordsTotalCount = +R.path(['headers'], response).get("recordsTotalCount");
                return CategoryActions.loadCategoriesSucess({ categories, recordsTotalCount })
            }),
            catchError(errors => of(CategoryActions.loadCategoriesFailure( { errors })))
        ))
    ));

    loadCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.loadCategory),
        switchMap(action => this.categoryService.getById(action.id)
        .pipe(
            map(response => {
                const category = R.path<any>(['body'], response);
                return CategoryActions.loadCategorySuccess({ category })
            }),
            catchError(errors => of(CategoryActions.loadCategoryFailure( { errors })))
        ))
    ));

    saveCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.saveCategory),
        withLatestFrom(this.store.select(categoryFeature.selectSubmittedValue)),
        switchMap(([ action, submittedValue ]) => {
            const category: CategoryDto = {
                id: submittedValue?.id || null,
                name: submittedValue.name
            };

            const actions$ = !category.id
                ? this.categoryService.create(category)
                : this.categoryService.update(category.id, category);

            return actions$
            .pipe(
                map(() => {
                    this.router.navigate(['/categories']);
                    return category.id
                        ? CategoryActions.updateCategorySuccess()
                        : CategoryActions.saveCategorySuccess();     
                }),
                catchError((errorResponse) => {
                    const errorMessage = extractFriendlyErrorMessage(errorResponse);
                    return of(CategoryActions.saveCategoryFailure( { errors: [errorMessage] }))
                })
            );            
        })
    ));

    deleteCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CategoryActions.deleteCategory),
        switchMap(({ id }) => this.categoryService.delete(id)
        .pipe(
            map(() =>{ 
                this.router.navigate(['/categories']);
                return CategoryActions.deleteCategorySuccess({ id });
            }),
            catchError(errors => of(CategoryActions.deleteCategoryFailure( { errors })))
        ))
    ));
}