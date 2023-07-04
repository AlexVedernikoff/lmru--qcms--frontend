// https://confluence.lmru.tech/display/QCMS/Quality+actions+update-batch

export type ITaskAwaitingDocument = {
    // optional, документы, необходимые для загрузки
    type: string; // required, тип документа
    templateId?: number; // optional, номер шаблона если такой был приложен в мастер плане к задаче
    linkedRegulations: number[]; // required, ссылка на закон
    requirementType: string; // required, тип
};

export interface ITaskProductDetails {
    // optional, информация о товарах для которых загружается документ
    id: number; // required, идентификатор связки товара с документом в БД
    qualityActionId: number; // required, идентификатор задачи для которой был загружен документ
    productId: number; // required, идентификатор товара в QCMS
    approvingStatus?: string; // optional, ['APPROVED', 'REJECTED', 'NEEDS_APPROVAL']
    regulatoryStatus: string; // required, регуляторный статус товара
    productDescription: string; // required, название товара
    productCode: string; // requried, номер товара (артикул)
    productTNVEDCode?: string; // optinal, ТН ВЭД код товара
    productManagementNomenclature: {
        departmentId: number; // requried, департамент отдела товара
        subDepartmentId: number; // required, поддепартамент отдела товара
        typeId: number; // required, категория товара
        subTypeId: number; // required, подкатегория товара
    };
    productModelNomenclature?: {
        modelDepartmentId?: string; // optional- код отдела
        modelSubDepartmentId?: string; // optional - код подотдела
        modelConsolidationId?: string; // optional - код группы
        modelCodeId?: string; // optional - код модели
    };
    ean: string; // required, ГТИН, штрих-код
    supplierRMSCode: string; // required, поставщик (или отделение поставщика)
    supplierName?: string; // optional, название поставщика
    supplierTaxIdentifier?: string; // optional, ИНН поставщика
    supplierId: number; // required, идентификатор поставщика

    buCode: string[]; // required, BU в которых действует документ (должен быть хотя бы один элемент массива)
}

export interface ITaskUploadedDocument {
    isForLot?: boolean;
    // required, загруженные документы
    linkedTaskIds?: string[]; // optional, задачи в которых приложен тот же документ
    id: number; // - required, Уникальный идентификатор разрешительного документа в БД
    version: number; //required, Версия объекта в БД
    type: string; // required - тип разрешительного документа
    template: boolean; // required - показывает, что это шаблон
    comment?: string; // optional, комментарий
    status?: string; //optional, статус действия документа ['ACTIVE, 'INACTIVE', 'DELETED', 'IN_RENEWAL']
    productsDetails?: ITaskProductDetails[];
    mask?: string; // optional, спец. название документа для проверки в россаккредитации
    issueDate?: string; // optional, дата вступления в силу документа
    expiryDate?: string; // oprional, дата окончания срока действия документа
    rosAccreditationApproveStatus: string; // optional, статус документа в РосАккредитации (доп. статус с информацией из россакредитации)
    lotDocumentFlag: boolean; // required, флаг, показывающий, что документ относится к партии товаров
    documentName: string; // required, название файла
    linkToFile: string; // required, линк на S3
    creationInformation: {
        createdAt: string; // required, время создания задачи
        createdBy: string; // required, ldap или идентификатор системы, создавшей задачу
    };
    lastUpdateInfomation: {
        updatedAt: string; // required, время создания задачи
        updatedBy: string; // required, ldap или идентификатор системы, обновившей задачу
    };
    fileName: string;
}

export interface ITaskDetailsPublicComment {
    id: string; // required, идентификатор комментария
    order: number; // required, порядок комментария
    comment: string; // requried, текст комментария
    createdAt: string; // required, дата создания комментария
    createdBy: string; // required, пользователь, оставивший комментарий
}

export interface ITaskDetails {
    id: string; // required, идентификатор задачи
    actionStatus: string; // required, статус задачи ENUM: ['DRAFT', 'СANCELLED', 'AWAITING_DOCUMENT_LOADING", "AWAITING_RESOLUTION", "RETURNED_AWAITING_DOCUMENT_LOADING", "RETURNED_AWAITING_RESOLUTION"]
    version: number; // required, версия записи в БД
    targetBuCodes: number[]; // required, целевые BU
    conclusion?: string; // optional, решение по задаче
    categoryName: string; // required, категория задачи
    categoryTypeName: string; // required, тип задачи из категории
    realisationDueDate: string; // required, срок реализации
    approvalDueDate: string; // required, срок подтверждения
    approvers: [
        {
            type: string; // required, тип подтверждающего сотрудника ENUM: ['SUPPLIER', 'SERVICE_PROVIDER', 'QE','SQM']
            externalId: string; // required, идентификатор согласующего или название компании
        }
    ];
    responsible: [
        {
            type: string; // required, ENUM: ['SUPPLIER', 'SERVICE_PROVIDER', 'QE','SQM'] тип подтверждающего сотрудника
            externalId: string; // required, идентификатор согласующего или название компании
        }
    ];
    supplierData: {
        // required
        id: string; // required, идентификатор поставщика
        name: string; // required, наименование поставщика
        supplierRMSCode: string; // required, код поставщика
        supplierAdeoCode: string; // required, уникальный код ADEO поставщика
        supplierTaxIdentifier: string; // required, ИНН поставщика
    };
    product: {
        // required
        id: string; // required, идентификатор товара
        name: string; // required, наименование товара
        code: string; // required, код товара
        adeoProductCode: string; // required, код товара в ADEO
        qualityModel: string; // required, модель качества товара
        qualityStatus: string; // required, статус соответствия
        adeoRisk: string; // required, риск ADEO - нужен?
        regulatoryStatus: string;
        ean: string;
    };
    publicComments?: ITaskDetailsPublicComment[];
    documents: {
        awaitedDocuments?: ITaskAwaitingDocument[];
        uploadedDocuments: ITaskUploadedDocument[];
        documentMask?: string; // optional, спец. название документа для проверки в россаккредитации
        issueDate?: string; // optional, дата вступления в силу документа
        expiryDate?: string; // oprional, дата окончания срока действия документа
        rosAccreditationApproveStatus?: string; // optional, статус документа в РосАккредитации (доп. статус с информацией из россакредитации)
        lotDocumentFlag: boolean; // required, флаг, показывающий, что документ относится к партии товаров
        documentName: string; // required, название файла
        linkToFile: string; // required, линк на S3
        creationInformation: {
            createdAt: string; // required, время создания задачи
            createdBy: string; // required, ldap или идентификатор системы, создавшей задачу
        };
        lastUpdateInfomation: {
            updatedAt: string; // required, время создания задачи
            updatedBy: string; // required, ldap или идентификатор системы, обновившей задачу
        };
    };
    creationInformation: {
        createdAt: string; // required, время создания задачи
        createdBy: string; // required, ldap или идентификатор системы, создавшей документ
    };
    lastUpdateInfomation: {
        updatedAt: string; // required, время изменения задачи
        updatedBy: string; // required, ldap или идентификатор системы, обновившей документ
    };
}

export interface ITaskUpdateInfoParamsComment {
    comment: string; // requried, текст комментария
    createdBy: string; // required, пользователь, оставивший комментарий
}

export interface ITaskUpdateInfoParams {
    updatedBy: string; // required - ldap или идентификатор системы, обновивший задачу
    qualityActions: {
        id: number; // required,
        actionStatus?: string; // optional, ENUM: ['DRAFT', 'СANCELLED', 'AWAITING_DOCUMENT_LOADING", "AWAITING_RESOLUTION", "RETURNED_AWAITING_DOCUMENT_LOADING", "RETURNED_AWAITING_RESOLUTION"]
        conclusion?: string; // optional, string
        approvers?: // optional
        {
            type: string; // required, тип подтверждающего сотрудника ENUM: ['SUPPLIER', 'SERVICE_PROVIDER', 'QE','SQM']
            externalId: string; // required, идентификатор согласующего или название компании
        }[];
        responsible?: // optional
        {
            type: string; // required, ENUM: ['SUPPLIER', 'SERVICE_PROVIDER', 'QE','SQM'] тип подтверждающего сотрудника
            externalId: string; // required, идентификатор согласующего или название компании
        }[];
        publicComments?: ITaskUpdateInfoParamsComment[];
    }[];
}

export interface ITaskUpdateInfoResponse {
    content: [
        {
            //  "Quality actions"
        }
    ];
}

export interface IUpdateDocumentParams {
    updatedBy: string; // required
    documents: {
        id: number; // required, номер документа
        status?: string; // optional, статус действия документа ['ACTIVE, 'INACTIVE', 'DELETED', 'IN_RENEWAL']
        mask?: string; // optional, спец. название документа для проверки в россаккредитации
        issueDate?: string; // optional, дата вступления в силу документа
        expireDate?: string; // optional, дата окончания срока действия документа
        rosAccreditationApproveStatus?: string; // optional, статус документа в РосАккредитации (доп. статус с информацией из россакредитации)
        isForLot?: boolean; // optional, флаг, показывающий, что документ относится к партии товаров
        fileName?: string; // optional, название файла
        fileLink?: string; // optional, ссылка на файл в S3
        approvingStatuses?: // optional
        {
            productId: number; // required
            approvingStatus: string; // required
        }[];
        removeProductBundle?: number[]; // optional
        comment?: string; // optional
    }[];
}

export interface IUpdateDocumentResponse {
    content: {
        id: 'integer'; // - required, Уникальный идентификатор разрешительного документа в БД
        version: 'integer'; //required, Версия объекта в БД
        type: 'string'; // required - тип разрешительного документа
        isTemplate: 'boolean'; // required, показывает, что это шаблон
        comment: 'string'; // optional, комментарий
        status: 'string'; //optional, статус действия документа ['ACTIVE, 'INACTIVE', 'DELETED', 'IN_RENEWAL']
        productsDetails: // optional, информация о товарах для которых загружается документ
        [
            {
                id: 'integer'; // required, идентификатор связки товара с документом в БД
                approvingStatus: 'string'; // optional, ['APPROVED', 'REJECTED', 'WAITING_FOR_APPROVAL']
                productId: 'integer'; // required, идентификатор товара в QCMS
                productDescription: 'string'; // required, название товара
                productCode: 'string'; // requried, номер товара (артикул)
                productTNVEDCode: 'string'; // optinal, ТН ВЭД код товара
                productManagementNomenclature: {
                    departmentId: 'integer'; // requried, департамент отдела товара
                    subDepartmentId: 'integer'; // required, поддепартамент отдела товара
                    typeId: 'integer'; // required, категория товара
                    subTypeId: 'integer'; // required, подкатегория товара
                };
                productModelNomenclature: {
                    departmentId: 'string'; // optional- код отдела
                    subDepartmentId: 'string'; // optional - код подотдела
                    consolidationId: 'string'; // optional - код группы
                    codeId: 'string'; // optional - код модели
                };
                ean: 'string'; // required, ГТИН, штрих-код
                supplierRMSCode: 'string'; // required, поставщик (или отделение поставщика)
                supplierName: 'string'; // optional, название поставщика
                supplierTaxIdentifier: 'string'; // optional, ИНН поставщика
                supplierId: 'integer'; // required, идентификатор поставщика
                qualityActionId: 'integer'; // required, идентификатор задачи для которой был загружен документ
                buCodes: ['string']; // required, BU в которых действует документ (должен быть хотя бы один элемент массива)
            }
        ];
        mask: 'string'; // optional, спец. название документа для проверки в россаккредитации
        issueDate: 'datetime'; // optional, дата вступления в силу документа
        expiryDate: 'datetime'; // oprional, дата окончания срока действия документа
        rosAccreditationApproveStatus: 'string'; // optional, статус документа в РосАккредитации (доп. статус с информацией из россакредитации)
        isForLot: 'boolean'; // required, флаг, показывающий, что документ относится к партии товаров
        fileName: 'string'; // required, название файла
        fileLink: 'string'; // optional, ссылка на файл в S3
        creationInformation: {
            createdAt: 'datetime'; // required, время создания задачи
            createdBy: 'string'; // required, ldap или идентификатор системы, создавшей задачу
        };
        lastUpdateInfomation: {
            updatedAt: 'datetime'; // required, время создания задачи
            updatedBy: 'string'; // required, ldap или идентификатор системы, обновившей задачу
        };
    }[];
}
