import {Grid} from 'fronton-react';
import ProvidersFilter from './Filter';
import ProvidersTable from './Table';
import styles from '../../Common.module.css';
import {useGetProviders} from './hooks/useGetProviders';
import {useGetManagementNomenclatureQuery, useGetProductModelNomenclatureQuery} from '../services';

const ProvidersList: React.FC = () => {
    const {loadProvidersList} = useGetProviders({
        pageIndex: 1,
        pageSize: 1,
    });

    const {data: modelNomenclature} = useGetProductModelNomenclatureQuery();
    const {data: managementNomenclature} = useGetManagementNomenclatureQuery();

    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ProvidersFilter
                    modelNomenclature={modelNomenclature}
                    managementNomenclature={managementNomenclature}
                    loadProvidersList={loadProvidersList}
                />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ProvidersTable />
            </Grid>
        </Grid>
    );
};

export default ProvidersList;
