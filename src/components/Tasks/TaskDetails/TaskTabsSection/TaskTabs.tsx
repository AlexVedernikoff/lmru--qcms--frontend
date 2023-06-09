import {useState} from 'react';
import {Grid, Tab, TabList} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import NotificationsTable from './TaskTabNotifications/Table';
import TasksTable from './TaskTabTasks/Table';
import TaskTabDocuments from './TaskTabDocuments';
import {PropsTaskDetails} from '../TaskDetails';

enum ETabs {
    documents,
    notifications,
    linkedTasks,
}

const TaskTabs: React.FC<PropsTaskDetails> = props => {
    const {taskDetails} = props;
    const {t} = useTranslation('tasks');
    const [tab, setTab] = useState<ETabs>(ETabs.documents);

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
            {tab === ETabs.documents && <TaskTabDocuments taskDetails={taskDetails} />}
            {tab === ETabs.notifications && <NotificationsTable taskDetails={taskDetails} />}
            {tab === ETabs.linkedTasks && <TasksTable taskDetails={taskDetails} />}
        </Grid>
    );
};

export default TaskTabs;
