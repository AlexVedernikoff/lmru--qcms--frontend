import {useParams} from 'react-router-dom';
import {Grid, Typography} from 'fronton-react';
import ProductDetailsInfoSection from './ProductDetailsInfoSection';
import ProductDetailsQualityStatusSection from './ProductDetailsQstatusSection/ProductDetailsQualityStatusSection';
import ProductDetailsTabs from './ProductDetailsTabsSection/ProductDetailsTabs';
import {useGetDetailsForProductsQuery} from './productDetailsApi';
import {securityCode} from './mockProductDetails';
import {useEffect} from 'react';
import {notification} from 'antd';

const ProductDetails: React.FC = () => {
    const {id: productId = ''} = useParams();
    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const {
        data: details,
        error: errorGet,
        isError: isGetError,
    } = useGetDetailsForProductsQuery({productId, securityCode});

    useEffect(() => {
        if (isGetError) {
            const err = errorGet as any;
            const code = err?.data?.errors[0]?.code;
            const status = err?.status;
            const message = err.data.errors[0].message;

            if (code && status && message) {
                notificationApi.open({message: `Ошибка! Код: ${code}, статус: ${status}, сообщение: ${message}`});
            } else {
                notificationApi.open({message: `Ошибка!`});
            }
        }
    }, [errorGet, isGetError, notificationApi]);

    const title = details?.description;

    return (
        <>
            {notificationContextHolder}
            <Grid rowGap={16}>
                <Typography variant="h2">{title}</Typography>
                <ProductDetailsInfoSection />
                <ProductDetailsQualityStatusSection />
                <ProductDetailsTabs />
            </Grid>
        </>
    );
};

export default ProductDetails;
