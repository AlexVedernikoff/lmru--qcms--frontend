import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ColumnsType} from 'antd/es/table';
import CustomTable from '../../../../../Common/CustomTable';
import {useGetDetailsForProductsQuery} from '../../../productDetailsApi';
import {securityCode} from '../../../mockProductDetails';
import {IDataProductDetailsTabTasks} from '../../../../../../common/types/productDetails';
import {getTasksTabColumns} from './getTasksTabColumns';
import {tasksTabMapping} from '../../../ProductDetailsMapping/ProductDetailsTabs/tasksTabMapping';
import {useParams} from 'react-router-dom';

const TasksTab: React.FC = () => {
    const {t} = useTranslation('products');
    const {id: productId = ''} = useParams();

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const columns = useMemo<ColumnsType<IDataProductDetailsTabTasks>>(() => getTasksTabColumns(t), [t]);

    const data: IDataProductDetailsTabTasks[] =
        details?.qualityActions && details?.qualityActions.length > 0
            ? tasksTabMapping(details.qualityActions, productId, t)
            : [];

    return (
        <CustomTable columns={columns} dataSource={data} scroll={{x: 400}} tableLayout="fixed" size="small" bordered />
    );
};

export default TasksTab;
