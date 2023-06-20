export interface IPermissiveDocumentsResponse {
    id: number;
    name: string;
    type: string;
    regulatoryReferences: number[] | null;
    mandatoryForSupplierType: MandatoryForSupplierType[];
}

interface MandatoryForSupplierType {
    supplierType: string;
    status: string;
}
