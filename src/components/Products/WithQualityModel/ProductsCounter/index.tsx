import {ShoppingCartSimpleIcon} from '@fronton/icons-react';

import s from './ProductsCounter.module.css';

interface Props {
    value: number;
}

const ProductsCounter: React.FC<Props> = ({value}) => {
    return (
        <div className={s.root}>
            <ShoppingCartSimpleIcon color="white" bold />
            <div className={s.label}>
                <span className={s.value}>{value}</span>
            </div>
        </div>
    );
};

export default ProductsCounter;
