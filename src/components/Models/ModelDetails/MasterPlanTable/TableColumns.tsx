import {Dropdown, DropdownItem, Grid, IconButton} from 'fronton-react';
import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IMasterPlanRequirementTableItem} from '../../../../common/clientModels';
import {FileSearchIcon, UploadIcon} from '@fronton/icons-react';

export interface IDataType extends IMasterPlanRequirementTableItem {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'models', undefined, 'models'>): ColumnsType<IDataType> => [
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.category'),
        dataIndex: 'category',
        render: (data: IDataType['category']) => <div>{data}</div>,
        width: 246,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.type'),
        dataIndex: 'type',
        render: (data: IDataType['type']) => (
            <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data} onSelect={() => {}}>
                <DropdownItem text={data} value={data} />
            </Dropdown>
        ),
        width: 246,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.legal'),
        dataIndex: 'legal',
        render: (data: IDataType['legal']) => (
            <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data} onSelect={() => {}}>
                <DropdownItem text={data} value={data} />
            </Dropdown>
        ),
        width: 600,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.documents'),
        dataIndex: 'documents',
        render: (data: IDataType['documents']) => (
            <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data} onSelect={() => {}}>
                <DropdownItem text={data} value={data} />
            </Dropdown>
        ),
        width: 350,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.origin'),
        dataIndex: 'origin',
        render: (data: IDataType['origin']) => (
            <Grid columns="auto 1fr auto">
                <div>{data}</div>
                <span />
                <IconButton href={'#'} rel={''} aria-label={''}>
                    <FileSearchIcon />
                </IconButton>
            </Grid>
        ),
        width: 500,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.process'),
        dataIndex: 'process',
        render: (data: IDataType['process']) => (
            <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data} onSelect={() => {}}>
                <DropdownItem text={data} value={data} />
            </Dropdown>
        ),
        width: 180,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.responsiblePerson'),
        dataIndex: 'responsiblePerson',
        render: (data: IDataType['responsiblePerson']) => (
            <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data} onSelect={() => {}}>
                <DropdownItem text={data} value={data} />
            </Dropdown>
        ),
        width: 180,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.approvingPerson'),
        dataIndex: 'approvingPerson',
        render: (data: IDataType['approvingPerson']) => (
            <Grid columns="auto auto">
                <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data.type} onSelect={() => {}}>
                    <DropdownItem text={data.type} value={data.type} />
                </Dropdown>

                <Dropdown
                    size="m"
                    closeOnSelect
                    placeholder={t('Common.Select')}
                    value={data.place}
                    onSelect={() => {}}
                >
                    <DropdownItem text={data.place} value={data.place} />
                </Dropdown>
            </Grid>
        ),
        width: 280,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.documentTemplate'),
        dataIndex: 'documentTemplate',
        render: (_data: IDataType['documentTemplate']) => (
            <Grid>
                <IconButton href={'#'} rel={''} aria-label={''}>
                    <UploadIcon />
                </IconButton>
            </Grid>
        ),
        width: 150,
    },
    {
        title: t('ModelDetails.MasterPlan.Table.Columns.taskRequirement'),
        dataIndex: 'taskRequirement',
        render: (_data: IDataType['taskRequirement']) => (
            <Grid>
                <IconButton href={'#'} rel={''} aria-label={''}>
                    <UploadIcon />
                </IconButton>
            </Grid>
        ),
        width: 180,
    },
];
