import {
    IProductTableWithModelsItem,
    IProductTableWithoutModelsItem,
    IProviderContactsTableItem,
    IModelTableItem,
    IMasterPlanRequirementTableItem,
    IProviderTableItem,
    IProviderCommandTableItem,
    IProviderProductsTableItem,
} from './models';

export const PLAN_REQUIREMENT_TABLE_ITEMS: (IMasterPlanRequirementTableItem & {key: React.Key})[] = [
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

export const MODEL_TABLE_ITEMS: (IModelTableItem & {key: React.Key})[] = [
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

export const PRODUCT_TABLE_WITH_MODELS_ITEMS: (IProductTableWithModelsItem & {key: React.Key})[] = [
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

export const PRODUCT_TABLE_WITHOUT_MODELS_ITEMS: (IProductTableWithoutModelsItem & {key: React.Key})[] = [
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

export const PROVIDER_TABLE_ITEMS: (IProviderTableItem & {key: React.Key})[] = [
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

export const PROVIDER_COMMAND_TABLE_ITEMS: (IProviderCommandTableItem & {key: React.Key})[] = [
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

export const PROVIDER_CONTACTS_TABLE_ITEMS: (IProviderContactsTableItem & {key: React.Key})[] = [
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

export const PROVIDER_PRODUCTS_TABLE_ITEMS: (IProviderProductsTableItem & {key: React.Key})[] = [
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
