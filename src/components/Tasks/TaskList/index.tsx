import {useState} from 'react';
import {Grid, RegularButton, Dropdown, DropdownItem} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ITaskListParams} from '../../../common/types/tasks';
import commonStyles from '../../Common.module.css';
import Filter, {TFilterFormState} from './Filter';
import Table from './Table';
import tasksApi from '../tasksApi';
import styles from './styles.module.css';

const TaskList: React.FC = () => {
    const {t} = useTranslation('tasks');

    const [action, setAction] = useState<string | undefined>();
    const [open, setOpen] = useState(false);

    const [page, setPage] = useState<Pick<ITaskListParams['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort] = useState<Pick<ITaskListParams['body'], 'sortField' | 'sortDirection'>>({
        sortField: 'createdAt',
        sortDirection: 'DESC',
    });

    const [searchBy, setSearchBy] = useState<ITaskListParams['body']['searchBy']>({});

    const {data, isLoading, isFetching} = tasksApi.endpoints.getTasks.useQuery({
        header: {securityCode: 'security_code'},
        body: {...page, ...sort, searchBy},
    });

    const handleSelect = (v: string | null) => {
        setAction(v || undefined);
    };

    const handleFiltersSubmit = (filters: TFilterFormState) => {
        setSearchBy(p => ({
            ...p,
            ...filters,
        }));
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    return (
        <Grid rowGap={16}>
            <Filter onSubmit={handleFiltersSubmit} />
            <Grid rowGap={16} className={commonStyles.panel}>
                <div className={styles.actionsBlock}>
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        value={action}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="Изменение утверждающего" value={'APPR'} />
                        <DropdownItem text="Изменение исполнителя" value={'EXEC'} />
                    </Dropdown>

                    <RegularButton
                        size="m"
                        onClick={() => {
                            if (action === 'APPR') {
                                setOpen(true);
                            }
                        }}
                    >
                        {t('Common.Run')}
                    </RegularButton>
                </div>

                <Table
                    onPageChange={handlePageChange}
                    tableData={data!}
                    isLoading={isLoading || isFetching}
                    isActionOpen={open}
                    onActionClose={() => setOpen(false)}
                />
            </Grid>
        </Grid>
    );
};

export default TaskList;
