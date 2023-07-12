import {Grid} from 'fronton-react';
import DocumentsFilter from './DocumentsFilter';
import DocumentsTable from './DocumentsTable';
import styles from '../../Common.module.css';
import {useAppSelector} from 'store';
import {EUserRole} from 'common/roles';
import {Navigate} from 'react-router-dom';
import {APP_ROUTES} from 'common/consts';

const ProductsWithDocuments: React.FC = () => {
    const roles = useAppSelector(store => store.userStore.userData!.roles);

    const hasUserProdDocsPermission =
        roles.includes(EUserRole.Admin) ||
        roles.includes(EUserRole.KeyUser) ||
        roles.includes(EUserRole.QE) ||
        roles.includes(EUserRole.SQM) ||
        roles.includes(EUserRole.InternalUser);

    if (!hasUserProdDocsPermission) {
        return <Navigate to={APP_ROUTES.dashboard} />;
    }

    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <DocumentsFilter />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <DocumentsTable />
            </Grid>
        </Grid>
    );
};

export default ProductsWithDocuments;
