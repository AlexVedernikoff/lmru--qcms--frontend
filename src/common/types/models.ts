export enum ERiskLevel {
    'MINOR' = 'MINOR',
    'MAJOR' = 'MAJOR',
    'CRITICAL' = 'CRITICAL',
}

interface IModelsBodyParams {
    pageIndex: number; // required, номер страницы
    pageSize: number; // required, количество элементов на странице
    sortField: string; // optional, поле для сортировки
    sortDirection: string; // optional, ENUM: 'ASC', 'DESC'[], порядок сортировки
    searchBy: {
        labels?: string[]; // optional, поиск по названию модели качества (логическое или + полное совпадение со значением из запроса)
        qualityModelLabel?: string; // optional, название модели качества
        assignedApprovers?: string[]; // optional, поиск по менеджеру качества (логическое или)
        calculatedRisk?: string; // optional, поиск по типу риска
        linkedToNomenclature?: boolean; // optional, поиск моделей качества по наличию номенклатуры
        linkedToEngineer?: boolean; // optional, поиск модели качества по наличию инженера
        forMixtures?: boolean; // optional, поиск по отношению модели качества к смесям
        productRiskLevel?: number; // optional, поиск по уровню риска товара
        personLevelRiskForCorrectUsage?: number; // optional, поиск по уровня риска при правильном использовании
        personLevelRiskForNonCorrectUsage?: number; // optional, поиск по уровню риска при неправильном использовании
        sustainabilityRisk?: number; // optional, поиск по уровню риска для окружающей среде
        healthRisk?: number; // optional, поиск по уровню риска для здоровья
        regulatoryRisk?: number; //  optional, поиск по уровню законодательного риска
        productModelNomenclatureDepartmentCode?: string[]; // optional, поиск по коду департамента (логическое или)
        productModelNomenclatureSubDepartmentCode?: string[]; // optional, поиск по саб департаменту (логическое или)
        productModelNomeclatureConsolidationCode?: string[]; // optional, поиск по группе (логическое или)
        productModelNomenclatureModelCode?: string[]; // optional, поиск по модели (логическое или)
        lastUpdatedAt?: number; // optional, поиск по количеству дней с последнего изменения
        needApprove?: boolean; // optional, поиск тех моделей качества, для которых требуется проверка
    };
}

interface IModelsHeaderParams {
    securityCode: string;
}

export interface IModelsParams {
    header: IModelsHeaderParams;
    body: IModelsBodyParams;
}

export interface IModelItem {
    id: number; // required, идентификатор модели качества
    qualityModelLabel: string; // required, название модели качества
    documentVersion: number; // required, версия записи в БД
    qualityModelStatus: string; // required - статус модели качества, ENUM: ['APPROVED', 'REJECTED', 'DRAFT']
    assignedApprovers?: {
        id: number; // required, идентификатор согласующего
        userId: string; // required, идентификатор согласующего
        buId: number; // required, BU в котором сотрудник согласовывает задачи
        role: string; // required, роль согласующего в системе ENUM: ['QE', 'SQM']
    }[];
    calculatedRisk?: string; // optional, поиск по типу риска
    qualityModelForMixtures?: boolean; // optional, отношение модели качества к смесям
    productRiskLevel?: number; // optional, поиск по уровню риска товара
    personLevelRiskForCorrectUsage?: number; // optional, поиск по уровня риска при правильном использовании
    personLevelRiskForNonCorrectUsage?: number; // optional, поиск по уровню риска при неправильном использовании
    sustainabilityRisk?: number; // optional, поиск по уровню риска для окружающей среде
    healthRisk?: number; // optional, поиск по уровню риска для здоровья
    regulatoryRisk?: number; //  optional, поиск по уровню законодательного риска
    productModelNomenclatureDepartmentCode?: string; // optional, поиск по коду департамента (логическое или)
    productModelNomenclatureSubDepartmentCode?: string; // optional, поиск по саб департаменту (логическое или)
    productModelNomenclatureConsolidationCode?: string; // optional, поиск по группе (логическое или)
    productModelNomenclatureModelCode?: string; // optional, поиск по модели (логическое или)
    creationInformation: {
        createdAt: string; // required - дата создания модели качества
        createdBy: string; // required - ldap или идентификатор системы, создавший модель качества
    };
    lastUpdateInformation: {
        updatedAt: string; // required - дата изменения модели качества
        updatedBy: string; // required - ldap или идентификатор системы, обновивший модель качества
    };
}

export interface IModelsResponse {
    pageable: {
        pageSize: number; // required, количество элементов на странице
        pageIndex: number; // required, номер страницы
        totalPages: number; // required, кол-во страниц
        totalElements: number; // required, общее кол-во элементов
    };
    content: IModelItem[];
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

export interface IModelNomenclatureParams {
    securityCode: string;
    application?: string;
}

export interface IModelDetailsParams {
    id: string;
    securityCode: string;
}

export enum ERegulatoryType {
    MANUFACTURER = 'MANUFACTURER',
    IMPORTER = 'IMPORTER',
    DISTRIBUTOR = 'DISTRIBUTOR',
}

export interface IMasterPlanTask {
    id: string; // required - идентификатор задачи в БД
    categoryType: {
        id: number;
        name: string;
        category: {
            id: number;
            name: string;
        };
    }; // required, - тип задачи из категории (содержит ссылку на категорию, к которой относится)
    version: number; // required - версия задачи
    regulatoryType: ERegulatoryType; // required - тип плана ENUM: [DISTRIBUTOR, IMPORTER, MANUFACTURER] (поставщик, СТМ, дистрибьютор)
    // otional, законодательное требование для протоколов сертификационных испытаний (из отдельной таблички)
    linkedRegulations: {
        id: string; // required, идентификатор связанного законодательного требования
        name: string; // required, название связанного законодательного требования
        regionCodes: string[]; // requried, регион распространения законодательного требования
    }[];
    // required, - документы, необходимые в рамках квалификационного и сертификационного сбора
    packagingMaterialDocumentTypes: {
        id: string; // required, идентификатор в базе
        description: string; // required, название документа
    }[];
    manualProcessing: boolean; // required, флаг показывающий, что задача на поставщика будет создана вручную или автоматически
    taskRequired: boolean; // required, флаг показывающий влияние задачи на статус сертификации товара
    responsible: {
        id: number;
        type: string; // required, ENUM ['SUPPLIER','QE', 'SQM', 'SERVICE_PROVIDER'] - тип ответственного за выполнение задачи
        externalId?: string; // optional - ответственный за выполнение задачи, назначается только для Service Provider
    };
    approvers: {
        id: number;
        type: string; // required, ENUM ['SUPPLIER', 'QE', 'SQM', 'SERVICE_PROVIDER'] - категория подтверждающего выполнение задачи
        externalId?: string; // optional - подтверждающий выполнение задачи
    }[];
    documentTemplates?: number[]; // optional - id шаблона документа, запрашиваемого в рамках задачи
    creationInformation: {
        createdAt: string; // required - дата создания задачи
        createdBy: string; // required - ldap или идентификатор системы, создавший задачу
    };
    lastUpdateInformation: {
        updatedAt: string; // required - дата изменения задачи
        updatedBy: string; // required - ldap или идентификатор системы, обновивший задачу
    };
}

export interface IMasterPlan {
    id: number; // required - идентификатор мастер плана в БД
    version: number; // required - версия мастер плана
    qualityModelId: string; // required - номер модели качества
    // required - бизнес юнит на который распространяется мастер план
    bu: {
        id: number; // идентификатор бизнес юнита
        code: string; // код бизнес юнита
    };
    creationInformation: {
        createdAt: string; // required - дата создания мастер плана
        createdBy: string; // required - ldap или идентификатор системы, создавший мастер план
    };
    lastUpdateInfomation: {
        updatedAt: string; // required - дата изменения мастер плана
        updatedBy: string; // required - ldap или идентификатор системы, обновивший мастер план
    };
    // задачи, которые необходимо выполнить для листинга товара
    tasks: IMasterPlanTask[];
}

export interface IModelDetailsResponse {
    id: number; // required - номер модели качества
    qualityModelLabel: string; // required - короткое название модели качества
    documentVersion: number; // required - версия документам (начинаем с 1)
    qualityModelStatus: string; // required - статус модели качества, ENUM: ['APPROVED', 'REJECTED', 'DRAFT'] (регулируем использование модели + редактирование)
    qualityModelFullName?: string; // optional - полное название модели качества
    //- номенклатура товарной модели
    productModelNomenclature: {
        id?: number; // optional - ссылка на Id номенклатуры
        departmentCode?: string; // optional- код отдела
        departmentName?: string; // optional - название отдела
        subDepartmentCode?: string; // optional - код отдела
        subDepartmentName?: string; // optional - название отдела
        modelConsolidationCode?: string; // optional - код группы
        modelConsolidationName?: string; // optional - название группы
        modelCode?: string; // optional - код модели
        modelName?: string; // optional - название, например "Краска для металла"
    };
    // массив согласующих людей
    assignedApprovers: {
        id: number; // require, идентификатор назначения
        userId: string; // required, идентификатор согласующего
        buId: number; // required, BU в котором сотрудник согласовывает задачи
        role: string; // required, роль согласующего в системе ENUM: ['QE', 'SQM']
    }[];
    qualityModelForMixtures: boolean; // required - признак принадлежности товара к химическому веществу
    // optional - потенциальные характеристики товара
    qualityModelCharacteristics: {
        featureCode: string; // required - номер используемого атрибута
        featureName: string; // requried - название атрибута
        featureMultipleValue: boolean; // required - может быть несколько значений
        featureValues: string[]; // required - значение атрибута
    }[];
    qualityModelDescription?: string; // optional - описание модели
    productGroupRisks: {
        productRiskLevel?: number; // optional - риск нанесения ущерба имуществу
        personLevelRiskForCorrectUsage?: number; //  optional - риск нанесения ущерба человеку при нормальном использовании товара
        personLevelRiskForNonCorrectUsage?: number; //  optional - риск нанесения ущерба человеку при ненормальном использовании товара
        sustainabilityRisk?: number; //  optional - риск в отношении устойчивого развития
        healthRisk?: number; //  optional - риск для здоровья
        regulatoryRisk?: number; //  optional -  законодательный риск
        calculatedRisk: ERiskLevel; // required - уровень риска, ENUM: ['MINOR', 'MAJOR', 'CRITICAL']
        riskComments?: string; // optional - комментарий к группе рисков
    };
    // optional, связанные законодательные требования для модели качества
    regulatoryReferences: {
        id: string; // required, уникальный id записи законодательного документа в БД
        type: 'European agreement'; // required, ENUM: [European agreement, Order, Opinion, Circular, Code, Decision, Decree, Directive, Guidance, Jurisprudence, Law, Note, Ordinance, Politic, Recommendation, Regulation, Resolution, Child Regulation - Amendment, Child Regulation - Standard], тип законодательного требования
        documentVersion: number; // required, версия записи в БД
        chapterName: string; // required, краткое название документа
        parentDocumentId?: number; // optional, ссылка на родительский регуляторный документ
        reference: string; // required, ссылка на законодательный документ который использовался ранее
        title: string; // required, полное название законодательного документа
        // optional, характеристики на которые распространяется требование
        regulationFeatures: {
            featureCode: string; // required, код характеристики
            featureMiltupleFlag: boolean; // required, возможно иметь несколько значений описание характеристики
            featureValues: string[]; // rqeuired, доступные значения для характеристик  (qms_feature_values)
        }[];
        regionsName: string[]; // required, регионы действия законодательного требования (regions_code)
        compliance: string; // required, ENUM: [Regulatory, CompanyPolicy], принадлежность к политике компании/регуляторному положению
        required: boolean; // required, обязательность использования законодательного требования
        documentTypes?: number[]; // optional, типы документов, которые будут запрашиваться в задачах
        hyperlink?: string; // optional, ссылка на разрешительную документацию
        internalRequirementDate?: string; // optional, внутренняя дата требования
        legalApplicationEndDate?: string; // optional, дата окончания действия разрешительной документации
        legalApplicationStartDate?: string; // optional, дата начала действия разрешительной документации
        publicationDate?: string; // optional, дата публикации разрешительной документации
        allQualityModels?: boolean; // optional, действие регуляторного документа на все модели качества
        qualityModels?: string[]; // optional, модели качества, привязанные к законодательному требованию
        referencedRegulatoryDocuments: string[]; // required, идентификаторы связанных документов
        comments?: string; // oprional, комментарии сотрудника
        description: string; // описание
        manufacturerObligations?: string; // optional - определение и обязательства производителя
        distributorObligations?: string; // optional - определение и обязательства дистрибьютора
        importerObligations?: string; // oprional - обязательства импортера
        otherParticipantsObligations?: string; // optional - обязательства прочих участников
        requirementType?: string; // oprional, ENUM: ["toxicological","production", "inflammability", "all"], тип требования
        safetyRules?: string; // optional - правила безопасности
        test?: string; // optional - тестирование продукта
        keyPoints?: string; // optional, ключевые моменты
        creationInformation: {
            createdAt: string; // required, время создания задачи
            createdBy: string; // required, ldap или идентификатор системы, создавшей документ
        };
        lastUpdateInfomation: {
            updatedAt: string; // required, время создания задачи
            updatedBy: string; // required, ldap или идентификатор системы, обновившей документ
        };
    }[];
    // required, ссылка на мастер планы, связанные с моделью качества
    masterPlanIds: IMasterPlan[];
    creationInformation: {
        createdAt: string; // required - дата создания модели качества
        createdBy: string; // required - ldap или идентификатор системы, создавший модель качества
    };
    lastUpdateInfomation: {
        updatedAt: string; // required - дата изменения модели качества
        updatedBy: string; // required - ldap или идентификатор системы, обновивший модель качества
    };
}

export interface IUpdateQualityModelParams {
    application?: string;
    accept: string;
    securityCode?: string;
    id: string;
    body: object;
}

export interface IUpdateQualityModelResponse {}

export type IUpdateMasterPlanTasksParams = {
    securityCode?: string;
    id: string;
    body: object;
};

export interface IUpdateMasterPlanTasksResponse {}
