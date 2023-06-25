import {TFunction} from 'i18next';

export const getRiskOption = (t: TFunction, details: any) => {
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
