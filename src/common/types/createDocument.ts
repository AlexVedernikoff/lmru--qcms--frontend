// https://confluence.lmru.tech/display/QCMS/POST+create-documents

interface ICreateDocumentRequestHeader {
    securityCode: string;
}

type ICreateDocumentRequestBody = FormData;

export interface ICreateDocumentRequest {
    header: ICreateDocumentRequestHeader;
    body: ICreateDocumentRequestBody;
}

export interface ICreateDocumentResponse {}

export interface IDocumentMetadata {
    type: string; // required, тип разрешительного документа
    isTemplate: boolean; // required, показывает, что это шаблон
    mask?: string; // optional, спец. название документа для проверки в россаккредитации
    issueDate?: string; // optional, дата вступления в силу документа
    expiryDate?: string; // optional, дата окончания срока действия документа
    rosAccreditationApproveStatus?: string; // optional, статус документа в РосАккредитации (доп. статус с информацией из россакредитации)
    isForLot: boolean; // required, флаг, показывающий, что документ относится к партии товаров
    fileName?: string; // optional, название файла
    fileLink?: string; // optional, ссылка на файл в S3
    createdBy: string; // required, ldap или идентификатор системы, создавшей задачу
    productsDetails?: ProductDetails[]; // optional, информация о товарах для которых загружается документ
}

interface ProductDetails {
    approvingStatus: string; // required, ['APPROVED', 'REJECTED', 'WAITING_FOR_APPROVAL']
    productId: number; // required, идентификатор товара в QCMS
    regulatoryStatus: string; // required, регуляторный статус товара
    productDescription: string; // required, название товара
    productCode: string; // requried, номер товара (артикул)
    productTNVEDCode?: string; // optinal, ТН ВЭД код товара
    ean: string; // required, ГТИН, штрих-код
    supplierId: number; // required, идентификатор поставщика
    supplierRMSCode: string; // required, поставщик (или отделение поставщика)
    supplierName: string; // required, название поставщика
    supplierTaxIdentifier: string; // required, ИНН поставщика
    qualityActionId: number; // required, идентификатор задачи для которой был загружен документ
    productManagementNomenclature: {
        departmentId: number; // requried, департамент отдела товара
        subDepartmentId: number; // required, поддепартамент отдела товара
        typeId: number; // required, категория товара
        subTypeId: number; // required, подкатегория товара
    };
    productModelNomenclature: {
        departmentId?: string; // optional, код отдела
        subDepartmentId?: string; // optional, код подотдела
        consolidationId?: string; // optional, код группы
        codeId?: string; // optional, код модели
    };
    buCodes: string[]; // required, BU в которых действует документ (должен быть хотя бы один элемент массива)
}
