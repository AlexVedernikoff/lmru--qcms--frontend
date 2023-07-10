import {TFunction} from 'i18next';
import {ProductDetails} from '../../../../../../common/types/productDetails';

enum ERiskOptions {
    Minor = 'MINOR',
    Major = 'MAJOR',
    Critical = 'CRITICAL',
}

const getRiskOption = (t: TFunction, calculatedRisk?: string) => {
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
    const customId = details?.customId ? details?.customId : '-';

    const gottenRiskOption = getRiskOption(t, details?.qualityModel?.productGroupRisks?.calculatedRisk);
    const riskOption = gottenRiskOption ? gottenRiskOption : '-';

    const qualityModelLabel = details?.qualityModel?.qualityModelLabel ? details.qualityModel.qualityModelLabel : '';
    const qualityModelId = details?.qualityModel?.id ? `${details.qualityModel.id}` : '';

    const regulatoryStatus = details?.regulatoryStatus ? details.regulatoryStatus : '-';
    const productModelNomenclature = details?.qualityModel?.productModelNomenclature;
    const areAllNomenclature =
        productModelNomenclature?.departmentName &&
        productModelNomenclature?.subDepartmentName &&
        productModelNomenclature?.modelConsolidationName &&
        productModelNomenclature?.modelName;
    const productModelValueStr = `${productModelNomenclature?.departmentName} / ${productModelNomenclature?.subDepartmentName} / 
${productModelNomenclature?.modelConsolidationName} / ${productModelNomenclature?.modelName}`;

    const code = details?.code ? details?.code : '-';
    const ean = details?.ean ? details?.ean : '-';
    const isChemical = details?.productWithSubstances || false;
    const isSTM = details?.mdd || false;
    const isImport = details?.import || false;
    const isFromProject = details?.project || false;

    return {
        customId,
        regulatoryStatus,
        riskOption,
        qualityModelLabel,
        qualityModelId,
        productModelValueStr: areAllNomenclature ? productModelValueStr : '-',
        code,
        ean,
        isChemical,
        isSTM,
        isImport,
        isFromProject,
    };
};
