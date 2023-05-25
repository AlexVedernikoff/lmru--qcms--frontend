import {Grid, RegularButton, Dropdown, DropdownItem} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import commonStyles from '../../Common.module.css';
import Filter from './Filter';
import Table from './Table';
import styles from './styles.module.css';

const TaskList: React.FC = () => {
    const {t} = useTranslation('tasks');

    const handleSelect = () => {};

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

                <Table />
            </Grid>
        </Grid>
    );
};

export default TaskList;
