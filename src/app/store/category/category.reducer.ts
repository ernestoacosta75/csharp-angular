import { CategoryDto } from "@models/category/category";
import { createFeature, createReducer, on } from "@ngrx/store";
import { createFormGroupState, createFormStateReducerWithUpdate, FormGroupState, onNgrxForms, setValue, updateGroup, validate } from "ngrx-forms";
import { required } from "ngrx-forms/validation";
import * as CategoryActions from '@store/category/category.actions';

export interface CategoryFormValue {
    id?: string;
    name: string;
}

export interface CategoryState {
    categories: CategoryDto[];
    recordsTotalCount: number;
    categoryForm: FormGroupState<CategoryFormValue>;
    submittedValue: CategoryFormValue | undefined;
    loading: boolean;
    errors: string[] | null;
}

export const CATEGORY_FORM_ID = 'categoryForm';

export const INITIAL_CATEGORY_FORM_STATE = createFormGroupState<CategoryFormValue>(CATEGORY_FORM_ID, {
    id: '',
    name: ''
});

const validationCategoryFormGroupReducer = createFormStateReducerWithUpdate<CategoryFormValue>(
    updateGroup<CategoryFormValue>({
        name: validate(required)
}));

const initialState: CategoryState = {
    categories: [],
    recordsTotalCount: 0,
    categoryForm: INITIAL_CATEGORY_FORM_STATE,
    submittedValue: undefined,
    loading: false,
    errors: null
};

export const categoryFeature = createFeature({
    name: 'categories',
    reducer: (state: CategoryState | undefined, action): CategoryState => {
        if(!state) {
            state = initialState;
        }

        const categoryFormStateUpdated = validationCategoryFormGroupReducer(state?.categoryForm, action);

        return createReducer(
            state,
            onNgrxForms(),
            on(CategoryActions.loadCategories, (state) => ({
                ...state,
                loading: true,
                errors: []
            })),           
            on(CategoryActions.loadCategoriesSucess, (state, { categories, recordsTotalCount }) => ({
                ...state,
                categories,
                recordsTotalCount,
                loading: false
            })),
            on(CategoryActions.loadCategoriesFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CategoryActions.loadCategory, (state, { id }) => ({
                ...state,
                loading: true,
                errors: []
            })), 
            on(CategoryActions.loadCategorySuccess, (state) => ({
                ...state,
                loading: false
            })),
            on(CategoryActions.loadCategoryFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CategoryActions.saveCategory, state => ({
                ...state,
                loading: true,
                error: null
            })),
            on(CategoryActions.saveCategorySuccess, (state) => ({
                ...state,
                categoryForm: INITIAL_CATEGORY_FORM_STATE,
                loading: false
            })),
            on(CategoryActions.saveCategoryFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CategoryActions.updateCategorySuccess, (state) => ({
                ...state,
                loading: false
            })),
            on(CategoryActions.updateCategoryFailure, (state, { errors }) => ({
                ...state,
                errors,
                loading: false
            })),
            on(CategoryActions.setCategoryFormValue, (state,  { existingValue }) => ({
                ...state,
                categoryForm: updateGroup<CategoryFormValue>({
                    id: setValue(existingValue.id || ''),
                    name: setValue(existingValue.name)
                })(state.categoryForm),
            })),              
            on(CategoryActions.setSubmmittedValue, (state,  { submittedValue }) => ({
                ...state,
                submittedValue
            }))
        )({
            ...state, 
            categoryForm: categoryFormStateUpdated
        }, action);
    }
});