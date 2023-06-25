import {TFunction} from 'i18next';

const getRiskOption = (t: TFunction, details: any) => {
    enum ERiskOptions {
        Minor = 'MINOR',
        Major = 'MAJOR',
        Critical = 'CRITICAL',
    }

    const minor = t('ProductDetails.Info.Product.RiskOptions.minor');
    const major = t('ProductDetails.Info.Product.RiskOptions.major');
    const critical = t('ProductDetails.Info.Product.RiskOptions.critical');

    const gottenRiskOption = details?.qualityModel.productGroupRisks.calculatedRisk;
    const riskMinor = gottenRiskOption === ERiskOptions.Minor ? minor : '';
    const riskMajor = gottenRiskOption === ERiskOptions.Major ? major : '';
    const riskCritical = gottenRiskOption === ERiskOptions.Critical ? critical : '';

    if (riskMinor) {
        return riskMinor;
    } else if (riskMajor) {
        return riskMajor;
    } else if (riskCritical) {
        return riskCritical;
    } else {
        return '';
    }
};

export const productDetailsProductMapping = (t: TFunction, details: any) => {
    const riskOption = getRiskOption(t, details);
    const qualityModel = details?.qualityAction?.product?.qualityModel;

    const productModelNomenclature = details?.qualityModel?.productModelNomenclature;
    const areAllNomenclature =
        productModelNomenclature?.departmentName &&
        productModelNomenclature?.subDepartmentName &&
        productModelNomenclature?.modelConsolidationName &&
        productModelNomenclature?.modelName;
    const productModelValueStr = `${productModelNomenclature?.departmentName} / ${productModelNomenclature?.subDepartmentName} / 
${productModelNomenclature?.modelConsolidationName} / ${productModelNomenclature?.modelName}`;

    const code = details?.code;
    const ean = details?.ean;
    const isChemical = details?.qualityModel?.qualityModelForMixtures;
    const isSTM = details?.mdd;
    const isImport = details?.import;
    const isFromProject = details?.project;

    return {
        riskOption,
        qualityModel,
        productModelValueStr: areAllNomenclature ? productModelValueStr : '',
        code,
        ean,
        isChemical,
        isSTM,
        isImport,
        isFromProject,
    };
};
