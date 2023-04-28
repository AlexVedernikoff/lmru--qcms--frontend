import {useCallback, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {RegularButton} from 'fronton-react';
import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {TableRowSelection} from 'antd/es/table/interface';
import {MODEL_TABLE_ITEMS} from '../../../../common/mocks';
import {MODELS_ROUTES} from '../../../../common/consts';
import {IDataType, getTableColumns} from './TableColumns';
import AutoWidthTable from '../../../Common/AutoWidthTable';

const ModelsTable: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation('models');

    const handleDetailsOpen: React.MouseEventHandler<HTMLAnchorElement> = useCallback(
        e => {
            const {id} = e.currentTarget.dataset;
            if (id) {
                navigate(MODELS_ROUTES.details.replace(':id', id));
            }
        },
        [navigate]
    );

    const columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: '',
                dataIndex: undefined,
                width: 64,
                render: (_value: string, record: IDataType) => (
                    <RegularButton
                        data-id={record.modelCode}
                        onClick={handleDetailsOpen}
                        href=""
                        rel=""
                        aria-label=""
                        variant="pseudo"
                        iconOnly
                    >
                        <MagnifyingGlassIcon />
                    </RegularButton>
                ),
                fixed: 'left',
            },
            ...getTableColumns(t),
        ],
        [handleDetailsOpen, t]
    );

    const data = useMemo<IDataType[]>(() => MODEL_TABLE_ITEMS, []);

    const rowSelection = useMemo<TableRowSelection<IDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: IDataType[]) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            // getCheckboxProps: (record: IDataType) => ({
            //     disabled: record.qualityStatus === '2',
            //     name: record.qualityStatus,
            // }),
            fixed: 'left',
        }),
        []
    );

    return (
        <AutoWidthTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
        />
    );
};

export default ModelsTable;
