import { createSelector } from "@ngrx/store";
import { categoryFeature } from "./category.reducer";

export const selectCategoriesListViewModel = createSelector(
    categoryFeature.selectCategories,
    categoryFeature.selectRecordsTotalCount,
    categoryFeature.selectCategoryForm,
    categoryFeature.selectSubmittedValue,
    categoryFeature.selectLoading,
    categoryFeature.selectErrors,
    (categories, recordsTotalCount, categoryForm, submittedValue, loading, errors) => ({ categories, recordsTotalCount, categoryForm, submittedValue, loading, errors })
);

export const selectCategoriesDictionary = createSelector(
    categoryFeature.selectCategories,
    (categories) => {
        if (!categories || !Array.isArray(categories)) {
            return {}; // Return an empty dictionary if actors are not valid
        }
        
        return categories.reduce((acc, category) => {
            // Check if actor has an id
            if (category && category.id) {
                acc[category.id] = category;
            }
            return acc;
        }, {} as { [id: string]: typeof categories[0]});
    }
);

export const selectCategoryById = (id: string | number) => 
createSelector(
    selectCategoriesDictionary,
    (categoriesDictionary) => categoriesDictionary[id]
);