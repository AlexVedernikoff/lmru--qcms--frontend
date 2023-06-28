import {FlagIcon} from '@fronton/icons-react';
import {useTranslation} from 'react-i18next';
import {usePostSearchQualityActionsQuery} from '../../../api/postSearchQualityActions';
import {IItemListTodo} from '../../../common/clientModels';
import {USER_EXTERNAL_ID} from '../../../common/mocks';
import get from 'lodash/get';
import {usePostQSearchProductsQuery} from '../../../api/postSearchProducts';
import {EUserRole} from '../../../common/roles';

export interface IUseQEorSQMItems {
    userRole: EUserRole;
}

export interface IUseQEorSQMItemsReturn {
    items: IItemListTodo[];
}

export function useQEorSQMItems({userRole}: IUseQEorSQMItems): IUseQEorSQMItemsReturn {
    const {t} = useTranslation('dashboard');
    const baseQualityActionsBody = {
        pageIndex: 0,
        pageSize: 20,
        searchBy: {
            responsible: [
                {
                    type: userRole,
                    externalId: USER_EXTERNAL_ID,
                },
            ],
        },
    };

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
    const qualifiedTasksData = {pageable: {totalElements: 10}};
    const certificationTasksData = {pageable: {totalElements: 10}};
    const transferDocsData = {pageable: {totalElements: 10}};

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

    // !временное решение! нужно добавить запросы
    const productsWithErrorsData = {pageable: {totalElements: 10}};

    const items: IItemListTodo[] = [
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
            label: t('List.QualifyingTasksLaunch'),
            valueImportant: undefined,
            value: get(qualifiedTasksData, 'pageable.totalElements', 0),
            isError: true,
        },
        {
            icon: FlagIcon,
            label: t('List.CertificationTasksLaunch'),
            valueImportant: undefined,
            value: get(certificationTasksData, 'pageable.totalElements', 0),
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
            label: t('List.TasksAwaitingValidation'),
            valueImportant: undefined,
            value: get(awaitingValidationTasksData, 'pageable.totalElements', 0),
            isLoading: isAwaitingValidationTasksLoading,
            isError: isAwaitingValidationTasksError,
        },
        {
            icon: FlagIcon,
            label: t('List.ProductsWithErrors'),
            valueImportant: undefined,
            value: get(productsWithErrorsData, 'pageable.totalElements', 0),
            isError: true,
        },
    ];

    return {items};
}
