import {useEffect, useState} from 'react';
import {Grid, Input, RegularButton, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import styles from '../../Common.module.css';
import modelsApi from '../modelsApi';
import EditIcon from '../../Icons/EditIcon';

const ModelDetailsQualityManager: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const [isEditMode, setIsEditMode] = useState(false);

    const [BU, setBU] = useState<string | undefined>(undefined);
    const [QE, setQE] = useState<string | undefined>(undefined);
    const [SQM, setSQM] = useState<string | undefined>(undefined);

    const {data: details, refetch} = modelsApi.endpoints.getModelDetails.useQuery({id});
    const [updateModel] = modelsApi.endpoints.updateQualityModel.useMutation();

    useEffect(() => {
        const user = details?.assignedApprovers?.[0];

        setBU(user?.buId?.toString());
        setQE(user?.role);
        setSQM(user?.userId);
    }, [details?.assignedApprovers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'BU':
                setBU(e.target.value);
                return;
            case 'QE':
                setQE(e.target.value);
                return;
            case 'SQM':
                setSQM(e.target.value);
                return;
        }
    };

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = async () => {
        await updateModel({
            accept: 'application/json',
            id,
            securityCode: 'security_code',
            body: {
                assignedApprovers: [
                    {
                        userId: SQM!,
                        role: QE!,
                        buId: 9,
                    },
                ],
                updatedBy: 'currentUser',
            },
        });

        await refetch();

        setIsEditMode(false);
    };

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16}>
            <Grid columns="1fr auto" gap={16} alignItems="start">
                <Typography variant="h3">{t('ModelDetails.QualityManager.Title')}</Typography>
                {isEditMode ? (
                    <Grid columns="120px" gap={16}>
                        <RegularButton size="m" onClick={handleSaveClick}>
                            {t('Buttons.Save')}
                        </RegularButton>
                    </Grid>
                ) : (
                    <Grid columns="48px" gap={4}>
                        <RegularButton variant="pseudo" aria-label="edit" size="s" onClick={handleEditClick}>
                            <EditIcon color="none" />
                        </RegularButton>
                    </Grid>
                )}
            </Grid>

            <br />
            <br />
            <br />

            {isEditMode ? (
                <Grid columnGap={24} columns="repeat(3, 1fr)">
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('ModelDetails.QualityManager.Field.BU')}
                        name={'BU'}
                        placeholder=""
                        value={BU}
                        onChange={handleInputChange}
                    />
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('ModelDetails.QualityManager.Field.QE')}
                        name={'QE'}
                        placeholder=""
                        value={QE}
                        onChange={handleInputChange}
                    />
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('ModelDetails.QualityManager.Field.SCM')}
                        name={'SQM'}
                        placeholder=""
                        value={SQM}
                        onChange={handleInputChange}
                    />
                </Grid>
            ) : (
                <Grid columnGap={24} columns="repeat(3, 1fr)" alignItems="start">
                    <Grid>
                        <Typography variant="s" size="subtitle">
                            {t('ModelDetails.QualityManager.Field.BU')}
                        </Typography>
                        <Typography variant="s" size="body_long">
                            {BU || '-'}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="s" size="subtitle">
                            {t('ModelDetails.QualityManager.Field.QE')}
                        </Typography>
                        <Typography variant="s" size="body_long">
                            {QE || '-'}
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant="s" size="subtitle">
                            {t('ModelDetails.QualityManager.Field.SCM')}
                        </Typography>
                        <Typography variant="s" size="body_long">
                            {SQM || '-'}
                        </Typography>
                    </Grid>
                </Grid>
            )}

            <br />
            <br />
            <br />
            <br />
        </Grid>
    );
};

export default ModelDetailsQualityManager;
