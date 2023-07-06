import {useCallback, useMemo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import CustomTable from '../../../../../Common/CustomTable';
import {useGetDetailsForProductsQuery} from '../../../productDetailsApi';
import {securityCode} from '../../../mockProductDetails';
import {IDataProductDetailsTabTasks} from '../../../../../../common/types/productDetails';
import {getTasksTabColumns} from './getTasksTabColumns';
import {tasksTabMapping} from '../../../ProductDetailsMapping/ProductDetailsTabs/tasksTabMapping';
import {PROVIDER_ROUTES} from '../../../../../../common/consts';

const TasksTab: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();
    const navigate = useNavigate();

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const handleProvidersOpen = useCallback(
        (id: string) => {
            if (id) {
                navigate(PROVIDER_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<IDataProductDetailsTabTasks>>(
        () => getTasksTabColumns(t, handleProvidersOpen),
        [handleProvidersOpen, t]
    );

    const data: IDataProductDetailsTabTasks[] =
        details?.qualityActions && details?.qualityActions.length > 0
            ? tasksTabMapping(details.qualityActions, productId, t)
            : [];

    return (
        <CustomTable
            columns={columns}
            dataSource={data}
            scroll={{x: 400, y: 250}}
            tableLayout="fixed"
            size="small"
            bordered
        />
    );
};

export default TasksTab;
