import {ColumnsType} from 'antd/es/table/interface';
import {TFunction} from 'i18next';
import {IProviderTableWithDocuments} from '../../../../common/clientModels';
import UploadIcon from '../../../Icons/UploadIcon';
import {Grid, IconButton} from 'fronton-react';
import LinkIcon from '../../../Icons/LinkIcon';
import {downloadFile} from '../../../../api/downloadQualityDocument';

export interface IDataType extends IProviderTableWithDocuments {
    key: React.Key;
}

export const getProductTableColumns = (t: TFunction<'products', undefined, 'products'>): ColumnsType<IDataType> => [
    {
        title: t('WithDocuments.Table.DocumentNumber'),
        dataIndex: 'documentNumber',
        render: (text: string = '') => (
            <Grid columns="2fr 0.5fr">
                {text}
                <IconButton
                    label="Download"
                    onClick={() => {
                        downloadFile(Number(text));
                    }}
                >
                    <UploadIcon />{' '}
                </IconButton>
            </Grid>
        ),
        width: 270,
    },
    {
        title: t('WithDocuments.Table.Type'),
        dataIndex: 'type',
        width: 124,
    },
    {
        title: t('WithDocuments.Table.ProductCode'),
        dataIndex: 'productCode',
        render: (text: string = '') => (
            <Grid columns="2fr 0.5fr">
                {text}
                <IconButton label="Download">
                    <LinkIcon />{' '}
                </IconButton>
            </Grid>
        ),
        width: 124,
    },
    {
        title: t('WithDocuments.Table.EAN'),
        dataIndex: 'EAN',
        width: 346,
    },
    {
        title: t('WithDocuments.Table.TNVED'),
        dataIndex: 'TNVED',
        width: 160,
    },
    {
        title: t('WithDocuments.Table.Name'),
        dataIndex: 'name',
        width: 260,
    },
    {
        title: t('WithDocuments.Table.ReleaseDate'),
        dataIndex: 'releaseDate',
        width: 390,
    },
    {
        title: t('WithDocuments.Table.EndDate'),
        dataIndex: 'endDate',
        width: 130,
    },
    {
        title: t('WithDocuments.Table.Status'),
        dataIndex: 'status',
        width: 245,
    },
    {
        title: t('WithDocuments.Table.ConfirmationStatus'),
        dataIndex: 'confirmationStatus',
        width: 245,
    },
    {
        title: t('WithDocuments.Table.UploadDate'),
        dataIndex: 'uploadDate',
        width: 160,
    },
    {
        title: t('WithDocuments.Table.NameSupplier'),
        dataIndex: 'nameSupplier',
        width: 160,
    },
    {
        title: t('WithDocuments.Table.SupplierCodeRMS'),
        dataIndex: 'supplieroCodeRMS',
        width: 300,
    },
    {
        title: t('WithDocuments.Table.INN'),
        dataIndex: 'INN',
        width: 340,
    },
    {
        title: t('WithDocuments.Table.BusinessLicenseNumber'),
        dataIndex: 'businessLicenseNumber',
        width: 300,
    },
    {
        title: t('WithDocuments.Table.SSMCode'),
        dataIndex: 'SSMCode',
        width: 160,
    },
    {
        title: t('WithDocuments.Table.Role'),
        dataIndex: 'role',
        width: 160,
    },
    {
        title: t('WithDocuments.Table.DownloadCompleted'),
        dataIndex: 'downloadCompleted',
        width: 120,
    },
];
