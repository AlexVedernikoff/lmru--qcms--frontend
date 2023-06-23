import {Grid, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import NomenclatureRow from '../Common/NomenclatureRow';
import TextBlock from '../Common/TextBlock';
import styles from '../../Common.module.css';
import modelsApi from '../modelsApi';

const ModelDetailsMainData: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
            <Typography variant="h3">{t('ModelDetails.MainData.Title')}</Typography>
            <TextBlock
                label={t('ModelDetails.MainData.Field.nomenclature')}
                text={details?.productModelNomenclature?.modelName}
            />
            <br />
            <NomenclatureRow
                data={{
                    department: details?.productModelNomenclature?.departmentCode,
                    subdepartment: details?.productModelNomenclature?.subDepartmentCode,
                    consolidation: details?.productModelNomenclature?.modelConsolidationCode,
                    model: details?.productModelNomenclature?.modelCode,
                }}
            />
        </Grid>
    );
};

export default ModelDetailsMainData;
