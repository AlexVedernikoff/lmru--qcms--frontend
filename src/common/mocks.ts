import {
    IProductTableWithModelsItem,
    IProductTableWithoutModelsItem,
    IProviderContactsTableItem,
    IModelTableItem,
    IMasterPlanRequirementTableItem,
    IProviderTableItem,
    IProviderCommandTableItem,
    IProviderProductsTableItem,
    IProductTableTransferItem,
    TWithReactKey,
    IProviderTableWithDocuments,
    ITaskTableNotification,
    ITaskTableTasks,
    ITaskListItem,
} from './models';

export const PLAN_REQUIREMENT_TABLE_ITEMS: TWithReactKey<IMasterPlanRequirementTableItem>[] = [
    {
        key: '1',
        category: 'Квалификация - Сбор документов',
        type: 'Тестирование',
        legal: 'Federal_Law_No_2300_I_1992 (Law on Consumer Rights Protection)  Россия',
        documents: 'Документы из регулирующих положений',
        origin: 'QUALIF_CERTIF_COLLECT_TEST_ALL MODEL_RPL_n°2',
        process: 'Автоматический',
        responsiblePerson: 'Подрядчик',
        approvingPerson: {
            type: 'QE',
            place: 'Платформа Россия',
        },
        documentTemplate: '',
        taskRequirement: false,
    },
];

export const MODEL_TABLE_ITEMS: TWithReactKey<IModelTableItem>[] = [
    {
        key: '1',
        modelStatus: 'Драфт',
        modelCode: 'Q170308',
        qualityModel: 'Метеостанции',
        QE: [
            {
                fullName: 'Воронцов Алексей',
                type: 'QE',
            },
        ],
        nomenclature: [
            {
                code: '202895 - 03',
                description: 'Электротовары',
            },
            {
                code: '202895 - 03',
                description: 'Электротовары',
            },
            {
                code: '202895 - 03',
                description: 'Электротовары',
            },
            {
                code: '202895 - 03',
                description: 'Электротовары',
            },
        ],
        latestChange: 'MOREL JONATHAN',
        changeDate: '06.02.2023 18:48',
    },
];

export const PRODUCT_TRANSFER_ITEMS: TWithReactKey<IProductTableTransferItem>[] = [
    {
        key: '1',
        creationDate: '17.02.2021',
        productCodeAdeo: '1088035001',
        productCode: '12150145',
        productName: 'ГРУНТ. ГЛУБ.ПРОНИКНОВАНИЯ ЮНИС 10Л',
        providerName: '1004544006 - ООО "ЮНИС-МСК"',
    },
];

export const PRODUCT_TABLE_WITH_MODELS_ITEMS: TWithReactKey<IProductTableWithModelsItem>[] = [
    {
        key: 1,
        providerStatus: 'Дистрибьютор',
        productCode: 87334230,
        productName: 'WEBER.TON MICRO V 0000 25 KG',
        providerCode: 1000771901,
        providerName: 'ООО "ХимТоргПроект"',
        qualityStatus: 'Леруа Мерлен Россия: Предполагаемое соответствие',
        QE: 'Иванов Иван',
        qualityModel: 'Decorative plaster in paste form',
        EAN: '4607141437762',
        lastProductStatusDate: '13.03.2023',
        qualityModelNumber: '87334230',
        qualityModelManager: 'Мария Денисенко',
        productDataCompleteness: 'Не хватает данных по контактам поставщика',
        productTopAVS: 'Нет',
        productCreationDate: '13.03.2023 13:36',
        productActionsBy: 'PARSHINA YANA',
        departmentCode: '1',
        subDepartmentCode: '110',
        TN_VED_Code: '3209100009',
        departmentName: 'СТРОЙМАТЕРИАЛЫ',
        nomenclature:
            '202903 - 11_Краски 202998 - Фасадная краска 203686 - Штукатурка и широкая облицовка фасада 202114 - Декоративная штукатурка для наружных работ',
    },
    {
        key: 2,
        providerStatus: 'Дистрибьютор',
        productCode: 87334230,
        productName: 'WEBER.TON MICRO V 0000 25 KG',
        providerCode: 1000771901,
        providerName: 'ООО "ХимТоргПроект"',
        qualityStatus: 'Леруа Мерлен Россия: Предполагаемое соответствие',
        QE: 'Иванов Иван',
        qualityModel: 'Decorative plaster in paste form',
        EAN: '4607141437762',
        lastProductStatusDate: '13.03.2023',
        qualityModelNumber: '87334230',
        qualityModelManager: 'Мария Денисенко',
        productDataCompleteness: 'Нет данных',
        productTopAVS: 'Нет',
        productCreationDate: '13.03.2023 13:36',
        productActionsBy: 'PARSHINA YANA',
        departmentCode: '1',
        subDepartmentCode: '110',
        TN_VED_Code: '3209100009',
        departmentName: 'СТРОЙМАТЕРИАЛЫ',
        nomenclature:
            '202903 - 11_Краски 202998 - Фасадная краска 203686 - Штукатурка и широкая облицовка фасада 202114 - Декоративная штукатурка для наружных работ',
    },
];

export const PRODUCT_TABLE_WITHOUT_MODELS_ITEMS: TWithReactKey<IProductTableWithoutModelsItem>[] = [
    {
        key: '1',
        providerCodeNumber: 1002345,
        productCode: 10042132,
        productName: 'ШПАТЛ.ФИНИШ.СУПЕРМЕЛК.15КГ.ETS2 SEMIN',
        params: `
            Эко маркировка товаров-Не применимо 
            Минимальный процент содержания вторичного сырья в продукте (%)-0 
            Перечень веществ, опасных в концентрации более 0,1% по массе-Не определено
            Минимальная доля вторичного материала в упаковке (в %)-0
        `,
    },
];

export const PROVIDER_TABLE_ITEMS: TWithReactKey<IProviderTableItem>[] = [
    {
        key: 1,
        providerName: 'EUR - KRINS LAKRA',
        providerCode: 87334233333,
        providerCertified: 'Нет',
        providerWoodProducts: 'Нет',
    },
    {
        key: 2,
        providerName: 'EUR - KRINS LAKRA',
        providerCode: 456663332,
        providerCertified: 'Нет',
        providerWoodProducts: 'Нет',
    },
];

export const PROVIDER_COMMAND_TABLE_ITEMS: TWithReactKey<IProviderCommandTableItem>[] = [
    {
        key: 1,
        userServiceNumber: 1003009004,
        surname: 'Константинопольский',
        name: 'Константин',
        email: 'info@Leroy.ru',
        activityTypeCode: 3458923746,
    },
    {
        key: 2,
        userServiceNumber: 209004,
        surname: 'Петров',
        name: 'Сергей',
        email: 'info@Leroy1.ru',
        activityTypeCode: 56658900046,
    },
];

export const PROVIDER_CONTACTS_TABLE_ITEMS: TWithReactKey<IProviderContactsTableItem>[] = [
    {
        key: 1,
        surname: 'Сергеев',
        name: 'Константин',
        email: 'info@Leroy.ru',
        telephone: '8 (495) 1234567',
        mobile: '8 900 000 00 00',
        type: 'Логистика',
    },
    {
        key: 2,
        surname: 'Константинопольский',
        name: 'Константин',
        email: 'info@Leroy.ru1',
        telephone: '8 (495) 1234567',
        mobile: '8 900 450 00 00',
        type: 'Логистика',
    },
];

export const PROVIDER_PRODUCTS_TABLE_ITEMS: TWithReactKey<IProviderProductsTableItem>[] = [
    {
        key: 1,
        name: 'AXTON PRIMER',
        code: 123456,
        SupplierBindingStatus: 'Активный',
        SupplierLink: 'PE18-32',
        EAN: 123456,
        ComplianceStatusBU: `Леруа Мерлен 
        Леруа Мерлен 
        Леруа Мерлен 
        Леруа Мерлен 
        Леруа Мерлен`,
    },
    {
        key: 2,
        name: 'AXTON PRIMER',
        code: 123456,
        SupplierBindingStatus: 'Активный',
        SupplierLink: 'PE18-32',
        EAN: 123456,
        ComplianceStatusBU: `Леруа Мерлен 
        Леруа Мерлен 
        Леруа Мерлен 
        Леруа Мерлен 
        Леруа Мерлен`,
    },
];

export const PRODUCT_TABLE_WITH_DOCUMENTS: (IProviderTableWithDocuments & {key: React.Key})[] = [
    {
        key: 1,
        documentNumber: '00-0101-ДР Богема_200420.pdf',
        type: 'Информация об упаковке',
        productCode: 82600573,
        EAN: 82600573,
        TNVED: 123456,
        name: 'П/С ВОД.НЖ БОГЕМА 1800Х600',
        releaseDate: '29.04.2020',
        endDate: '29.04.2020',
        status: 'Активный',
        confirmationStatus: 'Согласован',
        uploadDate: '29.04.2020',
        nameSupplier: 'ООО "Кварта"',
        supplieroCodeRMS: 474574574345,
        INN: 87976734,
        businessLicenseNumber: 125645745745745,
        SSMCode: 2342,
        role: 'Поставщик',
        downloadCompleted: 'Чекаев Алексей',
    },
    {
        key: 2,
        documentNumber: '00-0101-ДР Богема_200420.pdf',
        type: 'Информация об упаковке',
        productCode: 82600573,
        EAN: 82600573,
        TNVED: 123456,
        name: 'П/С ВОД.НЖ БОГЕМА 1800Х600',
        releaseDate: '29.04.2020',
        endDate: '29.04.2020',
        status: 'Активный',
        confirmationStatus: 'Согласован',
        uploadDate: '29.04.2020',
        nameSupplier: 'ООО "Кварта"',
        supplieroCodeRMS: 474574574345,
        INN: 87976734,
        businessLicenseNumber: 125645745745745,
        SSMCode: 2342,
        role: 'Поставщик',
        downloadCompleted: 'Чекаев Алексей',
    },
];

export const TASK_NOTIFICATIONS_TABLE_ITEMS: TWithReactKey<ITaskTableNotification>[] = [
    {
        key: 1,
        date: '19.01.2021 10:56',
        topic: 'Леруа Мерлен',
        templateName: 'Support.cms',
        recipient: 'Info@leroymerlin.com',
        text: 'В сиситеме QMS Вам назначено действие по сбору документов',
    },
    {
        key: 2,
        date: '19.01.2021 10:56',
        topic: 'Леруа Мерлен',
        templateName: 'Support.cms',
        recipient: 'Info@leroymerlin.com',
        text: 'В сиситеме QMS Вам назначено действие по сбору документов',
    },
];

export const TASK_TASKS_TABLE_ITEMS: TWithReactKey<ITaskTableTasks>[] = [
    {
        key: 1,
        taskNumber: 15235235,
        EAN: 35467357634,
        providerLink: 'Ссылка',
        matrixId: 'идентификатор',
        documentStatus: 'Согласовано',
        shopCode: 12434654745,
        product: 'ПАКЕТ Д/ПРАЧЕЧНОЙ С ВЫРУБНЫМИ РУЧК 500 ШТ',
        taskStatus: 'Ожидание подтверждения провайдера услуг',
    },
    {
        key: 2,
        taskNumber: 15235235,
        EAN: 35467357634,
        providerLink: 'Ссылка',
        matrixId: 'идентификатор',
        documentStatus: 'Ожидает согласования',
        shopCode: 12434654745,
        product: 'ПАКЕТ Д/ПРАЧЕЧНОЙ С ВЫРУБНЫМИ РУЧК 500 ШТ',
        taskStatus: 'Ожидание подтверждения провайдера услуг',
    },
];

export const TASK_LIST_ITEMS: TWithReactKey<ITaskListItem>[] = [
    {
        key: 1,
        taskType: 'Сбор документов',
        taskStatus: 'Завершена',
        documents: 'Сертификат соответствия',
        productCode: '87312445',
        productName: 'МАСТИКА БИТУМ. ДЛЯ КРОВЕЛЬ 21,5 Л/18 КГ',
        providerName: 'ООО "ХимТоргПроект"',
        providerCode: '1004128001',
        qualityStatus: 'Леруа Мерлен Россия: Предполагаемое соответствие',
        QE: 'Денисенко Мария',
        SQM: 'Иванов Иван',
        taskNumber: '10230358109883',
        expectedDocuments: 'Паспорт безопасности',
        taskCategory: 'Сертификация - Сбор документов',
        creationDate: '13.03.2023',
        confirmationEndDate: '13.03.2023',
        responsibleContractor: 'Константинопольский Константин',
    },
];
