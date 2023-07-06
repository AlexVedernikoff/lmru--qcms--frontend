import {ProductAttribute} from '../../../../../../common/types/productDetails';

export const productDetailsAttributesMapping = (attributeRow: ProductAttribute) => {
    const attributeName = attributeRow.attributeName ? attributeRow.attributeName : '-';
    const attributeValues = attributeRow?.values && attributeRow?.values[0]?.name ? attributeRow.values[0].name : '-';

    return {
        attributeName,
        attributeValues,
    };
};
