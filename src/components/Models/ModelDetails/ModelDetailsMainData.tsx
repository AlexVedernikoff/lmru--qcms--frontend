import {useMemo, useState} from 'react';
import {Grid, IconButton, RegularButton, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {TreeSelect} from 'antd';
import NomenclatureRow from '../Common/NomenclatureRow';
import TextBlock from '../Common/TextBlock';
import styles from '../../Common.module.css';
import modelsApi from '../modelsApi';
import EditIcon from '../../Icons/EditIcon';
import s from './ModelDetails.module.css';

const ModelDetailsMainData: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {data: nomenclature = []} = modelsApi.useGetModelNomenclatureQuery({securityCode: 'security_code'});
    const {data: details, refetch} = modelsApi.endpoints.getModelDetails.useQuery({id, securityCode: 'security_code'});
    const [updateModel] = modelsApi.endpoints.updateQualityModel.useMutation();

    const [isEditMode, setIsEditMode] = useState(false);

    const [productModelNomenclatureId, setProductModelNomenclatureId] = useState<string | undefined>(undefined);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = async () => {
        await updateModel({
            accept: 'application/json',
            id,
            securityCode: 'security_code',
            body: {
                productModelNomenclatureId: productModelNomenclatureId
                    ? parseInt(productModelNomenclatureId, 10)
                    : undefined,
                // qualityModelForMixtures: true,
                // qualityModelLabel: 'Этикетка тестовая',
                // qualityModelFullName: 'Полное наименование модели качества',
                // qualityModelDescription: 'Описание модели качества',
                // deleteRelationToNomenclature: true,
                // productGroupRisks: {
                //     productRiskLevel: 1,
                //     personLevelRiskForCorrectUsage: 2,
                //     personLevelRiskForNonCorrectUsage: 3,
                //     sustainabilityRisk: 4,
                //     regulatoryRisk: 5,
                //     healthRisk: 6,
                //     riskComments: 'Комментарий к группе риска',
                // },
                // regulatoryReferences: [1],
                assignedApprovers: [
                    {
                        userId: '1',
                        role: 'QE',
                        buId: 1,
                    },
                ],
                updatedBy: 'currentUser',
            },
        });

        await refetch();

        setIsEditMode(false);
    };

    const treeData = useMemo(
        () =>
            nomenclature.map(el => ({
                title: el.nameRu || el.code,
                value: `department ${el.code}`,
                checkable: false,
                children: el.subdepartments.map(subDep => ({
                    title: subDep.nameRu || subDep.code,
                    value: `subdepartment ${subDep.code}`,
                    checkable: false,
                    children: subDep.modelConsolidationGroups.map(modCon => ({
                        title: modCon.nameRu || modCon.code,
                        value: `consolidation ${modCon.code}`,
                        checkable: false,
                        children: modCon?.models?.map(mod => ({
                            title: modCon.nameRu || modCon.code,
                            value: `${mod.code}`,
                        })),
                    })),
                })),
            })),
        [nomenclature]
    );

    const handleProductModelChange = (value: string[]) => {
        const [v] = value || ['0'];
        setProductModelNomenclatureId(v);
    };

    return (
        <Grid className={styles.sectionItem} rowGap={8} columnGap={16}>
            <Grid columns="1fr auto" gap={16}>
                <Typography variant="h3">{t('ModelDetails.MainData.Title')}</Typography>
                {isEditMode ? (
                    <RegularButton onClick={handleSaveClick}>{t('Buttons.Save')}</RegularButton>
                ) : (
                    <Grid columns="48px" gap={16}>
                        <IconButton aria-label="edit" size="s" onClick={handleEditClick}>
                            <EditIcon color="none" />
                        </IconButton>
                    </Grid>
                )}
            </Grid>

            <div />

            {isEditMode ? (
                <>
                    <TreeSelect
                        className={s.treeSelect}
                        size="large"
                        treeData={treeData}
                        value={productModelNomenclatureId ? [productModelNomenclatureId] : []}
                        onChange={handleProductModelChange}
                        placeholder={t('ModelList.Filters.productModel')}
                        showCheckedStrategy="SHOW_CHILD"
                        treeCheckable
                        multiple={false}
                    />
                </>
            ) : (
                <>
                    <TextBlock
                        label={t('ModelDetails.MainData.Field.nomenclature')}
                        text={details?.productModelNomenclature?.modelName}
                    />
                    <br />
                    <NomenclatureRow
                        code={{
                            department: details?.productModelNomenclature?.departmentCode,
                            subdepartment: details?.productModelNomenclature?.subDepartmentCode,
                            consolidation: details?.productModelNomenclature?.modelConsolidationCode,
                            model: details?.productModelNomenclature?.modelCode,
                        }}
                        name={{
                            department: details?.productModelNomenclature?.departmentName,
                            subdepartment: details?.productModelNomenclature?.subDepartmentName,
                            consolidation: details?.productModelNomenclature?.modelConsolidationName,
                            model: details?.productModelNomenclature?.modelName,
                        }}
                    />
                </>
            )}

            {isEditMode && (
                <>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </>
            )}
        </Grid>
    );
};

export default ModelDetailsMainData;
