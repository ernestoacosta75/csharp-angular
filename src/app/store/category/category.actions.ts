import { CategoryDto } from "@models/category/category";
import { createAction, props } from "@ngrx/store";
import { CategoryFormValue } from "./category.reducer";

export const loadCategories = createAction('[Category] Load Categories', props<{ page: number, itemsToShowAmount: number }>());
export const loadCategoriesSucess = createAction('[Category] Load Categories Success', props<{ categories: CategoryDto[], recordsTotalCount: number }>());
export const loadCategoriesFailure = createAction('[Category] Load Categories Failure', props<{ errors: string[] }>());

export const loadCategory = createAction('[Category] Load Category', props<{ id: string }>());
export const loadCategorySuccess = createAction('[Category] Load Category Success', props<{ category: CategoryDto }>());
export const loadCategoryFailure = createAction('[Category] Load Category Failure', props<{ errors: string[] }>());

export const saveCategory = createAction('[Category] Save Category');
export const saveCategorySuccess = createAction('[Category] Save Category Success');
export const saveCategoryFailure = createAction('[Category] Save Category Failure', props<{ errors: string[] }>());

export const updateCategorySuccess = createAction('[Category] Update Category Success');
export const updateCategoryFailure = createAction('[Category] Update Category Failure', props<{ errors: string[] }>());

export const deleteCategory = createAction('[Category] Delete Category', props<{ id: string }>());
export const deleteCategorySuccess = createAction('[Category] Delete Category Success', props<{ id: string }>());
export const deleteCategoryFailure = createAction('[Category] Delete Category Failure', props<{ errors: string[] }>());

export const setCategoryFormValue = createAction('[Actor] SetCategoryForm Value', props<{ existingValue: CategoryFormValue }>());
export const setSubmmittedValue = createAction('[Category] Set Submitted Value', props<{ submittedValue: CategoryFormValue }>());