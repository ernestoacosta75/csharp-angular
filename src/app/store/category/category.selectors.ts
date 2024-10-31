import { createSelector } from "@ngrx/store";
import { categoryFeature } from "./category.reducer";
import { categoryDefaultValues } from "@models/default-values/default-values";
import { MultipleSelectorDto } from "@models/multiple-selector/multipleselectordto";

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

export const selectCategoriesAsMultipleSelectorDto = createSelector(
    categoryFeature.selectCategories,
    (categories) => {
        if (!categories || !Array.isArray(categories)) {
            return categoryDefaultValues; 
        }
        
        const categoryEntries = categories.map((category, index) => {
            return {
                key: index + 1, // Incremental key starting from 1
                value: category.name, // Assuming 'name' is the property for value
                type: 'Category'
            } as MultipleSelectorDto;
        });

        const combinedEntries: MultipleSelectorDto[] = [...categoryDefaultValues, ...categoryEntries];

        // Filtering out duplicates based on 'value'
        const uniqueEntries = combinedEntries.reduce<MultipleSelectorDto[]>((acc, entry) => {
            const isDuplicate = acc.some(existing => existing.value.toLowerCase() === entry.value.toLowerCase());

            if (!isDuplicate) {
                acc.push(entry);
            }

            return acc;
        }, []);

        return uniqueEntries.map((entry, index) => ({
            ...entry,
            key: index + 1
        }));
    }
);

export const selectCategoryById = (id: string | number) => 
createSelector(
    selectCategoriesDictionary,
    (categoriesDictionary) => categoriesDictionary[id]
);