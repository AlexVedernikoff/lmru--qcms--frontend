import {BackofficeStatus, Grid, Textarea, Typography, Dropdown, DropdownItem, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CustomTable from '../../Common/CustomTable';
import styles from '../../Common.module.css';

import {ColumnsType} from 'antd/es/table';
import {useEffect, useMemo, useState} from 'react';
import HistoryBackIcon from '../../Icons/HistoryBackIcon';
import {CustomSwitch} from '../../Common/Switch/CustomSwitch';
import {useGetDetailsForProductsQuery} from './productDetailsApi';

import {productId, securityCode} from './mockProductDetails';
import {qaulityStatusSectionMapping} from './productUtils.ts/ProductDetailsQaulityStatusSection/qaulityStatusSectionMapping';

interface IqStatuses {
    id: string;
    bu: string;
    statuses: string[];
    blockOrders: boolean;
    blockSellings: boolean;
    blockPublics: boolean;
}

interface IDataType extends IqStatuses {
    key: React.Key;
    status?: string;
}

enum EBlockers {
    BlockOrders = 'blockOrders',
    BlockSellings = 'blockSellings',
    BlockPublics = 'blockPublics',
}

export enum EQualityStatusesEng {
    MissingData = 'MISSING_DATA',
    QualificationInProgress = 'QUALIFICATION_IN_PROGRESS',
    DocumentCollection = 'DOCUMENT_COLLECTION',
    Certified = 'CERTIFIED',
    NotCertified = 'NOT_CERTIFIED',
    TemporarilyAllowed = 'TEMPORARILY_ALLOWED',
}

export enum EQualityStatusesRu {
    MissingData = 'Отсутствуют данные о качестве',
    QualificationInProgress = 'Квалификация',
    DocumentCollection = 'Сбор документации',
    Certified = 'Сертифицирован',
    NotCertified = 'Не сертифицирован',
    TemporarilyAllowed = 'Временно сертифицирован',
}

const arrQstatusesRu = [
    EQualityStatusesRu.MissingData,
    EQualityStatusesRu.QualificationInProgress,
    EQualityStatusesRu.DocumentCollection,
    EQualityStatusesRu.Certified,
    EQualityStatusesRu.NotCertified,
    EQualityStatusesRu.TemporarilyAllowed,
];

const ProductDetailsQualityStatusSection: React.FC = () => {
    const {t} = useTranslation('products');

    const {data: details} = useGetDetailsForProductsQuery({productId, securityCode});

    const [tableData, setTableData] = useState<any[]>([]);

    useEffect(() => {
        if (details?.qualityStatuses && details?.qualityStatuses?.length > 0) {
            const arrQRowsVal = details.qualityStatuses.map((el: any, i: number) => {
                const mapping = qaulityStatusSectionMapping(el);

                return {
                    id: `${i}`,
                    bu: mapping.buCode,
                    statuses: arrQstatusesRu,
                    blockOrders: mapping.blockedForOrders,
                    blockSellings: mapping.blockedForSellings,
                    blockPublics: mapping.blockedForPublics,
                };
            });

            setTableData(arrQRowsVal);
        }
    }, [details?.qualityStatuses]);

    const [isBlockOrder, setIsBlockOrder] = useState(false);
    const [isBlockSellings, setIsBlockSellings] = useState(false);
    const [isBlockPublics, setIsBlockPublics] = useState(false);

    const handleChange = (value: string) => {
        value === EBlockers.BlockOrders && setIsBlockOrder(!isBlockOrder);
        value === EBlockers.BlockSellings && setIsBlockSellings(!isBlockSellings);
        value === EBlockers.BlockPublics && setIsBlockPublics(!isBlockPublics);
    };

    const [chosenValue, setChosenValue] = useState<string>('Отсутствующие данные о качестве');

    const handleSelect = (record: IDataType) => (value: string | null) => {
        if (value) {
            setTableData(prevState => prevState.map((el: any) => (el.id === record.id ? {...el, status: value} : el)));
        }
    };

    const attr_columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: 'BU',
                dataIndex: 'bu',
            },
            {
                title: 'Статус качества',
                dataIndex: 'statuses',
                render: (statuses: string[], record: IDataType) =>
                    record &&
                    statuses?.length > 0 && (
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                value={record.status}
                                onSelect={handleSelect(record)}
                            >
                                {statuses.map((status, i) => (
                                    <DropdownItem text={status} value={status} key={i} />
                                ))}
                            </Dropdown>

                            <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                                <HistoryBackIcon />
                            </RegularButton>
                        </div>
                    ),
            },
            {
                title: 'Блокировка заказов',
                dataIndex: 'blockOrders',
                render: (record: IDataType) => (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(EBlockers.BlockOrders)}
                            name=""
                            checked={isBlockOrder}
                        />
                        <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                ),
            },
            {
                title: 'Блокировка продажи',
                dataIndex: 'blockSellings',
                render: (record: IDataType) => (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(EBlockers.BlockSellings)}
                            name=""
                            checked={isBlockSellings}
                        />
                        <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                ),
            },
            {
                title: 'Блокировка публицкации',
                dataIndex: 'blockPublics',
                render: (record: IDataType) => (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(EBlockers.BlockPublics)}
                            name=""
                            checked={isBlockPublics}
                        />
                        <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                ),
            },
        ],
        [t, chosenValue, isBlockOrder, handleChange, isBlockSellings, isBlockPublics]
    );

    // const attr_data = useMemo<IDataType[]>(() => STATUSES.map(d => ({...d, key: d.id})), []);

    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
                    <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Title')}</Typography>

                    <Typography variant="m" size="body_long">
                        <BackofficeStatus align="left" text="" variant={'default'} />
                        {t('ProductDetails.QualityStatusSection.Table.Empty')}
                    </Typography>

                    <CustomTable columns={attr_columns} dataSource={tableData} pagination={false} size="small" />
                </Grid>
            </Grid>

            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Comments')}</Typography>
                <Textarea />
            </Grid>
            <RegularButton>Отправить</RegularButton>
        </Grid>
    );
};

export default ProductDetailsQualityStatusSection;
