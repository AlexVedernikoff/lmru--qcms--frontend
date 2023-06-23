import {Dropdown, DropdownItem, Grid, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import styles from '../../Common.module.css';
import modelsApi from '../modelsApi';

const ModelDetailsQualityManager: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    const handleSelect = (value: string | null) => {};

    return (
        <Grid className={styles.sectionItem} rowGap={4} columnGap={24}>
            <Grid>
                <Typography variant="h3">{t('ModelDetails.QualityManager.Title')}</Typography>
            </Grid>

            <Grid columnGap={24} columns="repeat(3, 1fr)">
                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelDetails.QualityManager.Field.BU')}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    {details?.assignedApprovers?.map(d => (
                        <DropdownItem key={d.id} text={d.buId.toString()} value={d.buId} />
                    ))}
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelDetails.QualityManager.Field.QE')}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    {details?.assignedApprovers?.map(d => (
                        <DropdownItem key={d.id} text={d.role} value={d.role} />
                    ))}
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    label={t('ModelDetails.QualityManager.Field.SCM')}
                    value={undefined}
                    onSelect={handleSelect}
                >
                    {details?.assignedApprovers?.map(d => (
                        <DropdownItem key={d.id} text={d.role} value={d.role} />
                    ))}
                </Dropdown>
            </Grid>
        </Grid>
    );
};

export default ModelDetailsQualityManager;
