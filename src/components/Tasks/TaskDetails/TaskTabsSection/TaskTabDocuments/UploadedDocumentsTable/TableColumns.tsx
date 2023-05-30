import {Dropdown, DropdownItem, Grid, IconButton} from 'fronton-react';
import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {ITaskUploadedDocument} from '../../../../../../common/models';
import {CustomSwitch} from '../../../../../Common/Switch/CustomSwitch';
import {TrashIcon} from '@fronton/icons-react';

export interface IDataType extends ITaskUploadedDocument {
    key: React.Key;
}

export const getTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<IDataType> => [
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.documentType'),
        dataIndex: 'documentType',
        width: 380,
        render: d => (
            <Dropdown size="s" closeOnSelect placeholder={t('Common.Select')} value={d} onSelect={() => {}}>
                <DropdownItem text={d} value={d} />
            </Dropdown>
        ),
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.documentMask'),
        dataIndex: 'documentMask',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.status'),
        dataIndex: 'status',
        width: 240,
        render: d => (
            <Grid columns="0.1fr 1fr">
                <div
                    style={{
                        borderRadius: '50%',
                        alignSelf: 'center',
                        backgroundColor: '#5AB030',
                        width: '7px',
                        height: '7px',
                    }}
                />
                <div style={{color: '#5AB030'}}>{d}</div>
            </Grid>
        ),
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.documentName'),
        dataIndex: 'documentName',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.partial'),
        dataIndex: 'partial',
        width: 240,
        render: d => <CustomSwitch checked={d} handleChange={() => {}} name="" />,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.uploadDate'),
        dataIndex: 'uploadDate',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.startDate'),
        dataIndex: 'startDate',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.endDate'),
        dataIndex: 'endDate',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.uploaderName'),
        dataIndex: 'uploaderName',
        width: 240,
    },
    {
        title: undefined,
        dataIndex: undefined,
        width: 48,
        render: () => (
            <IconButton href="" rel="" aria-label="">
                <TrashIcon />
            </IconButton>
        ),
    },
];
