import {TFunction} from 'i18next';
import {ProductDetails} from '../../../../../../common/types/productDetails';

const getRiskOption = (t: TFunction, calculatedRisk?: string) => {
    enum ERiskOptions {
        Minor = 'MINOR',
        Major = 'MAJOR',
        Critical = 'CRITICAL',
    }

    const minor = t('ProductDetails.Info.Product.RiskOptions.minor');
    const major = t('ProductDetails.Info.Product.RiskOptions.major');
    const critical = t('ProductDetails.Info.Product.RiskOptions.critical');

    const gottenRiskOption = calculatedRisk;
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

export const productDetailsProductMapping = (t: TFunction, details?: ProductDetails) => {
    const customId = details?.customId;
    const riskOption = getRiskOption(t, details?.qualityModel?.productGroupRisks?.calculatedRisk);
    const qualityModel = details?.qualityModelId;
    const regulatoryStatus = details?.regulatoryStatus;
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
    const isChemical = details?.qualityModel?.qualityModelForMixtures ? true : false;
    const isSTM = details?.mdd ? true : false;
    const isImport = details?.import ? true : false;
    const isFromProject = details?.project ? true : false;

    return {
        customId,
        regulatoryStatus,
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