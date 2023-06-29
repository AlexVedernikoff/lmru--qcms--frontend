export const productDetailsAttributesMapping = (details: any) => {
    const featureName = details?.qualityModel?.qualityModelCharacteristics?.featureName;
    const featureMultipleValue = details?.qualityModel?.qualityModelCharacteristics?.featureMultipleValue;
    const featureValues = details?.qualityModel?.qualityModelCharacteristics?.featureValues;

    return {
        featureName,
        featureMultipleValue,
        featureValues,
    };
};
