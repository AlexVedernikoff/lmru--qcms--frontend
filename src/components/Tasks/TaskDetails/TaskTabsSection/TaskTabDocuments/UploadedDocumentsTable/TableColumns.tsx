import {Dropdown, DropdownItem, Grid, IconButton, RegularButton} from 'fronton-react';
import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
// import {ITaskUploadedDocument} from '../../../../../../common/clientModels';
import DownloadIcon from '../../../../../Icons/DownloadIcon';
import {CustomSwitch} from '../../../../../Common/Switch/CustomSwitch';
import {TrashIcon} from '@fronton/icons-react';
import {ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';

export interface IDataType extends ITaskUploadedDocument {
    key: React.Key;
}

const downloadDocument = () => {
    //TODO доделать скачивание файла корректно
    fetch('https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/download-quality-document/109', {
        headers: {
            securityCode: 'security_code',
        },
    })
        .then(response => {
            return response.blob();
        })
        .then(blob => {
            var file = window.URL.createObjectURL(blob);
            window.location.assign(file);
        });
};

export const getTableColumns = (t: TFunction<'tasks', undefined, 'tasks'>): ColumnsType<ITaskUploadedDocument> => [
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.documentType'),
        dataIndex: 'type',
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
        render: d => (
            <RegularButton
                variant="pseudo"
                iconRight={<DownloadIcon />}
                onClick={() => {
                    downloadDocument();
                }}
            />
        ),
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
