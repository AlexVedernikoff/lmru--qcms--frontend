export interface IManagementNomenclatureResponse {
    id: number;
    name: string;
    subDepartments: SubDepartment[];
}

interface SubDepartment {
    id: number;
    name: string;
    types: Type[];
}

interface Type {
    id: number;
    name: string;
    subTypes: SubType[];
}

interface SubType {
    id: number;
    name: string;
}
