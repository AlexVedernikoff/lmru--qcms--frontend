import {Dropdown, DropdownItem, Grid, IconButton, RegularButton} from 'fronton-react';
import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import DownloadIcon from '../../../../../Icons/DownloadIcon';
import {CustomSwitch} from '../../../../../Common/Switch/CustomSwitch';
import {ITaskUploadedDocument} from '../../../../../../common/types/taskDetails';
import {convertDateFromServer} from '../../../../../../utils/convertDateFromServer';
import BasketIcon from '../../../../../Icons/BasketIcon';

export interface IDataType extends ITaskUploadedDocument {
    key: React.Key;
}

const downloadDocument = (id: number) => {
    let fileName: string | null | undefined = '';

    fetch(`https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/download-quality-document/${id}`, {
        headers: {
            securityCode: 'security_code',
        },
    })
        .then(response => {
            if (String(response.status)[0] === '4') {
                alert(`Ошибка! Файла с id = ${id} не существует.`);
                return;
            }

            fileName = response.headers.get('Content-Disposition')?.split("'").slice(-1)[0];
            return response.blob();
        })
        .then(blob => {
            if (blob != null) {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName as string;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
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
        width: 240,
        render: text => (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>{text.fileName}</div>
                <RegularButton
                    variant="pseudo"
                    iconRight={<DownloadIcon />}
                    onClick={() => {
                        downloadDocument(Number(text.id));
                    }}
                />
            </div>
        ),
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.partial'),
        dataIndex: 'isForLot',
        width: 240,
        render: d => <CustomSwitch checked={d} handleChange={() => {}} name="" />,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.uploadDate'),
        dataIndex: 'creationInformation',
        width: 240,
        render: d => <div>{convertDateFromServer(d?.createdAt)}</div>,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.startDate'),
        dataIndex: 'issueDate',
        width: 240,
        render: d => <div>{convertDateFromServer(d)}</div>,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.endDate'),
        dataIndex: 'expireDate',
        width: 240,
        render: d => <div>{convertDateFromServer(d)}</div>,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.documentMask'),
        dataIndex: 'mask',
        width: 240,
    },
    {
        title: t('TaskTabs.Documents.UploadedDocuments.Field.uploaderName'),
        dataIndex: 'creationInformation',
        width: 240,
        render: d => <div>{d?.createdBy}</div>,
    },
    {
        title: undefined,
        dataIndex: undefined,
        width: 48,
        render: () => (
            <div style={{textAlign: 'center'}}>
                <IconButton href="" rel="" aria-label="" style={{verticalAlign: 'middle'}}>
                    <BasketIcon />
                </IconButton>
            </div>
        ),
    },
];
