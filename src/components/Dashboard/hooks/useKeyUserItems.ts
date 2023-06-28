import {FlagIcon} from '@fronton/icons-react';
import {useTranslation} from 'react-i18next';
import {usePostSearchQualityActionsQuery} from '../../../api/postSearchQualityActions';
import {IItemListTodo} from '../../../common/clientModels';
import {USER_EXTERNAL_ID} from '../../../common/mocks';
import get from 'lodash/get';
import {usePostQSearchProductsQuery} from '../../../api/postSearchProducts';

const baseQualityActionsBody = {
    pageIndex: 0,
    pageSize: 20,
    searchBy: {
        responsible: [
            {
                externalId: USER_EXTERNAL_ID,
            },
        ],
    },
};

export interface IUseKeyUserItemsReturn {
    items: IItemListTodo[];
}

export function useKeyUserItems(): IUseKeyUserItemsReturn {
    const {t} = useTranslation('dashboard');

    const {
        data: reCheckData = {pageable: {totalElements: 0}},
        isLoading: isReCheckLoading,
        isError: isReCheckError,
    } = usePostSearchQualityActionsQuery({
        ...baseQualityActionsBody,
        searchBy: {
            ...baseQualityActionsBody.searchBy,
            actionStatuses: ['RETURNED_AWAITING_DOCUMENT_LOADING', 'RETURNED_AWAITING_RESOLUTION'],
        },
    });

    // !временное решение! нужно добавить запросы
    const qualifiedTasksData = {pageable: {totalElements: 10}};
    const transferDocsData = {pageable: {totalElements: 10}};
    const productsWithErrorsData = {pageable: {totalElements: 10}};

    const {
        data: productsWithoutModelData = {pageable: {totalElements: 0}},
        isLoading: isProductsWithoutModelLoading,
        isError: isProductsWithoutModelError,
    } = usePostQSearchProductsQuery({
        searchBy: {
            withQualityModel: false,
        },
    });

    // !временное решение! нужно добавить запросы
    const certificationTasksData = {pageable: {totalElements: 10}};
    const additionalQualificationProductsData = {pageable: {totalElements: 10}};

    const {
        data: awaitingValidationTasksData = {pageable: {totalElements: 0}},
        isLoading: isAwaitingValidationTasksLoading,
        isError: isAwaitingValidationTasksError,
    } = usePostSearchQualityActionsQuery({
        ...baseQualityActionsBody,
        searchBy: {
            ...baseQualityActionsBody.searchBy,
            actionStatuses: ['AWAITING_RESOLUTION', 'RETURNED_AWAITING_RESOLUTION'],
        },
    });

    const items: IItemListTodo[] = [
        {
            icon: FlagIcon,
            label: t('List.ReChecking'),
            valueImportant: undefined,
            value: get(reCheckData, 'pageable.totalElements', 0),
            isLoading: isReCheckLoading,
            isError: isReCheckError,
        },
        {
            icon: FlagIcon,
            label: t('List.QualifyingTasksLaunch'),
            valueImportant: undefined,
            value: get(qualifiedTasksData, 'pageable.totalElements', 0),
            isError: true,
        },
        {
            icon: FlagIcon,
            label: t('List.TransferDocuments'),
            valueImportant: undefined,
            value: get(transferDocsData, 'pageable.totalElements', 0),
            isError: true,
        },
        {
            icon: FlagIcon,
            label: t('List.ProductsWithErrors'),
            valueImportant: undefined,
            value: get(productsWithErrorsData, 'pageable.totalElements', 0),
            isError: true,
        },
        {
            icon: FlagIcon,
            label: t('List.ProductsWithoutQualityModels'),
            valueImportant: undefined,
            value: get(productsWithoutModelData, 'pageable.totalElements', 0),
            isLoading: isProductsWithoutModelLoading,
            isError: isProductsWithoutModelError,
        },
        {
            icon: FlagIcon,
            label: t('List.CertificationTasksLaunch'),
            valueImportant: undefined,
            value: get(certificationTasksData, 'pageable.totalElements', 0),
        },
        {
            icon: FlagIcon,
            label: t('List.AdditionalQualificationProducts'),
            valueImportant: undefined,
            value: get(additionalQualificationProductsData, 'pageable.totalElements', 0),
        },
        {
            icon: FlagIcon,
            label: t('List.TasksAwaitingValidation'),
            valueImportant: undefined,
            value: get(awaitingValidationTasksData, 'pageable.totalElements', 0),
            isLoading: isAwaitingValidationTasksLoading,
            isError: isAwaitingValidationTasksError,
        },
    ];

    return {items};
}
