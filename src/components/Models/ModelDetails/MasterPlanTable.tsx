import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem, Grid} from 'fronton-react';
import {ColumnsType} from 'antd/es/table';
import {TreeSelect} from 'antd';
import {DefaultOptionType} from 'antd/es/select';
import {TableRowSelection} from 'antd/es/table/interface';
import {IMasterPlanRequirementTableItem, TWithReactKey} from 'common/clientModels';
import {ERegulatoryType, IMasterPlanTask} from 'common/types/models';
import CustomTable from '../../Common/CustomTable';
import {CustomSwitch} from '../../Common/Switch/CustomSwitch';
import ShowMoreStrComponent from './ShowMoreStrComponent';
import modelsApi from '../modelsApi';
import styles from './ModelDetails.module.css';
import ShowMoreDocsComponent from './ShowMoreDocsComponent';

type TDataType = TWithReactKey<IMasterPlanRequirementTableItem>;

interface ICustomTreeProps {
    taskCategoryOptions: DefaultOptionType[];
    onSelect: (value: string, recordId: string) => void;
    selected: number;
    record: TDataType;
}

const TaskCategorySelect: React.FC<ICustomTreeProps> = ({taskCategoryOptions, selected, onSelect, record}) => (
    <TreeSelect
        className={styles.treeSelect}
        size="large"
        treeData={taskCategoryOptions}
        value={selected ? [`type ${selected}`] : []}
        onChange={value => onSelect(value?.[0]?.split(' ')?.[1], record.key as string)}
        showCheckedStrategy="SHOW_CHILD"
        treeCheckable
    />
);

interface IProps {
    data: IMasterPlanTask[];
    updateTasks?: (key: ERegulatoryType, value: number[]) => void;
    onChange?: (data: IMasterPlanTask[]) => void;
    isEditMode: boolean;
}

const MasterPlanTable: React.FC<IProps> = ({isEditMode, data, updateTasks, onChange}) => {
    const {t} = useTranslation('models');

    const {data: taskCategories = []} = modelsApi.endpoints.getTaskCategory.useQuery({});
    const {data: permissiveDocuments = []} = modelsApi.endpoints.getPermissiveDocuments.useQuery({});

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

    const permissiveDocumentOptions = useMemo(
        () =>
            permissiveDocuments.map<DefaultOptionType>(doc => ({
                label: doc.name,
                value: doc.id,
            })),
        [permissiveDocuments]
    );

    const handleSelectTaskCategory = useCallback(
        (value: string, recordId: string) => {
            if (onChange)
                onChange(
                    data.map(d =>
                        d.id!.toString() === recordId
                            ? {...d, categoryType: {...d.categoryType, id: value ? parseInt(value, 10) : undefined}}
                            : d
                    )
                );
        },
        [data, onChange]
    );

    const handleSelectDocuments = useCallback(
        (value: DefaultOptionType[] = [], recordId: string) => {
            if (onChange)
                onChange(
                    data.map(d =>
                        d.id!.toString() === recordId
                            ? {
                                  ...d,
                                  packagingMaterialDocumentTypes: value.map(v => ({
                                      id: v.value as number,
                                      description: v.label as string,
                                  })),
                              }
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
                // @ts-ignore-next-line
                render: (data: TDataType['status']) => t(`ModelDetails.MasterPlan.Table.Options.Person.${data}`),
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.category'),
                dataIndex: 'category',
                render: (data: TDataType['category']) => data.name,
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.type'),
                dataIndex: 'type',
                render: (data: TDataType['type'], record: TDataType) => {
                    if (isEditMode) {
                        return (
                            <TaskCategorySelect
                                taskCategoryOptions={taskCategoryOptions}
                                onSelect={handleSelectTaskCategory}
                                selected={data.id!}
                                record={record}
                            />
                        );
                    } else {
                        return data.name;
                    }
                },
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.documents'),
                dataIndex: 'documents',
                render: (data: TDataType['documents'], record) => {
                    if (isEditMode) {
                        return (
                            <TreeSelect
                                className={styles.treeSelect}
                                size="large"
                                treeData={permissiveDocumentOptions}
                                value={data.map(d => ({label: d.description, value: d.id}))}
                                onChange={value => handleSelectDocuments(value, record.key as string)}
                                showCheckedStrategy="SHOW_CHILD"
                                treeCheckable
                            />
                        );
                    } else {
                        return (
                            <ShowMoreStrComponent arr={data.map(el => el.description)} sliceBeforePointers={2} t={t} />
                        );
                    }
                },
                width: 350,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.legal'),
                dataIndex: 'legal',
                render: (data: TDataType['legal']) => {
                    if (isEditMode) {
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
                        return <ShowMoreStrComponent arr={data.map(el => el.title)} sliceBeforePointers={2} t={t} />;
                    }
                },
                width: 600,
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
                    if (isEditMode) {
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
                    if (isEditMode) {
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
                                <Grid columns="auto auto auto" justifyContent="space-between">
                                    <div>
                                        {/* @ts-ignore-next-line */}
                                        {t(`ModelDetails.MasterPlan.Table.Options.Role.${data.type}`)}
                                    </div>
                                    <div>id:</div>
                                    <div>{data?.externalId}</div>
                                </Grid>
                            );
                        } else {
                            // @ts-ignore-next-line
                            return t(`ModelDetails.MasterPlan.Table.Options.Role.${data.type}`);
                        }
                    }
                },
                width: 280,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.approvingPerson'),
                dataIndex: 'approvers',
                render: (data: TDataType['approvers']) => {
                    if (isEditMode) {
                        return (
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={data[0]?.type}
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
                            <div>
                                {data?.map(el => (
                                    <div key={el.id}>
                                        {el.externalId === 'SERVICE_PROVIDER' ? (
                                            <Grid columns="auto auto auto" justifyContent="space-between">
                                                <div>
                                                    {/* @ts-ignore-next-line */}
                                                    {t(`ModelDetails.MasterPlan.Table.Options.Role.${el.type}`)}
                                                </div>
                                                <div>id:</div>
                                                <div>{el?.externalId}</div>
                                            </Grid>
                                        ) : (
                                            <>
                                                {/* @ts-ignore-next-line */}
                                                {t(`ModelDetails.MasterPlan.Table.Options.Role.${el.type}`)}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    }
                },
                width: 280,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.documentTemplate'),
                dataIndex: 'documentTemplate',
                render: (ids: TDataType['documentTemplate']) => (
                    <>
                        {/* {ids.map(id => (
                            <Grid columns="auto auto auto" justifyContent="space-between" alignItems="center">
                                <RegularButton
                                    key={id}
                                    iconRight={<DownloadIcon />}
                                    onClick={() => downloadFile(id)}
                                    variant="pseudo"
                                />
                                <div>id:</div>
                                <div>{id}</div>
                            </Grid>
                        ))} */}
                        <ShowMoreDocsComponent arr={ids.map(id => id)} sliceBeforePointers={2} t={t} />
                    </>
                ),
                width: 240,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.taskRequirement'),
                dataIndex: 'taskRequirement',
                render: (data: TDataType['taskRequirement']) => {
                    if (isEditMode) {
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
        [handleSelectDocuments, handleSelectTaskCategory, isEditMode, permissiveDocumentOptions, t, taskCategoryOptions]
    );

    const dataSource = useMemo<TDataType[]>(
        () =>
            data.map(d => ({
                key: d.id!,
                status: d.regulatoryType,
                category: d.categoryType?.category || {},
                type: d.categoryType || {},
                legal: d.linkedRegulations || [],
                documents: d.packagingMaterialDocumentTypes,
                origin: d.creationInformation || {createdAt: '', createdBy: ''},
                process: d.manualProcessing,
                responsible: d.responsible,
                approvers: d.approvers,
                documentTemplate: d?.documentTemplates ? d.documentTemplates : [],
                taskRequirement: d.taskRequired,
            })) || [],
        [data]
    );

    const rowSelection = useMemo<TableRowSelection<TDataType>>(
        () => ({
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[], selectedRows: TDataType[]) => {
                const key = data[0]?.regulatoryType;
                if (updateTasks) {
                    updateTasks(key, selectedRowKeys as number[]);
                }
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
