import {useState} from 'react';
import {Grid, RegularButton, Dropdown, DropdownItem} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import commonStyles from '../../Common.module.css';
import Filter from './Filter';
import Table from './Table';
import {ITaskListParams} from '../../../common/types/tasks';
import tasksApi from '../tasksApi';
import styles from './styles.module.css';

const TaskList: React.FC = () => {
    const {t} = useTranslation('tasks');

    const [page, setPage] = useState<Pick<ITaskListParams['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort] = useState<Pick<ITaskListParams['body'], 'sortField' | 'sortDirection'>>({
        sortField: 'createdAt',
        sortDirection: 'DESC',
    });

    const [searchBy] = useState<ITaskListParams['body']['searchBy']>({});

    const {data, isLoading} = tasksApi.endpoints.getTasks.useQuery({
        header: {securityCode: 'security_code'},
        body: {...page, ...sort, searchBy},
    });

    const handleSelect = () => {};

    // const handleFiltersSubmit = (filters: {}) => {
    //     setSearchBy(p => ({
    //         ...p,
    //         ...filters,
    //     }));
    // };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    return (
        <Grid rowGap={16}>
            <Filter />
            <Grid rowGap={16} className={commonStyles.panel}>
                <div className={styles.actionsBlock}>
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        value={undefined}
                        onSelect={handleSelect}
                    >
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                        <DropdownItem text="test" value={'test'} />
                    </Dropdown>

                    <RegularButton size="m">{t('Common.Run')}</RegularButton>
                </div>

                <Table onPageChange={handlePageChange} tableData={data!} isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default TaskList;
