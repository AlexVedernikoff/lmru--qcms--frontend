export interface IModelsParams {
    pageIndex: number; // required, номер страницы
    pageSize: number; // required, количество элементов на странице
    sortField: string; // optional, поле для сортировки
    sortDirection: string; // optional, ENUM: 'ASC', 'DESC'[], порядок сортировки
    searchBy: {
        labels: string[]; // optional, поиск по названию модели качества (логическое или + полное совпадение со значением из запроса)
        qualityModelLabel: string; // optional, название модели качества
        assignedApprovers: string[]; // optional, поиск по менеджеру качества (логическое или)
        calculatedRisk: string; // optional, поиск по типу риска
        linkedToNomenclature: boolean; // optional, поиск моделей качества по наличию номенклатуры
        linkedToEngineer: boolean; // optional, поиск модели качества по наличию инженера
        forMixtures: boolean; // optional, поиск по отношению модели качества к смесям
        productRiskLevel: number; // optional, поиск по уровню риска товара
        personLevelRiskForCorrectUsage: number; // optional, поиск по уровня риска при правильном использовании
        personLevelRiskForNonCorrectUsage: number; // optional, поиск по уровню риска при неправильном использовании
        sustainabilityRisk: number; // optional, поиск по уровню риска для окружающей среде
        healthRisk: number; // optional, поиск по уровню риска для здоровья
        regulatoryRisk: number; //  optional, поиск по уровню законодательного риска
        productModelNomenclatureDepartmentCode: string[]; // optional, поиск по коду департамента (логическое или)
        productModelNomenclatureSubDepartmentCode: string; // optional, поиск по саб департаменту (логическое или)
        productModelNomeclatureConsolidationCode: string; // optional, поиск по группе (логическое или)
        productModelNomenclatureModelCode: string[]; // optional, поиск по модели (логическое или)
    };
}

export interface IModelsResponse {
    pageable: {
        pageSize: number; // required, количество элементов на странице
        pageIndex: number; // required, номер страницы
        totalPages: number; // required, кол-во страниц
        totalElements: number; // required, общее кол-во элементов
    };
    content: {
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
        productModelNomeclatureConsolidationCode?: string; // optional, поиск по группе (логическое или)
        productModelNomenclatureModelCode?: string; // optional, поиск по модели (логическое или)
        creationInformation: {
            createdAt: string; // required - дата создания модели качества
            createdBy: string; // required - ldap или идентификатор системы, создавший модель качества
        };
        lastUpdateInfomation: {
            updatedAt: string; // required - дата изменения модели качества
            updatedBy: string; // required - ldap или идентификатор системы, обновивший модель качества
        };
    }[];
}
