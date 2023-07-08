import {useMemo, useState} from 'react';
import {Grid, RegularButton, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {TreeSelect} from 'antd';
import {DefaultOptionType} from 'antd/es/select';
import NomenclatureRow from '../Common/NomenclatureRow';
import TextBlock from '../Common/TextBlock';
import styles from '../../Common.module.css';
import modelsApi from '../modelsApi';
import EditIcon from '../../Icons/EditIcon';
import s from './ModelDetails.module.css';

const ModelDetailsMainData: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {data: nomenclature = []} = modelsApi.useGetModelNomenclatureQuery({});
    const {data: details, refetch} = modelsApi.endpoints.getModelDetails.useQuery({id});
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

            body: {
                productModelNomenclatureId: productModelNomenclatureId
                    ? parseInt(productModelNomenclatureId, 10)
                    : undefined,
                updatedBy: 'currentUser',
            },
        });

        await refetch();

        setIsEditMode(false);
    };

    const treeData = useMemo(
        () =>
            nomenclature.map<DefaultOptionType>(el => ({
                label: el.nameRu || el.code,
                value: `department ${el.code}`,
                checkable: false,
                children: el.subdepartments.map(subDep => ({
                    label: subDep.nameRu || subDep.code,
                    value: `subdepartment ${subDep.code}`,
                    checkable: false,
                    children: subDep.modelConsolidationGroups.map(modCon => ({
                        label: modCon.nameRu || modCon.code,
                        value: `consolidation ${modCon.code}`,
                        checkable: false,
                        children: modCon?.models?.map(mod => ({
                            label: modCon.nameRu || modCon.code,
                            value: `${mod.id}`,
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
                        <RegularButton variant="pseudo" aria-label="edit" size="s" onClick={handleEditClick}>
                            <EditIcon />
                        </RegularButton>
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
