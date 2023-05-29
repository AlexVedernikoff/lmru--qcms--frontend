import {CardTodo} from '../Common/CardTodo';
import {FlagIcon} from '@fronton/icons-react';
import {useTranslation} from 'react-i18next';
import {IItemListTodo} from '../../common/models';

export const DashboardQE = () => {
    const {t} = useTranslation('dashboard');

    const items: IItemListTodo[] = [
        {
            icon: FlagIcon,
            label: t('List.ReChecking'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.QualifyingTasksLaunch'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.CertificationTasksLaunch'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.TransferDocuments'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.TasksAwaitingValidation'),
            valueImportant: 2,
            value: 4,
        },
        {
            icon: FlagIcon,
            label: t('List.ProductsWithErrors'),
            valueImportant: 2,
            value: 4,
        },
    ];

    return (
        <>
            <span></span>
            <CardTodo items={items} />
        </>
    );
};
