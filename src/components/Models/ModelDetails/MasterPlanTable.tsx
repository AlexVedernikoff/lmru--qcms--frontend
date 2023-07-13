import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Chip, Dropdown, DropdownItem, Grid} from 'fronton-react';
import {TreeSelect} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {DefaultOptionType} from 'antd/es/select';
import {TableRowSelection} from 'antd/es/table/interface';
import {IMasterPlanRequirementTableItem, TWithReactKey} from 'common/clientModels';
import {EUserRole, IMasterPlanTask} from 'common/types/models';
import CustomTable from '../../Common/CustomTable';
import {CustomSwitch} from '../../Common/Switch/CustomSwitch';
import modelsApi from '../modelsApi';
import ShowMoreStrComponent from './ShowMoreStrComponent';
import ShowMoreDocsComponent from './ShowMoreDocsComponent';
import styles from './ModelDetails.module.css';
import SelectFilesToUploadButton from 'components/Common/SelectFilesToUploadButton';
import {IDocumentMetaData} from 'common/types/files';

enum EProcess {
    'AUTO' = 'AUTO',
    'MANUAL' = 'MANUAL',
}

type TDataType = TWithReactKey<IMasterPlanRequirementTableItem>;

interface IProps {
    data: IMasterPlanTask[];
    updateTasks?: (value: number[]) => void;
    onChange?: (data: IMasterPlanTask[]) => void;
    isEditMode: boolean;
}

const MasterPlanTable: React.FC<IProps> = ({isEditMode, data, updateTasks, onChange}) => {
    const {t} = useTranslation('models');

    const {data: taskCategories = []} = modelsApi.endpoints.getTaskCategory.useQuery({});
    const {data: permissiveDocuments = []} = modelsApi.endpoints.getPermissiveDocuments.useQuery({});
    const [createDocument] = modelsApi.endpoints.createDocument.useMutation();

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
            permissiveDocuments
                .filter(doc => doc.type === 'PACKAGING')
                .map<DefaultOptionType>(doc => ({
                    label: doc.name,
                    value: doc.id,
                })),
        [permissiveDocuments]
    );

    const handleSelectTaskCategory = useCallback(
        (value: string, categoryId: number, recordId: number) => {
            if (onChange) {
                onChange(
                    data.map(d =>
                        d.id === recordId
                            ? {
                                  ...d,
                                  categoryType: {
                                      ...d.categoryType,
                                      id: value ? parseInt(value, 10) : undefined,
                                      category: {id: categoryId},
                                  },
                              }
                            : d
                    )
                );
            }
        },
        [data, onChange]
    );

    const handleSelectDocuments = useCallback(
        (value: number[] = [], recordId: number) => {
            if (onChange) {
                onChange(
                    data.map(d =>
                        d.id === recordId
                            ? {
                                  ...d,
                                  packagingMaterialDocumentTypes: value.map(v => ({
                                      id: v,
                                      description: '',
                                  })),
                              }
                            : d
                    )
                );
            }
        },
        [data, onChange]
    );

    const handleTaskRequirement = useCallback(
        (next: boolean, recordId: number) => {
            if (onChange) {
                onChange(data.map(d => (d.id === recordId ? {...d, taskRequired: next} : d)));
            }
        },
        [data, onChange]
    );

    const handleProcessChange = useCallback(
        (next: EProcess, recordId: number) => {
            if (onChange) {
                onChange(data.map(d => (d.id === recordId ? {...d, manualProcessing: next === EProcess.MANUAL} : d)));
            }
        },
        [data, onChange]
    );

    const handleFilesSelect = useCallback(
        (files: FileList, recordId: number) => {
            if (!files.length) return;

            const file = files[0];

            const documentMetaData: IDocumentMetaData = {
                createdBy: 'currentUser',
                type: 'qualityModelTemplate',
                isForLot: false,
                isTemplate: true,
                fileName: file.name,
            };

            const body = new FormData();
            body.append('file1', file);
            body.append('documentMetaData', JSON.stringify(documentMetaData));

            createDocument({body})
                .unwrap()
                .then(
                    res => {
                        if (onChange) {
                            type TResponse = {content: Array<{id: number}>};
                            const docId = (res as TResponse)?.content?.[0]?.id;

                            onChange(
                                data.map(d =>
                                    d.id === recordId
                                        ? {
                                              ...d,
                                              documentTemplates: [...(d.documentTemplates || []), docId],
                                          }
                                        : d
                                )
                            );
                        }
                    },
                    () => {}
                );
        },
        [createDocument, data, onChange]
    );

    const handleDeleteTemplate = useCallback(
        (templateId: number, recordId: number) => {
            if (onChange) {
                onChange(
                    data.map(d =>
                        d.id === recordId
                            ? {
                                  ...d,
                                  documentTemplates: (d.documentTemplates || []).filter(d => d !== templateId),
                              }
                            : d
                    )
                );
            }
        },
        [data, onChange]
    );

    const handleSelectResponsible = useCallback(
        (type: EUserRole, recordId: number) => {
            if (onChange) {
                onChange(
                    data.map(d =>
                        d.id === recordId
                            ? {
                                  ...d,
                                  responsible: {...d.responsible, type, id: d.responsible?.id || 1},
                              }
                            : d
                    )
                );
            }
        },
        [data, onChange]
    );

    const handleSelectApprover = useCallback(
        (type: EUserRole, userId: number = 1, recordId: number) => {
            if (onChange) {
                onChange(
                    data.map(d =>
                        d.id === recordId
                            ? {
                                  ...d,
                                  approvers:
                                      d.approvers.length > 0
                                          ? d.approvers.map(a => (a.id === userId ? {...a, type} : a))
                                          : [{id: userId, type}],
                              }
                            : d
                    )
                );
            }
        },
        [data, onChange]
    );

    const columns = useMemo<ColumnsType<TDataType>>(
        () => [
            // {
            //     title: t('ModelDetails.MasterPlan.Table.Columns.status'),
            //     dataIndex: 'status',
            //     render: (data: TDataType['status']) =>
            //         t(`ModelDetails.MasterPlan.Table.Options.Person.${data as ERegulatoryType}`),
            //     width: 246,
            // },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.category'),
                dataIndex: 'category',
                render: (data: TDataType['category']) => data.name,
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.type'),
                dataIndex: 'type',
                render: (data: TDataType['type'], record: TDataType) =>
                    isEditMode ? (
                        <TreeSelect
                            className={styles.treeSelect}
                            size="large"
                            treeData={taskCategoryOptions}
                            value={data.id ? [`type ${data.id}`] : []}
                            onChange={value =>
                                handleSelectTaskCategory(
                                    value?.[0]?.split(' ')?.[1],
                                    record.category.id!,
                                    record.key as number
                                )
                            }
                            showCheckedStrategy="SHOW_CHILD"
                            treeCheckable
                        />
                    ) : (
                        data.name
                    ),
                width: 246,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.documents'),
                dataIndex: 'documents',
                render: (data: TDataType['documents'], record) =>
                    isEditMode ? (
                        <TreeSelect
                            className={styles.treeSelect}
                            size="large"
                            treeData={permissiveDocumentOptions}
                            value={data.map(d => d.id)}
                            onChange={value => handleSelectDocuments(value, record.key as number)}
                            showCheckedStrategy="SHOW_CHILD"
                            treeCheckable
                        />
                    ) : (
                        <ShowMoreStrComponent arr={data.map(el => el.description)} sliceBeforePointers={2} t={t} />
                    ),
                width: 350,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.legal'),
                dataIndex: 'legal',
                render: (data: TDataType['legal']) => (
                    // isEditMode ? (
                    //     <Dropdown
                    //         size="m"
                    //         closeOnSelect
                    //         placeholder={t('Common.Select')}
                    //         value={data[0]?.id?.toString()}
                    //         onSelect={() => {}}
                    //     >
                    //         {data.map(el => (
                    //             <DropdownItem key={el.id} text={el.title} value={el.id} />
                    //         ))}
                    //     </Dropdown>
                    // ) :
                    <ShowMoreStrComponent arr={data.map(el => el.title)} sliceBeforePointers={2} t={t} />
                ),
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
                render: (data: TDataType['process'], record) =>
                    isEditMode ? (
                        <Dropdown
                            size="m"
                            closeOnSelect
                            placeholder={t('Common.Select')}
                            value={data ? EProcess.MANUAL : EProcess.AUTO}
                            onSelect={next => handleProcessChange(next as EProcess, record.key as number)}
                        >
                            {[
                                {
                                    label: t('ModelDetails.MasterPlan.Table.Options.Process.MANUAL'),
                                    value: EProcess.MANUAL,
                                },
                                {
                                    label: t('ModelDetails.MasterPlan.Table.Options.Process.AUTO'),
                                    value: EProcess.AUTO,
                                },
                            ].map(d => (
                                <DropdownItem key={d.label} text={d.label} value={d.value} />
                            ))}
                        </Dropdown>
                    ) : (
                        t(`ModelDetails.MasterPlan.Table.Options.Process.${data ? EProcess.MANUAL : EProcess.AUTO}`)
                    ),
                width: 180,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.responsiblePerson'),
                dataIndex: 'responsible',
                render: (data: TDataType['responsible'], record) => {
                    if (isEditMode) {
                        return (
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={data.type}
                                onSelect={v => handleSelectResponsible(v as EUserRole, record.key as number)}
                            >
                                {[EUserRole.SUPPLIER, EUserRole.QE, EUserRole.SQM, EUserRole.SERVICE_PROVIDER].map(
                                    d => (
                                        <DropdownItem
                                            key={d}
                                            text={t(`ModelDetails.MasterPlan.Table.Options.Role.${d}`)}
                                            value={d}
                                        />
                                    )
                                )}
                            </Dropdown>
                        );
                    } else {
                        if (data.type === EUserRole.SERVICE_PROVIDER) {
                            return (
                                <Grid columns="auto auto" gap={8}>
                                    <div>{t(`ModelDetails.MasterPlan.Table.Options.Role.${data.type}`)}</div>
                                    <div>id: {data?.externalId}</div>
                                </Grid>
                            );
                        } else {
                            return t(`ModelDetails.MasterPlan.Table.Options.Role.${data.type}`);
                        }
                    }
                },
                width: 280,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.approvingPerson'),
                dataIndex: 'approvers',
                render: (data: TDataType['approvers'], record) => {
                    if (isEditMode) {
                        return (
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={data[0]?.type}
                                onSelect={v => handleSelectApprover(v as EUserRole, data[0]?.id, record.key as number)}
                            >
                                {[EUserRole.SUPPLIER, EUserRole.QE, EUserRole.SQM, EUserRole.SERVICE_PROVIDER].map(
                                    d => (
                                        <DropdownItem
                                            key={d}
                                            text={t(`ModelDetails.MasterPlan.Table.Options.Role.${d}`)}
                                            value={d}
                                        />
                                    )
                                )}
                            </Dropdown>
                        );
                    } else {
                        return (
                            <div>
                                {data?.map(el => (
                                    <div key={el.id}>
                                        {el.type === EUserRole.SERVICE_PROVIDER ? (
                                            <Grid columns="auto auto" gap={8}>
                                                <div>{t(`ModelDetails.MasterPlan.Table.Options.Role.${el.type}`)}</div>
                                                <div>id: {el.externalId}</div>
                                            </Grid>
                                        ) : (
                                            t(`ModelDetails.MasterPlan.Table.Options.Role.${el.type}`)
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
                render: (documentTemplateIdList: TDataType['documentTemplate'], record) =>
                    isEditMode ? (
                        <Grid>
                            <Grid columns="auto auto">
                                {documentTemplateIdList.map(doc => (
                                    <Chip
                                        key={doc}
                                        variant="outline"
                                        text={doc.toString()}
                                        onDelete={() => handleDeleteTemplate(doc, record.key as number)}
                                    />
                                ))}
                            </Grid>
                            <Grid columns="200px" rows="54px">
                                <SelectFilesToUploadButton
                                    onFilesSelect={files => handleFilesSelect(files, record.key as number)}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <ShowMoreDocsComponent
                            arr={documentTemplateIdList.map(id => id)}
                            sliceBeforePointers={2}
                            t={t}
                        />
                    ),
                width: 240,
            },
            {
                title: t('ModelDetails.MasterPlan.Table.Columns.taskRequirement'),
                dataIndex: 'taskRequirement',
                render: (data: TDataType['taskRequirement'], record) => (
                    <Grid justifyContent="center">
                        <CustomSwitch
                            checked={data}
                            name=""
                            handleChange={e => handleTaskRequirement(e.target.checked, record.key as number)}
                            disabled={!isEditMode}
                        />
                    </Grid>
                ),
                width: 180,
            },
        ],
        [
            t,
            isEditMode,
            taskCategoryOptions,
            permissiveDocumentOptions,
            handleSelectTaskCategory,
            handleSelectDocuments,
            handleProcessChange,
            handleSelectResponsible,
            handleSelectApprover,
            handleDeleteTemplate,
            handleFilesSelect,
            handleTaskRequirement,
        ]
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
            onChange: (selectedRowKeys: React.Key[]) => {
                if (updateTasks) {
                    updateTasks(selectedRowKeys as number[]);
                }
            },
            fixed: 'left',
        }),
        [updateTasks]
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
