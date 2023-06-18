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
        productModelNomenclatureDepartmentCode: [],
        productModelNomenclatureSubDepartmentCode: undefined,
        productModelNomeclatureConsolidationCode: undefined,
        productModelNomenclatureModelCode: [],
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
            productModelNomenclatureModelCode: filters.modelNameOrCode ? [filters.modelNameOrCode] : [],
        }));
    };

    const handlePageChange = (pageIndex: number, pageSize: number) => {
        setPage({pageIndex, pageSize});
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
