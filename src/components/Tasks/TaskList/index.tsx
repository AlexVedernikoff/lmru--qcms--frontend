import {useCallback, useState} from 'react';
import {Grid, RegularButton, Dropdown, DropdownItem} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ITaskListParams} from '../../../common/types/tasks';
import commonStyles from '../../Common.module.css';
import Filter, {TFilterFormState} from './Filter';
import Table from './Table';
import tasksApi from '../tasksApi';
import styles from './styles.module.css';
import {EModalVariant, TDataType} from './types';

const TaskList: React.FC = () => {
    const {t} = useTranslation('tasks');

    const [action, setAction] = useState<EModalVariant | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<TDataType[]>([]);

    const [page, setPage] = useState<Pick<ITaskListParams['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort] = useState<Pick<ITaskListParams['body'], 'sortField' | 'sortDirection'>>({
        sortField: 'createdAt',
        sortDirection: 'DESC',
    });

    const [searchBy, setSearchBy] = useState<ITaskListParams['body']['searchBy']>({});

    const {data, isLoading, isFetching, refetch} = tasksApi.endpoints.getTasks.useQuery(
        {
            header: {securityCode: 'security_code'},
            body: {...page, ...sort, searchBy},
        },
        {refetchOnMountOrArgChange: true}
    );

    const handleSelectRows = (_selectedRowKeys: React.Key[], selectedRows: TDataType[]) => {
        setSelected(selectedRows);
    };

    const handleSelect = (v: string | null) => {
        setAction((v as unknown as EModalVariant) || undefined);
    };

    const handleFiltersSubmit = (filters: TFilterFormState) => {
        setSearchBy({
            actionStatuses: filters.actionStatuses,
            awaitedDocumentTypes: filters.awaitedDocumentTypes,
            categoryTypeNames: filters.categoryTypeNames,
            categotyName: filters.categotyName,
            conclusions: filters.conclusions,
            dates: filters.dates,
            ean: filters.ean,
            isForUpdate: filters.isForUpdate,
            productCode: filters.productCode,
            productName: filters.productName,
            productQualityModel: filters.productQualityModel,
            productRange: filters.productRange,
            qualityActionId: filters.qualityActionId,
            responsible: filters.responsible,
            supplierName: filters.supplierName,
            supplierRMSCode: filters.supplierRMSCode,
            supplierTaxIdentifier: filters.supplierTaxIdentifier,
        });
    };

    const handlePageChange = (pageNumber: number = 1, pageSize: number) => {
        setPage({pageIndex: pageNumber - 1, pageSize});
    };

    const handleRunAction = () => {
        setOpen(true);
    };

    const handleActionClose = useCallback(
        (isCompleted?: boolean) => {
            setOpen(false);
            if (isCompleted) {
                refetch();
            }
        },
        [refetch]
    );

    return (
        <Grid rowGap={16}>
            <Filter onSubmit={handleFiltersSubmit} />
            <Grid rowGap={16} className={commonStyles.panel}>
                <div className={styles.actionsBlock}>
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        value={action as unknown as string}
                        onSelect={handleSelect}
                        disabled={isLoading || isFetching}
                        className={styles.actionsSelect}
                    >
                        <DropdownItem text="Добавить документы" value={EModalVariant.documents} />
                        <DropdownItem text="Изменение утверждающего" value={EModalVariant.approver} />
                        <DropdownItem text="Изменение исполнителя" value={EModalVariant.responsible} />
                    </Dropdown>

                    <RegularButton
                        size="m"
                        onClick={handleRunAction}
                        disabled={isLoading || isFetching || selected.length === 0 || !action}
                    >
                        {t('Common.Run')}
                    </RegularButton>
                </div>

                <Table
                    onPageChange={handlePageChange}
                    tableData={data!}
                    isLoading={isLoading || isFetching}
                    isActionOpen={open}
                    action={action}
                    onActionClose={handleActionClose}
                    selectedRows={selected}
                    setSelectedRows={handleSelectRows}
                />
            </Grid>
        </Grid>
    );
};

export default TaskList;
