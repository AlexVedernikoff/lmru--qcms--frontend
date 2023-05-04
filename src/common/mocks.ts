import {IProductTableWithModelsItem, IProductTableWithoutModelsItem, IModelTableItem} from './models';

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
