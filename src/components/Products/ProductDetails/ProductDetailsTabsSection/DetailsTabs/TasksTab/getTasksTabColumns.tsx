import {TFunction} from 'i18next';
import {ColumnsType} from 'antd/es/table/interface';
import {IDataProductDetailsTabTasks} from '../../../../../../common/types/productDetails';
import {Grid, RegularButton, Typography} from 'fronton-react';
import LinkIcon from '../../../../../Icons/LinkIcon';
import {DownloadIcon} from '@fronton/icons-react';

type handleProvidersOpen = (id: any) => void;

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

export const getTasksTabColumns = (
    t: TFunction<'products', undefined, 'products'>,
    handleProvidersOpen: handleProvidersOpen
): ColumnsType<IDataProductDetailsTabTasks> => [
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.Type'),
        dataIndex: 'categoryTypeName',
        width: 240,
        // render: (_value: string, record: IDataProductDetailsTabTasks) => (
        //     <RegularButton
        //         data-id={'publicComments'}
        //         onClick={() => {}}
        //         href=""
        //         rel=""
        //         aria-label=""
        //         variant="pseudo"
        //         iconOnly
        //     >
        //         {record.publicComments?.length > 0 ? <ChatTextIcon /> : <ChatIcon />}
        //     </RegularButton>
        // ),
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.Status'),
        dataIndex: 'actionStatus',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.UploadedDocs'),
        dataIndex: 'uploadedDocumentId',
        width: 240,
        render: (uploadedDocumentId: string) => (
            <>
                {uploadedDocumentId && (
                    <Grid columns="2fr 0.5fr">
                        <Typography variant="s" size="body_short">
                            {uploadedDocumentId}
                        </Typography>
                        {uploadedDocumentId && uploadedDocumentId !== '-' && (
                            <RegularButton
                                variant="pseudo"
                                label="download"
                                iconRight={<DownloadIcon />}
                                onClick={() => {
                                    downloadDocument(Number(uploadedDocumentId));
                                }}
                            />
                        )}
                    </Grid>
                )}
            </>
        ),
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.SupplierName'),
        dataIndex: 'supDataName',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.SupplierCode'),
        dataIndex: 'supDatasupplierRMSCode',
        width: 240,
        render: (supDatasupplierRMSCode: string) => (
            <>
                <Grid columns="2fr 0.5fr">
                    <Typography variant="s" size="body_short">
                        {supDatasupplierRMSCode}
                    </Typography>
                    {supDatasupplierRMSCode !== '-' && supDatasupplierRMSCode && (
                        <RegularButton
                            onClick={() => handleProvidersOpen(supDatasupplierRMSCode)}
                            label="download"
                            variant="pseudo"
                            iconRight={<LinkIcon />}
                        />
                    )}
                </Grid>
            </>
        ),
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.QE'),
        dataIndex: 'approversTypeQE',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.SQM'),
        dataIndex: 'approversTypeSQM',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.Number'),
        dataIndex: 'tasks',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.AwaitedDocs'),
        dataIndex: 'awaitedDocuments',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.CategoryName'),
        dataIndex: 'categoryName',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.CreatedAt'),
        dataIndex: 'createdAt',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.ApprovalDueDate'),
        dataIndex: 'approvalDueDate',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.TasksTab.Fields.Responsible'),
        dataIndex: 'responsible',
        width: 240,
    },
];
