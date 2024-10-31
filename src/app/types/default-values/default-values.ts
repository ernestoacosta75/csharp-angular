import { MultipleSelectorDto } from "@models/multiple-selector/multipleselectordto";

export const cinemaDefaultValues: MultipleSelectorDto[] = [
    { key: 1, value: 'Sambil', type: 'Cinema' },
    { key: 2, value: 'Agora', type: 'Cinema' },
    { key: 3, value: 'Acropolis', type: 'Cinema' }
];

export const categoryDefaultValues: MultipleSelectorDto [] = [
    { key: 1, value: 'Drama', type: 'Category' },
    { key: 2, value: 'Action', type: 'Category' },
    { key: 3, value: 'Comedy', type: 'Category' }
];

export const RECORDS_AMOUNT_TO_SHOW = 10;
export const CURRENT_PAGE = 1;
  