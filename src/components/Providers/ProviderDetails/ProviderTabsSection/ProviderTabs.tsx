import {Grid} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import { Tabs } from 'antd';
import CommandTable from './ProviderTabCommand/Table';
import ContactsTable from './ProviderTabContacts/Table';
import ProductsTable from './ProviderTabProducts/Table';

const ProviderTabs: React.FC = () => {
    const {t} = useTranslation('providers');
    const TabPane = Tabs.TabPane;

    function callback(key: string) {
        console.log(key);
    }

    return (
        <Grid className={styles.sectionItem} columns="3fr 0.1fr" rowGap={24} columnGap={24} >
            <Tabs  defaultActiveKey="1" style={{ color: '#999999'}} size="large" onChange={callback}>
                <TabPane tab={t('ProviderDetails.ProviderTabs.ProjectCommand.Title')} key="1">
                    <CommandTable />
                </TabPane>
                <TabPane tab={t('ProviderDetails.ProviderTabs.Contacts.Title')} key="2">
                    <ContactsTable />
                </TabPane>
                <TabPane tab={t('ProviderDetails.ProviderTabs.Products.Title')} key="3">    
                    <ProductsTable />
                </TabPane>
            </Tabs>
        </Grid>
    );
};

export default ProviderTabs;
