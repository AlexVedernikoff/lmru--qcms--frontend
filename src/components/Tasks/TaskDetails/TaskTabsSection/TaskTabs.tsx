import {Grid, Tab} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import { TabList } from 'fronton-react';
import { useState } from 'react';
import NotificationsTable from './TaskTabNotifications/Table'
import TasksTable from './TaskTabTasks/Table';

const TaskTabs: React.FC = () => {
    const {t} = useTranslation('tasks');
    const [tab, setTab] = useState(0);

    return (
        <Grid className={styles.sectionItem} columns="1fr" rowGap={24} columnGap={24}>
            <TabList
                active={tab}
                style={{color: '#999999'}}
                size="l"
                onChangeTab={function noRefCheck(_, tab) {
                    setTab(tab);
                }}
            >
                <Tab>{t('TaskTabs.Documents.Title')}</Tab>
                <Tab>{t('TaskTabs.Notifications.Title')}</Tab>
                <Tab>{t('TaskTabs.Tasks.Title')}</Tab>
            </TabList>
            {tab === 1 && <NotificationsTable />}
            {tab === 2 && <TasksTable />}
        </Grid>
    );
};

export default TaskTabs;
