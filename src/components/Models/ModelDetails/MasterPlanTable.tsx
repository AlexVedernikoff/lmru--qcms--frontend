import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, IconButton} from 'fronton-react';
import {UploadIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {DefaultOptionType} from 'antd/es/select';
import {TableRowSelection} from 'antd/es/table/interface';
import {IMasterPlanRequirementTableItem, TWithReactKey} from '../../../common/clientModels';
import CustomTable from '../../Common/CustomTable';
import {CustomSwitch} from '../../Common/Switch/CustomSwitch';
import {IMasterPlanTask} from '../../../common/types/models';
import modelsApi from '../modelsApi';
import {TreeSelect} from 'antd';
import styles from './ModelDetails.module.css';
import {IInitialState} from './ModelDetailsMasterPlan';

type TDataType = TWithReactKey<IMasterPlanRequirementTableItem>;

interface ICustomTreeProps {
    taskCategoryOptions: DefaultOptionType[];
    onSelect: (value: string, recordId: string) => void;
    selected: number;
    record: TDataType;
}

const CustomTree: React.FC<ICustomTreeProps> = ({taskCategoryOptions, selected, onSelect, record}) => {
    return (
        <TreeSelect
            className={styles.treeSelect}
            size="large"
            treeData={taskCategoryOptions}
            value={selected ? [`type ${selected}`] : []}
            onChange={value => onSelect(value?.[0]?.split(' ')?.[1], record.key as string)}
            showCheckedStrategy="SHOW_CHILD"
            treeCheckable
            // multiple={false}
        />
    );
};

interface IProps {
    isEdit?: boolean;
    data: IMasterPlanTask[];
    updateTasks?: (key: keyof IInitialState, value: number[]) => void;
    removeTasksArr?: number[];
    onChange?: (data: IMasterPlanTask[]) => void;
}

const MasterPlanTable: React.FC<IProps> = ({isEdit, data, updateTasks, removeTasksArr, onChange}) => {
    const {t} = useTranslation('models');

    const {data: taskCategories = []} = modelsApi.endpoints.getTaskCategory.useQuery({securityCode: 'security_code'});

    const taskCategoryOptions = useMemo(
        () =>
            taskCategories.map<DefaultOptionType>(cat => ({
                label: cat.name,
                value: `task ${cat.id}`,
                checkable: false,
                children: cat.types.map(t => ({
                    label: t.name,
                    value: `type ${t.id}`,
                })),
            })),
        [taskCategories]
    );

    // const handleEditField = () => {};

    const handleSelectType = useCallback(
        (value: string, recordId: string) => {
            if (onChange)
                onChange(
                    data.map(d =>
                        d.id.toString() === recordId
                            ? {...d, categoryType: {...d.categoryType, id: value ? parseInt(value, 10) : undefined}}
                            : d
                    )
                );
        },
        [data, onChange]
    );

    const columns = useMemo<ColumnsType<TDataType>>(
        () => [
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.status'),
                dataIndex: 'status',
                render: (data: TDataType['status']) => (
                    // @ts-ignore-next-line
                    <div>{t(`ModelDetails.MasterPlan.Table.Options.Person.${data}`)}</div>
                ),
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.category'),
                dataIndex: 'category',
                render: (data: TDataType['category']) => <div>{data.name}</div>,
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.type'),
                dataIndex: 'category',
                render: (data: TDataType['type'], record: TDataType) => (
                    <CustomTree
                        taskCategoryOptions={taskCategoryOptions}
                        onSelect={handleSelectType}
                        selected={data.id!}
                        record={record}
                    />
                ),
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.legal'),
                dataIndex: 'legal',
                render: (data: TDataType['legal']) => (
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        value={data[0]?.id?.toString()}
                        onSelect={() => {}}
                    >
                        {data.map(d => (
                            <DropdownItem key={d.id} text={d.name} value={d.id} />
                        ))}
                    </Dropdown>
                ),
                width: 600,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.documents'),
                dataIndex: 'documents',
                render: (data: TDataType['documents']) => (
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        value={data[0]?.id.toString()}
                        onSelect={() => {}}
                    >
                        {data.map(d => (
                            <DropdownItem key={d.id} text={d.name} value={d.id} />
                        ))}
                    </Dropdown>
                ),
                width: 350,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.origin'),
                dataIndex: 'origin',
                render: (data: TDataType['origin']) => (
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        value={data[0]?.id.toString()}
                        onSelect={() => {}}
                    >
                        {data.map(d => (
                            <DropdownItem key={d.id} text={d.name} value={d.id} />
                        ))}
                    </Dropdown>
                ),
                // render: (data: TDataType['origin']) => (
                //     <Grid columns="auto 1fr auto">
                //         <div>{data}</div>
                //         <span />
                //         <IconButton href={'#'} rel={''} aria-label={''}>
                //             <FileSearchIcon />
                //         </IconButton>
                //     </Grid>
                // ),
                width: 500,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.process'),
                dataIndex: 'process',
                render: (data: TDataType['process']) => (
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        value={data ? 'MANUAL' : 'AUTO'}
                        onSelect={() => {}}
                    >
                        {[
                            {label: 'Ручной', value: 'MANUAL'},
                            {label: 'Автоматический', value: 'AUTO'},
                        ].map(d => (
                            <DropdownItem key={d.label} text={d.label} value={d.value} />
                        ))}
                    </Dropdown>
                ),
                width: 180,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.responsiblePerson'),
                dataIndex: 'responsiblePerson',
                render: (data: TDataType['responsiblePerson']) => (
                    <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data} onSelect={() => {}}>
                        {['SUPPLIER', 'QE', 'SQM', 'SERVICE_PROVIDER'].map(d => (
                            <DropdownItem
                                key={d}
                                // @ts-ignore-next-line
                                text={t(`ModelDetails.MasterPlan.Table.Options.Role.${d}`)}
                                value={d}
                            />
                        ))}
                    </Dropdown>
                ),
                width: 180,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.approvingPerson'),
                dataIndex: 'approvingPerson',
                render: (data: TDataType['approvingPerson']) => (
                    <Dropdown size="m" closeOnSelect placeholder={t('Common.Select')} value={data} onSelect={() => {}}>
                        {['SUPPLIER', 'QE', 'SQM', 'SERVICE_PROVIDER'].map(d => (
                            <DropdownItem
                                key={d}
                                // @ts-ignore-next-line
                                text={t(`ModelDetails.MasterPlan.Table.Options.Role.${d}`)}
                                value={d}
                            />
                        ))}
                    </Dropdown>
                ),
                // render: (data: TDataType['approvingPerson']) => (
                //     <Grid columns="auto auto">
                //         <Dropdown
                //             size="m"
                //             closeOnSelect
                //             placeholder={t('Common.Select')}
                //             value={data.type}
                //             onSelect={() => {}}
                //         >
                //             <DropdownItem text={data.type} value={data.type} />
                //         </Dropdown>

                //         <Dropdown
                //             size="m"
                //             closeOnSelect
                //             placeholder={t('Common.Select')}
                //             value={data.place}
                //             onSelect={() => {}}
                //         >
                //             <DropdownItem text={data.place} value={data.place} />
                //         </Dropdown>
                //     </Grid>
                // ),
                width: 280,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.documentTemplate'),
                dataIndex: 'documentTemplate',
                render: (_data: TDataType['documentTemplate']) => (
                    <Grid>
                        <IconButton href={'#'} rel={''} aria-label={''} disabled>
                            <UploadIcon />
                        </IconButton>
                    </Grid>
                ),
                width: 150,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.taskRequirement'),
                dataIndex: 'taskRequirement',
                render: (data: TDataType['taskRequirement']) => (
                    <CustomSwitch checked={data} name="" handleChange={() => {}} />
                ),
                width: 180,
            },
        ],
        [handleSelectType, t, taskCategoryOptions]
    );

    const dataSource = useMemo<TDataType[]>(
        () =>
            data.map(d => ({
                key: d.id,
                status: d.regulatoryType,
                category: d.categoryType?.category || {},
                type: d.categoryType || {},
                legal: d.linkedRegulations,
                documents: d.linkedRegulations,
                origin: d.linkedRegulations,
                process: d.manualProcessing,
                responsiblePerson: d.responsible?.type,
                approvingPerson: d.approvers?.[0]?.type,
                documentTemplate: d.documentTemplates?.[0] || 0,
                taskRequirement: d.taskRequired,
            })) || [],
        [data]
    );

    const rowSelection = useMemo<TableRowSelection<TDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: TDataType[]) => {
                const key = data[0]?.regulatoryType as keyof IInitialState;
                if (updateTasks) updateTasks(key, selectedRowKeys as number[]);
            },
            fixed: 'left',
        }),
        []
    );

    return (
        <CustomTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            scroll={{x: 400}}
            tableLayout="fixed"
            size="small"
            bordered
        />
    );
};

export default MasterPlanTable;
