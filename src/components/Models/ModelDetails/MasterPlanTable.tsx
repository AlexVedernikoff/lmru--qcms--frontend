import {useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid, RegularButton} from 'fronton-react';
import {DownloadIcon} from '@fronton/icons-react';
import {ColumnsType} from 'antd/es/table';
import {DefaultOptionType} from 'antd/es/select';
import {TableRowSelection} from 'antd/es/table/interface';
import {IMasterPlanRequirementTableItem, TWithReactKey} from '../../../common/clientModels';
import CustomTable from '../../Common/CustomTable';
import {CustomSwitch} from '../../Common/Switch/CustomSwitch';
import {IMasterPlanTask} from '../../../common/types/models';
import {PointersComponent} from './PointersComponent';
import {downloadFile} from '../../../api/downloadQualityDocument';
import {IInitialState} from './ModelDetailsMasterPlan';
import modelsApi from '../modelsApi';
import {TreeSelect} from 'antd';
import styles from './ModelDetails.module.css';

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
    data: IMasterPlanTask[];
    updateTasks?: (key: keyof IInitialState, value: number[]) => void;
    removeTasksArr?: number[];
    onChange?: (data: IMasterPlanTask[]) => void;
}

const MasterPlanTable: React.FC<IProps> = ({data, updateTasks, removeTasksArr, onChange}) => {
    const {t} = useTranslation('models');

    const [isEdit] = useState(false);

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
                dataIndex: 'type',
                render: (data: TDataType['type'], record: TDataType) => {
                    if (isEdit) {
                        return (
                            <CustomTree
                                taskCategoryOptions={taskCategoryOptions}
                                onSelect={handleSelectType}
                                selected={data.id!}
                                record={record}
                            />
                        );
                    } else {
                        return <div>{data.name}</div>;
                    }
                },
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.legal'),
                dataIndex: 'legal',
                render: (data: TDataType['legal']) => {
                    if (isEdit) {
                        return (
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={data[0]?.id?.toString()}
                                onSelect={() => {}}
                            >
                                {data.map(el => (
                                    <DropdownItem key={el.id} text={el.title} value={el.id} />
                                ))}
                            </Dropdown>
                        );
                    } else {
                        return <PointersComponent arr={data.map(el => el.title)} sliceBeforePointers={2} />;
                    }
                },
                width: 600,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.documents'),
                dataIndex: 'documents',
                render: (data: TDataType['documents']) => {
                    if (isEdit) {
                        return (
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={data[0]?.id.toString()}
                                onSelect={() => {}}
                            >
                                {data.map(el => (
                                    <DropdownItem key={el.id} text={el.description} value={el.id} />
                                ))}
                            </Dropdown>
                        );
                    } else {
                        return <PointersComponent arr={data.map(el => el.description)} sliceBeforePointers={2} />;
                    }
                },
                width: 350,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.origin'),
                dataIndex: 'origin',
                render: (data: TDataType['origin']) => data.createdBy,
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.process'),
                dataIndex: 'process',
                render: (data: TDataType['process']) => {
                    if (isEdit) {
                        return (
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
                        );
                    } else {
                        return data ? 'Ручной' : 'Автоматический';
                    }
                },
                width: 180,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.responsiblePerson'),
                dataIndex: 'responsible',
                render: (data: TDataType['responsible']) => {
                    if (isEdit) {
                        return (
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={data.type}
                                onSelect={() => {}}
                            >
                                {['SUPPLIER', 'QE', 'SQM', 'SERVICE_PROVIDER'].map(d => (
                                    <DropdownItem
                                        key={d}
                                        // @ts-ignore-next-line
                                        text={t(`ModelDetails.MasterPlan.Table.Options.Role.${d}`)}
                                        value={d}
                                    />
                                ))}
                            </Dropdown>
                        );
                    } else {
                        if (data.type === 'SERVICE_PROVIDER') {
                            return (
                                <Grid columns="1fr 1fr" justifyItems="center">
                                    {
                                        // @ts-ignore-next-line
                                        <>
                                            <div>{t(`ModelDetails.MasterPlan.Table.Options.Role.${data.type}`)}</div>
                                            <div>{data?.externalId}</div>
                                        </>
                                    }
                                </Grid>
                            );
                        } else {
                            // @ts-ignore-next-line
                            return <div>{t(`ModelDetails.MasterPlan.Table.Options.Role.${data.type}`)}</div>;
                        }
                    }
                },

                width: 180,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.approvingPerson'),
                dataIndex: 'approvers',
                render: (data: TDataType['approvers']) => {
                    if (isEdit) {
                        return (
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={data[0].type}
                                onSelect={() => {}}
                            >
                                {['SUPPLIER', 'QE', 'SQM', 'SERVICE_PROVIDER'].map(d => (
                                    <DropdownItem
                                        key={d}
                                        // @ts-ignore-next-line
                                        text={t(`ModelDetails.MasterPlan.Table.Options.Role.${d}`)}
                                        value={d}
                                    />
                                ))}
                            </Dropdown>
                        );
                    } else {
                        return (
                            <>
                                {data?.map(el => {
                                    if (el.externalId === 'SERVICE_PROVIDER') {
                                        return (
                                            <Grid columns="1fr 1fr" justifyItems="center">
                                                {
                                                    // @ts-ignore-next-line
                                                    <>{t(`ModelDetails.MasterPlan.Table.Options.Role.${el.type}`)}</>
                                                }
                                                <div>{el?.externalId}</div>
                                            </Grid>
                                        );
                                    } else {
                                        // @ts-ignore-next-line
                                        return <>{t(`ModelDetails.MasterPlan.Table.Options.Role.${el.type}`)}</>;
                                    }
                                })}
                            </>
                        );
                    }
                },
                width: 280,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.documentTemplate'),
                dataIndex: 'documentTemplate',
                render: (ids: TDataType['documentTemplate']) => (
                    <Grid columns="1fr 1fr" justifyItems="center" alignItems="center">
                        {ids.map(id => (
                            <>
                                <RegularButton
                                    iconRight={<DownloadIcon />}
                                    onClick={() => downloadFile(id)}
                                    variant="pseudo"
                                />

                                <div>{id}</div>
                            </>
                        ))}
                    </Grid>
                ),
                width: 150,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.taskRequirement'),
                dataIndex: 'taskRequirement',
                render: (data: TDataType['taskRequirement']) => {
                    if (isEdit) {
                        return (
                            <Grid justifyContent="center">
                                <CustomSwitch checked={data} name="" handleChange={() => {}} />
                            </Grid>
                        );
                    } else {
                        return (
                            <Grid justifyContent="center">
                                <CustomSwitch checked={data} name="" handleChange={() => {}} />
                            </Grid>
                        );
                    }
                },
                width: 180,
            },
        ],
        [handleSelectType, isEdit, t, taskCategoryOptions]
    );

    const dataSource = useMemo<TDataType[]>(
        () =>
            data.map(d => {
                return {
                    key: d.id,
                    status: d.regulatoryType,
                    category: d.categoryType?.category || {},
                    type: d.categoryType || {},
                    legal: d.linkedRegulations,
                    documents: d.packagingMaterialDocumentTypes,
                    origin: d.creationInformation,
                    process: d.manualProcessing,
                    responsible: d.responsible,
                    approvers: d.approvers,
                    documentTemplate: d?.documentTemplates ? d.documentTemplates : [],
                    taskRequirement: d.taskRequired,
                };
            }) || [],
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
        [data, updateTasks]
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
