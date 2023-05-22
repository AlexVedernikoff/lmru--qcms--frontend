import {Grid} from 'fronton-react';
import DocumentsFilter from './DocumentsFilter';
import DocumentsTable from './DocumentsTable';
import styles from '../../Common.module.css';

const ProductsWithDocuments: React.FC = () => {
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
