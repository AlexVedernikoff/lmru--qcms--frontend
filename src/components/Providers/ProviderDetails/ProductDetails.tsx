import {Grid, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import ProviderDetailsInfoSection from './ProviderDetailsInfoSection';
import ProviderTabsSection from './ProviderTabsSection';
import {useGetSupplierDetsQuery} from '../../../api/getSupplierDetails';

const ProviderDetails: React.FC = () => {
    const {id: supplierId = ''} = useParams();
    const {data: supplierDetails} = useGetSupplierDetsQuery(supplierId);
    const {supplierName} = supplierDetails || {};

    return (
        <Grid rowGap={16}>
            <Typography variant="h2">{supplierName}</Typography>
            <ProviderDetailsInfoSection />
            <ProviderTabsSection />
        </Grid>
    );
};

export default ProviderDetails;
