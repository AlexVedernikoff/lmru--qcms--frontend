export interface IProvidersParams {
    pageIndex: number; // required, номер страницы
    pageSize: number; // required, количество элементов на странице
    sortField?: string; // optional, поле для сортировки
    sortDirection?: string; // optional, ENUM: ['ASC', 'DESC'], порядок сортировки
    searchBy?: {
        id?: number[]; // optional
        version?: number[]; // optional
        type?: string[]; // optional
        status?: string[]; // optional
        billingCountry?: string[]; // optional
        registrationStatus?: string[]; // optional
        supplierDepartmentCountry?: string[]; // optional
        supplierSelfRatingPlatform?: string[]; // optional
        supplierSelfRatingSQM?: string[]; // optional
        manufacturingMonitoringPlatform?: string[]; // optional
        manufacturingMonitoringManager?: string[]; // optional
        country?: string[]; // optional
        qualityRating?: string[]; // optional
        technicalQualityRating?: string[]; // optional
        ecologyQualityRating?: string[]; // optional
        supplierCategory?: string[]; // optional
        businessLicence?: string[]; // optional
        supplierRMSCode?: string[]; // optional
        supplierName?: string[]; // optional
        supplierExName?: string[]; // optional
        supplierInn?: string[]; // optional
        supplierExternalCode?: string[]; // optional
        buId?: string[]; // optional
        createdAt?: string[]; // optional
        createdBy?: string[]; // optional
        supplierProjectTeam?: [
            {
                id?: number[]; // optional
                tabelNumber?: string[]; // optional
                userSurname?: string[]; // optional
                userName?: string[]; // optional
                userEmailAdress?: string[]; // optional
                activityCode?: string[]; // optional
            }
        ];
        SupplierContacts?: [
            {
                id?: number[]; // optional
                userName?: string[]; // optional:
                userSurname?: string[]; // optional:
                emailAdress?: string[]; // optional:
                phoneNumber?: string[]; // optional:
                mobilePhoneNumber?: string[]; // optional:
                type?: string[]; // optional:
            }
        ];
        SupplierDocuments?: [
            {
                id?: number[]; // optional:
                documentId?: number[]; // optional:
            }
        ];
        updatedAt?: string[]; // optional
        updatedBy?: string[]; // optional
    };
}

export interface IProvidersResponseItem {
    id: number; // required, Уникальный идентификатор поставщика в БД
    version: number; // required, Версия объекта в БД
    type: string; // required, тип поставщика
    status?: string; //optional, статус записи ['ACTIVE, 'INACTIVE']
    billingCountry?: string; // optional, страна выставления счетов
    registrationStatus?: string; // optional, статус регистрации поставщика
    supplierDepartmentCountry?: string; // optional, страна расположения отделения поставщика
    supplierSelfRatingPlatform?: string; // optional, платформа, ответственная за самооценку
    supplierSelfRatingSQM?: string; // optional, SQM, ответственный за самооценку
    manufacturingMonitoringPlatform?: string; // optional, платформа мониторинга производства
    manufacturingMonitoringManager?: string; // optional, менеджер по качеству, мониторинг производства
    country?: string; // optional, страна
    qualityRating?: string; // optional, оценка по качеству
    technicalQualityRating?: string; // optional, оценка по качеству технического аудита
    ecologyQualityRating?: string; // optional, оценка по качеству экологического аудита
    supplierCategory: string; // requried, категория поставщика
    businessLicence?: string; // optinal, номер бизнес-лицензии
    supplierRMSCode: string; // required, номер поставщика в RMS (или отделения поставщика)
    supplierName?: string; // optional, название поставщика
    supplierExName?: string; // optional, предыдущее название поставщика
    supplierInn?: string; // optional, ИНН поставщика
    supplierExternalCode?: string; // optional, код поставщика во внешней системе
    buId: string[]; // required, Бизнес-юниты, в которых представлен поставщик
    supplierProjectTeam?: [
        // optional, детальная информация о проектной команде
        {
            id: number; // required, идентификатор связки пользователя с поставщиком в БД
            tabelNumber?: string; // optinal, табельный номер пользователя
            userSurname: string; // required, фамилия
            userName: string; // required, имя
            userEmailAdress?: string; // optional, адрес электронной почты
            activityCode?: string; // optional, код типа деятельности
        }
    ];
    SupplierContacts: [
        // optional, информация о контактах поставщиках
        {
            id: number; // required, идентификатор контакта с поставщиком в БД
            userSurname: string; // required, Фамилия
            userName: string; // required, Имя
            emailAdress?: string; // optional, адрес электронной почты
            phoneNumber?: string; // optional, телефон
            mobilePhoneNumber?: string; // optional, мобильный телефон
            type?: string; // optinal, тип контакта
        }
    ];
    SupplierDocuments?: [
        // optional, информация о контактах поставщиках
        {
            id: number; // required, идентификатор контакта с поставщиком в БД
            documentId: number; // required, идентификатор загруженного документа
        }
    ];
    creationInformation: {
        createdAt: string; // required, время создания задачи
        createdBy: string; // required, ldap или идентификатор системы, создавшей задачу
    };
    lastUpdateInfomation: {
        updatedAt: string; // required, время создания задачи
        updatedBy: string; // required, ldap или идентификатор системы, обновившей задачу
    };
}
export interface IProvidersResponse {
    pageable: {
        pageIndex: number;
        pageSize: number;
        totalPages: number;
        totalElements: number;
    };
    content: IProvidersResponseItem[];
}

export type IModelNomenclature = {
    id?: number; // optional
    nameRu?: string; // optional
    nameEng?: string; // optional
    code: string; // required
    subdepartments: [
        {
            id: number; // optional (id)
            nameRu?: string; // optional (name_ru)
            nameEng?: string; // optional (name_eng)
            code: string; // required (adeo_id)
            modelConsolidationGroups: [
                {
                    id?: number; // optional
                    nameRu?: string; // optional
                    nameEng?: string; // optional
                    code: string; // required
                    models: [
                        {
                            id?: number; // optional
                            nameRu?: string; // optional
                            nameEng?: string; // optional
                            code: string; // required
                        }
                    ];
                }
            ];
        }
    ];
}[];

export interface IManagementNomenclature {
    departments: [
        {
            id: number; // required, идентификатор
            name: string; // required, название отдела
            subDepartments: [
                {
                    id: number; // required, // required, номер подотдела
                    name: string; // required, название подотдела
                    types: [
                        {
                            id: number; // required, номер категории товара
                            name: string; // required, название категории товара
                            subTypes: [
                                {
                                    id: number; // required, номер подкатегории товара
                                    name: string; // required, название подкатегории товара
                                }
                            ];
                        }
                    ];
                }
            ];
        }
    ];
}
