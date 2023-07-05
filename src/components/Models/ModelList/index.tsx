import {useState} from 'react';
import {Grid} from 'fronton-react';
import ModelsFilter, {IFilterFormState} from './Filter';
import ModelsTable from './Table';
import {IModelsParams} from '../../../common/types/models';
import modelsApi from '../modelsApi';
import styles from '../../Common.module.css';
import {QualityModelsSortableFields, QualityModelsSortDirection} from '../../../common/types/searchQualityModels';

export type Sort = {
    sortField: QualityModelsSortableFields;
    sortDirection: QualityModelsSortDirection;
};

const ModelList: React.FC = () => {
    const [page, setPage] = useState<Pick<IModelsParams['body'], 'pageSize' | 'pageIndex'>>({
        pageSize: 10,
        pageIndex: 0,
    });

    const [sort, setSort] = useState<Sort>();

    const [searchBy, setSearchBy] = useState<IModelsParams['body']['searchBy']>({
        labels: undefined,
        qualityModelLabel: undefined,
        assignedApprovers: undefined,
        calculatedRisk: undefined,
        forMixtures: undefined,
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

    const {data, isLoading, isFetching} = modelsApi.useGetModelsQuery(
        {
            header: {
                securityCode: 'security_code',
            },
            body: {
                ...page,
                ...sort,
                searchBy,
            },
        },
        {refetchOnMountOrArgChange: true}
    );

    const handleFiltersSubmit = (filters: IFilterFormState) => {
        setSearchBy(p => ({
            ...p,
            qualityModelLabel: filters.qualityModel,
            labels: filters.modelNameOrCode ? [filters.modelNameOrCode] : undefined,
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
            forMixtures: filters.forMixtures || undefined,
            productRiskLevel: filters.productRiskLevel ? parseInt(filters.productRiskLevel, 10) : undefined,
            sustainabilityRisk: filters.sustainabilityRisk ? parseInt(filters.sustainabilityRisk, 10) : undefined,
            regulatoryRisk: filters.regulatoryRisk ? parseInt(filters.regulatoryRisk, 10) : undefined,
            lastUpdatedAt: filters.latestChanges ? parseInt(filters.latestChanges, 10) : undefined,
            needApprove: filters.needApprove || undefined,
        }));
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex: pageIndex - 1, pageSize});
    };

    const handleSortChange = (sortField: QualityModelsSortableFields) => {
        if (!sort || sort.sortField !== sortField) {
            setSort({
                sortField: sortField,
                sortDirection: QualityModelsSortDirection.ASC,
            });
            return;
        }
        if (sort.sortDirection === QualityModelsSortDirection.ASC) {
            setSort({
                sortField,
                sortDirection: QualityModelsSortDirection.DESC,
            });
            return;
        }
        setSort(undefined);
    };

    return (
        <Grid rowGap={16}>
            <Grid rowGap={16}>
                <ModelsFilter onSubmit={handleFiltersSubmit} />
            </Grid>

            <Grid rowGap={16} className={styles.panel}>
                <ModelsTable
                    sort={sort}
                    onSortChange={handleSortChange}
                    onPageChange={handlePageChange}
                    tableData={data!}
                    isLoading={isLoading || isFetching}
                />
            </Grid>
        </Grid>
    );
};

export default ModelList;
