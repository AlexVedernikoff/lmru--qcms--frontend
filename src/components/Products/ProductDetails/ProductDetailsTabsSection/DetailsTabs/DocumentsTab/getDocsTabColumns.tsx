import {TFunction} from 'i18next';
import {ColumnsType} from 'antd/es/table/interface';
import {IDataProductDetailsTabDoc} from '../../../../../../common/types/productDetails';
import {Grid, RegularButton, Typography} from 'fronton-react';
import {DownloadIcon} from '@fronton/icons-react';
import {CustomSwitch} from '../../../../../Common/Switch/CustomSwitch';
import {converStringToDateTime, convertDateFromServer} from '../../../../../../utils/convertDateFromServer';
import {downloadFile} from 'api/downloadQualityDocument';

export const getDocsTabColumns = (
    t: TFunction<'products', undefined, 'products'>
): ColumnsType<IDataProductDetailsTabDoc> => [
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.Type'),
        dataIndex: 'type',
        width: 240,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.FileName'),
        dataIndex: 'fileName',
        width: 240,
        render: (text: string, record: IDataProductDetailsTabDoc) => (
            <>
                <Grid columns="2fr 0.5fr">
                    <Typography variant="s" size="body_short">
                        {text}
                    </Typography>
                    <RegularButton
                        variant="pseudo"
                        iconRight={<DownloadIcon />}
                        onClick={() => {
                            downloadFile(Number(record.id));
                        }}
                    />
                </Grid>
            </>
        ),
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.Status'),
        dataIndex: 'arppovingStatus',
        width: 240,
        render: text => {
            if (text === 'Требуется подтверждение') {
                return (
                    <Grid columns="0.1fr 1fr">
                        <div
                            style={{
                                borderRadius: '50%',
                                alignSelf: 'center',
                                backgroundColor: '#ECC600',
                                width: '7px',
                                height: '7px',
                            }}
                        />
                        <div style={{color: '#ECC600'}}>{text}</div>
                    </Grid>
                );
            }
            if (text === 'Подтвержден') {
                return (
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
                        <div style={{color: '#5AB030'}}>{text}</div>
                    </Grid>
                );
            } else if (text === 'Отклонен') {
                return (
                    <Grid columns="0.1fr 1fr">
                        <div
                            style={{
                                borderRadius: '50%',
                                alignSelf: 'center',
                                backgroundColor: '#FFBDBD',
                                width: '7px',
                                height: '7px',
                            }}
                        />
                        <div style={{color: '#FFBDBD'}}>{text}</div>
                    </Grid>
                );
            } else {
                return <div>{'-'}</div>;
            }
        },
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.IsParty'),
        dataIndex: 'isForLot',
        width: 100,
        render: d => (
            <Grid justifyContent="center">
                <CustomSwitch checked={d} handleChange={() => {}} name="" />
            </Grid>
        ),
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.UploadedAt'),
        dataIndex: 'createdAt',
        width: 160,
        render: d => <div>{d ? converStringToDateTime(d) : '-'}</div>,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.IssueDate'),
        dataIndex: 'issueDate',
        width: 180,
        render: d => <div>{d ? converStringToDateTime(d) : '-'}</div>,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.ExpiredAt'),
        dataIndex: 'expireDate',
        width: 140,
        render: d => <div>{d ? convertDateFromServer(d) : '-'}</div>,
    },
    {
        title: t('ProductDetails.ProductDetailsTabs.DocumentsTab.Fields.DocumentMask'),
        dataIndex: 'mask',
        width: 240,
    },
];
