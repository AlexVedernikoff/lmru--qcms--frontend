import {IPageable} from './common';
import {IModelItem} from './models';

export interface IQualityModelsRequestHeader {
    securityCode: string;
}

export interface IQualityModelsRequestBody {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortDirection?: string;
    searchBy: SearchBy;
}

export interface IQualityModelsRequest {
    header: IQualityModelsRequestHeader;
    body: IQualityModelsRequestBody;
}

// https://confluence.lmru.tech/pages/viewpage.action?pageId=234492302
interface SearchBy {
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
    productModelNomenclatureSubDepartmentCode?: string; // optional, поиск по саб департаменту (логическое или)
    productModelNomeclatureConsolidationCode?: string; // optional, поиск по группе (логическое или)
    productModelNomenclatureModelCode?: string[]; // optional, поиск по модели (логическое или)
}

export interface IQualityModelsResponse {
    pageable: IPageable;
    content: IModelItem[];
}
