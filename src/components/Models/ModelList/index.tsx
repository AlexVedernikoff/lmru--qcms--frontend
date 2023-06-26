import {useState} from 'react';
import {Grid} from 'fronton-react';
import ModelsFilter, {IFilterFormState} from './Filter';
import ModelsTable from './Table';
import {IModelsParams} from '../../../common/types/models';
import modelsApi from '../modelsApi';
import styles from '../../Common.module.css';

const ModelList: React.FC = () => {
    const [page, setPage] = useState<Pick<IModelsParams['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort] = useState<Pick<IModelsParams['body'], 'sortField' | 'sortDirection'>>({
        sortField: 'createdAt',
        sortDirection: 'DESC',
    });

    const [searchBy, setSearchBy] = useState<IModelsParams['body']['searchBy']>({
        labels: [],
        qualityModelLabel: undefined,
        assignedApprovers: [],
        calculatedRisk: undefined,
        linkedToNomenclature: false,
        linkedToEngineer: false,
        forMixtures: false,
        productRiskLevel: undefined,
        personLevelRiskForCorrectUsage: undefined,
        personLevelRiskForNonCorrectUsage: undefined,
        sustainabilityRisk: undefined,
        healthRisk: undefined,
        regulatoryRisk: undefined,
        productModelNomenclatureDepartmentCode: undefined,
        productModelNomenclatureSubDepartmentCode: undefined,
        productModelNomeclatureConsolidationCode: undefined,
        productModelNomenclatureModelCode: undefined,
        lastUpdatedAt: undefined,
        needApprove: undefined,
    });

    const {data, isLoading} = modelsApi.useGetModelsQuery({
        header: {
            securityCode: 'security_code',
        },
        body: {
            ...page,
            ...sort,
            searchBy,
        },
    });

    const handleFiltersSubmit = (filters: IFilterFormState) => {
        setSearchBy(p => ({
            ...p,
            qualityModelLabel: filters.qualityModel,
            productModelNomenclatureDepartmentCode: filters.productModelNomenclatureDepartmentCode?.length
                ? filters.productModelNomenclatureDepartmentCode
                : undefined,
            productModelNomenclatureSubDepartmentCode: filters.productModelNomenclatureSubDepartmentCode?.length
                ? filters.productModelNomenclatureSubDepartmentCode
                : undefined,
            productModelNomeclatureConsolidationCode: filters.productModelNomenclatureConsolidationCode?.length
                ? filters.productModelNomenclatureConsolidationCode
                : undefined,
            productModelNomenclatureModelCode: filters.productModelNomenclatureModelCode?.length
                ? filters.productModelNomenclatureModelCode
                : undefined,
            assignedApprovers: filters.QE ? [filters.QE] : undefined,
            personLevelRiskForCorrectUsage: filters.personLevelRiskForCorrectUsage
                ? parseInt(filters.personLevelRiskForCorrectUsage, 10)
                : undefined,
            personLevelRiskForNonCorrectUsage: filters.personLevelRiskForNonCorrectUsage
                ? parseInt(filters.personLevelRiskForNonCorrectUsage, 10)
                : undefined,
            healthRisk: filters.healthRisk ? parseInt(filters.healthRisk, 10) : undefined,
            calculatedRisk: filters.calculatedRisk,
            // linkedToNomenclature: false,
            // linkedToEngineer: false,
            forMixtures: filters.forMixtures,
            productRiskLevel: filters.productRiskLevel ? parseInt(filters.productRiskLevel, 10) : undefined,
            sustainabilityRisk: filters.sustainabilityRisk ? parseInt(filters.sustainabilityRisk, 10) : undefined,
            regulatoryRisk: filters.regulatoryRisk ? parseInt(filters.regulatoryRisk, 10) : undefined,
            lastUpdatedAt: filters.latestChanges ? parseInt(filters.latestChanges, 10) : undefined,
            needApprove: filters.needApprove,
        }));
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ModelsFilter onSubmit={handleFiltersSubmit} />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ModelsTable onPageChange={handlePageChange} tableData={data!} isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default ModelList;
