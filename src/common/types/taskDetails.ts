export type ITaskAwaitingDocument = {
    // optional, документы, необходимые для загрузки
    type: string; // required, тип документа
    templateId?: number; // optional, номер шаблона если такой был приложен в мастер плане к задаче
    linkedRegulations: number[]; // required, ссылка на закон
    requirementType: string; // required, тип
};

export interface ITaskUploadedDocument {
    // required, загруженные документы
    linkedTaskIds?: string[]; // optional, задачи в которых приложен тот же документ
    id: number; // - required, Уникальный идентификатор разрешительного документа в БД
    version: number; //required, Версия объекта в БД
    type: string; // required - тип разрешительного документа
    template: boolean; // required - показывает, что это шаблон
    comment?: string; // optional, комментарий
    status?: string; //optional, статус действия документа ['ACTIVE, 'INACTIVE', 'DELETED', 'IN_RENEWAL']
    productInfoDetails?: [
        {
            // optional, информация о товарах для которых загружается документ
            id: number; // required, идентификатор связки товара с документом в БД
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
            qualityActionId: number; // required, идентификатор задачи для которой был загружен документ
            buCode: string[]; // required, BU в которых действует документ (должен быть хотя бы один элемент массива)
        }
    ];
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
    };
    publicComments?: [
        {
            // optional [
            id: string; // required, идентификатор комментария
            order: number; // required, порядок комментария
            comment: string; // requried, текст комментария
            createdAt: string; // required, дата создания комментария
            createdBy: string; // required, пользователь, оставивший комментарий
        }
    ];
    documents: {
        awaitedDocuments?: ITaskAwaitingDocument;
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

export interface ITaskUpdateInfoParams {
    updatedBy: string; // required - ldap или идентификатор системы, обновивший задачу
    qualityActions: {
        id: number; // required,
        actionStatus?: string; // optional, ENUM: ['DRAFT', 'СANCELLED', 'AWAITING_DOCUMENT_LOADING", "AWAITING_RESOLUTION", "RETURNED_AWAITING_DOCUMENT_LOADING", "RETURNED_AWAITING_RESOLUTION"]
        conclusion?: string; // optional, string
        approvers?: [
            // optional
            {
                type: string; // required, тип подтверждающего сотрудника ENUM: ['SUPPLIER', 'SERVICE_PROVIDER', 'QE','SQM']
                value: string; // required, идентификатор согласующего или название компании
            }
        ];
        responsible?: [
            // optional
            {
                type: string; // required, ENUM: ['SUPPLIER', 'SERVICE_PROVIDER', 'QE','SQM'] тип подтверждающего сотрудника
                value: string; // required, идентификатор согласующего или название компании
            }
        ];
        publicComments?: {
            // optional
            comment: string; // requried, текст комментария
            createdBy: string; // required, пользователь, новый комментарий
        }[];
    }[];
}

export interface ITaskUpdateInfoResponse {
    content: [
        {
            //  "Quality actions"
        }
    ];
}
