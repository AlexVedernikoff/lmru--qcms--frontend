import {Grid, Tab} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import {TabList} from 'fronton-react';
import CommandTable from './ProviderTabCommand/Table';
import ContactsTable from './ProviderTabContacts/Table';
import ProductsTable from './ProviderTabProducts/Table';
import {useState} from 'react';

const ProviderTabs: React.FC = () => {
    const {t} = useTranslation('providers');
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
                <Tab>{t('ProviderDetails.ProviderTabs.ProjectCommand.Title')}</Tab>
                <Tab>{t('ProviderDetails.ProviderTabs.Contacts.Title')}</Tab>
                <Tab>{t('ProviderDetails.ProviderTabs.Products.Title')}</Tab>
            </TabList>
            {tab === 0 && <CommandTable />}
            {tab === 1 && <ContactsTable />}
            {tab === 2 && <ProductsTable />}
        </Grid>
    );
};

export default ProviderTabs;
