import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, GridItem, RegularButton, Typography} from 'fronton-react';
import {useParams} from 'react-router-dom';
import commonStyles from '../../Common.module.css';
import modelsApi from '../modelsApi';
import TextBlock from '../Common/TextBlock';
import ModelDetailsRiskLevel from './ModelDetailsRiskLevel';
import EditIcon from '../../Icons/EditIcon';
import s from './ModelDetails.module.css';

const riskLevels = Array.from({length: 5}, (_v, i) => {
    const val = i + 1;
    return <DropdownItem key={val} text={val.toString()} value={val} />;
});

interface IFormState {
    productRiskLevel: number | undefined;
    personLevelRiskForCorrectUsage: number | undefined;
    personLevelRiskForNonCorrectUsage: number | undefined;
    sustainabilityRisk: number | undefined;
    healthRisk: number | undefined;
    regulatoryRisk: number | undefined;
}

const ModelDetailsRiskMap: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {data: details, refetch} = modelsApi.endpoints.getModelDetails.useQuery({id});
    const [updateModel] = modelsApi.endpoints.updateQualityModel.useMutation();

    const [isEditMode, setIsEditMode] = useState(false);

    const [formState, setFormState] = useState<IFormState>({
        healthRisk: undefined,
        personLevelRiskForCorrectUsage: undefined,
        personLevelRiskForNonCorrectUsage: undefined,
        productRiskLevel: undefined,
        regulatoryRisk: undefined,
        sustainabilityRisk: undefined,
    });

    useEffect(() => {
        setFormState(p => ({
            ...p,
            productRiskLevel: details?.productGroupRisks?.productRiskLevel,
            healthRisk: details?.productGroupRisks?.healthRisk,
            personLevelRiskForCorrectUsage: details?.productGroupRisks?.personLevelRiskForCorrectUsage,
            personLevelRiskForNonCorrectUsage: details?.productGroupRisks?.personLevelRiskForNonCorrectUsage,
            regulatoryRisk: details?.productGroupRisks?.regulatoryRisk,
            sustainabilityRisk: details?.productGroupRisks?.sustainabilityRisk,
        }));
    }, [details?.productGroupRisks]);

    const handleSelect = (name: keyof IFormState) => (value: string | null) => {
        setFormState(p => ({...p, [name]: value}));
    };

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = async () => {
        await updateModel({
            accept: 'application/json',
            id,

            body: {
                // productModelNomenclatureId: undefined,
                // qualityModelForMixtures: true,
                // qualityModelLabel: 'Этикетка тестовая',
                // qualityModelFullName: 'Полное наименование модели качества',
                // qualityModelDescription: 'Описание модели качества',
                // deleteRelationToNomenclature: true,
                // regulatoryReferences: [1],
                productGroupRisks: {
                    productRiskLevel: formState.productRiskLevel,
                    personLevelRiskForCorrectUsage: formState.personLevelRiskForCorrectUsage,
                    personLevelRiskForNonCorrectUsage: formState.personLevelRiskForNonCorrectUsage,
                    sustainabilityRisk: formState.sustainabilityRisk,
                    regulatoryRisk: formState.regulatoryRisk,
                    healthRisk: formState.healthRisk,
                    riskComments: '',
                },
                // assignedApprovers: [
                //     {
                //         userId: '1',
                //         role: 'QE',
                //         buId: 1,
                //     },
                // ],
                updatedBy: 'currentUser',
            },
        });

        await refetch();

        setIsEditMode(false);
    };

    return (
        <Grid
            className={commonStyles.sectionItem}
            areas={['field field field field level level']}
            columns="1fr auto"
            rowGap={16}
            columnGap={36}
        >
            <GridItem area="field">
                <Grid rowGap={16}>
                    <Grid columns="1fr auto" gap={16}>
                        <Typography variant="h3">{t('ModelDetails.RiskMap.Group.Title')}</Typography>
                        {isEditMode ? (
                            <Grid columns="120px" gap={16}>
                                <RegularButton onClick={handleSaveClick}>{t('Buttons.Save')}</RegularButton>
                            </Grid>
                        ) : (
                            <Grid columns="48px" gap={16}>
                                <RegularButton variant="pseudo" aria-label="edit" size="s" onClick={handleEditClick}>
                                    <EditIcon />
                                </RegularButton>
                            </Grid>
                        )}
                    </Grid>

                    {isEditMode ? (
                        <Grid columns="repeat(3, 1fr)" rowGap={24} columnGap={24}>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                label={t('ModelDetails.RiskMap.Group.Field.riskProperty')}
                                value={formState.productRiskLevel?.toString()}
                                onSelect={handleSelect('productRiskLevel')}
                                className={s.dropdown}
                            >
                                {riskLevels}
                            </Dropdown>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsageNegative')}
                                value={formState.personLevelRiskForNonCorrectUsage?.toString()}
                                onSelect={handleSelect('personLevelRiskForNonCorrectUsage')}
                                className={s.dropdown}
                            >
                                {riskLevels}
                            </Dropdown>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                label={t('ModelDetails.RiskMap.Group.Field.riskLegal')}
                                value={formState.regulatoryRisk?.toString()}
                                onSelect={handleSelect('regulatoryRisk')}
                                className={s.dropdown}
                            >
                                {riskLevels}
                            </Dropdown>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsagePositive')}
                                value={formState.personLevelRiskForCorrectUsage?.toString()}
                                onSelect={handleSelect('personLevelRiskForCorrectUsage')}
                                className={s.dropdown}
                            >
                                {riskLevels}
                            </Dropdown>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                label={t('ModelDetails.RiskMap.Group.Field.riskEnvironment')}
                                value={formState.sustainabilityRisk?.toString()}
                                onSelect={handleSelect('sustainabilityRisk')}
                                className={s.dropdown}
                            >
                                {riskLevels}
                            </Dropdown>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                label={t('ModelDetails.RiskMap.Group.Field.riskHealth')}
                                value={formState.healthRisk?.toString()}
                                onSelect={handleSelect('healthRisk')}
                                className={s.dropdown}
                            >
                                {riskLevels}
                            </Dropdown>
                        </Grid>
                    ) : (
                        <Grid columns="repeat(3, 1fr)" rowGap={24} columnGap={24}>
                            <TextBlock
                                label={t('ModelDetails.RiskMap.Group.Field.riskProperty')}
                                text={details?.productGroupRisks?.productRiskLevel}
                            />
                            <TextBlock
                                label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsageNegative')}
                                text={details?.productGroupRisks?.personLevelRiskForNonCorrectUsage}
                            />
                            <TextBlock
                                label={t('ModelDetails.RiskMap.Group.Field.riskLegal')}
                                text={details?.productGroupRisks?.regulatoryRisk}
                            />
                            <TextBlock
                                label={t('ModelDetails.RiskMap.Group.Field.riskByProductUsagePositive')}
                                text={details?.productGroupRisks?.personLevelRiskForCorrectUsage}
                            />
                            <TextBlock
                                label={t('ModelDetails.RiskMap.Group.Field.riskEnvironment')}
                                text={details?.productGroupRisks?.sustainabilityRisk}
                            />
                            <TextBlock
                                label={t('ModelDetails.RiskMap.Group.Field.riskHealth')}
                                text={details?.productGroupRisks?.healthRisk}
                            />
                        </Grid>
                    )}
                </Grid>
            </GridItem>

            <GridItem area="level">
                <ModelDetailsRiskLevel />
            </GridItem>
        </Grid>
    );
};

export default ModelDetailsRiskMap;
