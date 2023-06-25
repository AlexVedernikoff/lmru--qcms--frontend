export interface IProductModelNomenclatureResponse {
    id: number;
    code: string;
    nameRu: string;
    subdepartments: Subdepartment[];
}

interface Subdepartment {
    id: number;
    code: string;
    nameRu: string;
    modelConsolidationGroups: ModelConsolidationGroup[];
}

interface ModelConsolidationGroup {
    id: number;
    code: string;
    nameRu: string;
    models?: Model[];
}

interface Model {
    id: number;
    code: string;
    nameRu: string;
}
