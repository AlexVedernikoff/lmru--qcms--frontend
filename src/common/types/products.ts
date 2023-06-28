interface IProductsRequestHeader {
    securityCode: string;
}

interface IProductsRequestBody {
    pageIndex: number; // required, номер страницы
    pageSize: number; // required, количество элементов на странице
    sortField?: string; // optional, поле для сортировки
    sortDirection?: string; // optional, ENUM: ['ASC', 'DESC'], порядок сортировки
    searchBy: {
        code?: string; //  optional, поиск по ЛМ коду товара (логическое или }
        adeoCode?: string; // optional, поиск по коду ADEO
        description?: string; // optional, название товара
        ean?: string; // optionaд, ШК товара
        supplierCode?: string; // optional
        supplierName?: string; // optional
        supplierTaxIdentifier?: string; // optional
        productManagementNomenclature?: {
            departmentId?: number; // optional, департамент отдела товара
            subDepartmentId?: number; // optional, поддепартамент отдела товара
            typeId?: number; // optional, категория товара
            subTypeId?: number; // optional, подкатегория товара
        }[];
        qualityModelId?: number; // optional, номер модели качества связанной с товаром
        productModelNomenclature?: {
            //- номенклатура товарной модели
            // modelDepartmentId?: string; // optional- код отдела
            // modelSubDepartmentId?: string; // optional - код подотдела
            // modelConsolidationId?: string; // optional - код группы
            // modelCodeId?: string; // optional - код модели

            productModelNomenclatureModelCode?: string;
            productModelNomenclatureConsolidationCode?: string;
            productModelNomenclatureSubDepartmentCode?: string;
            productModelNomenclatureDepartmentCode?: string;
        }[];
        range?: string; // optional
        buCode?: number[]; // optional
        withQualityModel?: boolean; // optoional, поиск по наличию qualityModelId в теле сущности
        mdd?: boolean; // optional, поиск по товарам СТМ
        import?: boolean; //optional, поиск по импорту
        attributes?: {
            // optional
            attributeCode: string; // required
            values?: string[]; // optional
        };
        project?: boolean; // optional
        blockType?: string; // optional
        productWithSubstances?: string; // optional
        regulatoryStatuses?: string[]; // (логическое или) ??
        conformityStatuses?: string[]; // (логическое или) ??
    };
}

export interface IProductsRequest {
    header: IProductsRequestHeader;
    body: IProductsRequestBody;
}

export interface IProduct {
    id: number; // required, идентификатор записи в БД
    code: string; // required, код продукта для BU
    version: number; // required, версия документа
    productManagementNomenclature: {
        departmentId: number; // requried, департамент отдела товара
        subDepartmentId: number; // required, поддепартамент отдела товара
        typeId: number; // required, категория товара
        subTypeId: number; // required, подкатегория товара
    };
    qualityModelId?: number; // optional, номер модели качества связанной с товаром
    productModelNomenclature?: {
        //- номенклатура товарной модели
        modelDepartmentId?: string; // optional- код отдела
        modelSubDepartmentId?: string; // optional - код подотдела
        modelConsolidationId?: string; // optional - код группы
        modelCodeId?: string; // optional - код модели
    };
    adeoCode: string; // required, код товара ADEO
    description?: string; // optional, краткое описание товара
    import: boolean; // required, флаг, показывающий, что товар
    mdd: boolean; // required, флаг, показывающий, что товар СТМ
    topReferencement: boolean; // required, показывающий
    top1000: boolean; // required, флаг, показывающий, что товар из топ 1000
    sample: boolean; // requried, флаг, показывающий, что товар образец
    topAVS: boolean; // requried, флаг
    topDeleted: boolean; // required, флаг
    category?: string; // optional, категория товаров
    brand?: string; // optional, название бренда +
    range?: string; // optional, гамма товара
    status?: string; // optional, статус листинга товара?
    projectId?: string; // optional, номер проекта
    customId?: string; // optional,
    project: boolean; // required,
    productAVSdate?: string; // optional
    multipleModele: boolean; // requried
    buCode: number[]; //required, номера бизнес юнитов для товаров
    ean: string; // required, штрих код товара
    regulatoryStatus?: string; // optional, регуляторный тип товара
    productWithSubstances: boolean; // required, флаг, показывающий, что в товаре есть смеси
    supplierCode: string; // код поставщика
    qualityActionIds?: string[]; // optional, задачи связанные с товаром
    uploadedDocuments?: number[]; // optional, номера документов, которые были загружены для товаров
    qualityStatuses: {
        qualityStatus: string; // required, ENUM:['MISSING_DATA', 'QUALIFICATION_IN_PROGRESS', 'DOCUMENT_COLLECTION', 'CERTIFIED', 'NOT_CERTIFIED', 'TEMPORARILY_ALLOWED'] статус качества
        qualityStatusComment?: string; // optional
        qualityStatusHistory: {
            id: number; // required, идентификатор записи
            currentValue: string; // required, текущее значение
            previousValue: string; // required, предыдущее значение
            statusUpdatedAt: string; // required, время обновления статуса
            statusUpdatedBy: string; // required, обновляющий
            comment?: string; // optional, комментарий для обновления
        }[];
        buCode: number; // required, код бизнес юнита для которого распространяется статус и блокировки
        tartgetBuCode: number; // required
        blockedForSelling: boolean; // required, блокировка для продажи
        sellingBlockHistoty: {
            id: number; // required, идентификатор записи
            currentValue: string; // required, текущее значение
            previousValue: string; // required, предыдущее значение
            statusUpdatedAt: string; // required, время обновления статуса
            statusUpdatedBy: string; // required, обновляющий
            comment?: string; // optional, комментарий для обновления
        }[];
        blockedForOrder: boolean; // required, блокировка для заказа
        orderBlockHistoty: {
            id: number; // required, идентификатор записи
            currentValue: string; // required, текущее значение
            previousValue: string; // required, предыдущее значение
            statusUpdatedAt: string; // required, время обновления статуса
            statusUpdatedBy: string; // required, обновляющий
            comment?: string; // optional, комментарий для обновления
        }[];
        blockedForPublication: boolean; // required, блокировка для публикации
        publicationBlockHistoty: {
            id: number; // required, идентификатор записи
            currentValue: string; // required, текущее значение
            previousValue: string; // required, предыдущее значение
            statusUpdatedAt: string; // required, время обновления статуса
            statusUpdatedBy: string; // required, обновляющий
            comment?: string; // optional, комментарий для обновления
        }[];
        startDateForPublicationBlock?: string; // optional, дата старта блокировки
        endDateForPublicationBlock?: string; // optional, дата окончания блокировки
        startDateForSellingBlock?: string; // optional, дата старта блокировки
        endDateForSellingBlock?: string; // optional, дата окончания блокировки
        startDateForOrderBlock?: string; // optional, дата старта блокировки
        endDateForOrderBlock?: string; // optional, дата окончания блокировки
    }[];
    productAttributes: {
        attributeCode: string; // required, код атрибута (код атрибута)
        attributeName?: string; // optional, название атрибута
        values: {
            // required, значения для атрибута
            valueCode: string; // required, номер атрибута
            name: string; // required, название атрибута
        };
    }[];
    creationInformation: {
        createdAt: string; // required - дата создания задачи
        createdBy: string; // required - ldap или идентификатор системы, создавший задачу
    };
    lastUpdateInfomation: {
        updatedAt: string; // required - дата изменения задачи
        updatedBy: string; // required - ldap или идентификатор системы, обновивший задачу
    };
}

export interface IProductsResponse {
    pageable: {
        pageSize: number; // required, количество элементов на странице
        pageIndex: number; // required, номер страницы
        totalPages: number; // required, кол-во страниц
        totalElements: number; // required, общее кол-во элементов
    };
    content: IProduct[];
}

export interface IProductsNomenclatureRequestHeader {
    securityCode: string;
    application?: string;
}

export interface IProductsNomenclatureRequest {
    header: IProductsNomenclatureRequestHeader;
}

interface INomenclatureBasic {
    id: string;
    nameRu?: string;
    nameEng?: string;
    code: string;
}

interface INomenclatureDepartment extends INomenclatureBasic {
    subdepartments: (INomenclatureBasic & {
        modelConsolidationGroups: (INomenclatureBasic & {
            models: INomenclatureBasic[];
        })[];
    })[];
}

export type TModelNomenclatureResponse = INomenclatureDepartment[];
