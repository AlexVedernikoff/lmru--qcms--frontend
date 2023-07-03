import {useState} from 'react';
import {Grid, Tab, TabList} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import DocumentsTab from './DetailsTabs/DocumentsTab/DocumentsTab';
import TasksTab from './DetailsTabs/TasksTab/TasksTab';

enum ETabs {
    documents,
    linkedTasks,
}

const ProductDetailsTabs: React.FC = () => {
    const {t} = useTranslation('products');
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
                <Tab>{t('ProductDetails.ProductDetailsTabs.DocumentsTab.Title')}</Tab>
                <Tab>{t('ProductDetails.ProductDetailsTabs.TasksTab.Title')}</Tab>
            </TabList>
            {tab === ETabs.documents && <DocumentsTab />}
            {tab === ETabs.linkedTasks && <TasksTab />}
        </Grid>
    );
};

export default ProductDetailsTabs;
