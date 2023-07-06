import ShoppingCartSimpleIcon from '../../../Icons/ShoppingCartSimpleIcon';
import s from './ProductsCounter.module.css';

interface Props {
    value: number;
}

const ProductsCounter: React.FC<Props> = ({value}) => {
    return (
        <div className={s.root}>
            <ShoppingCartSimpleIcon color="white" />
            <div className={s.label}>
                <span className={s.value}>{value}</span>
            </div>
        </div>
    );
};

export default ProductsCounter;
