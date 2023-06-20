export interface IProductModelNomenclatureResponse {
    id: number;
    code: string;
    subdepartments: Subdepartment[];
}

interface Subdepartment {
    id: number;
    code: string;
    modelConsolidationGroups: ModelConsolidationGroup[];
}

interface ModelConsolidationGroup {
    id: number;
    code: string;
    models?: Model[];
}

interface Model {
    id: number;
    code: string;
}
