import {BackofficeStatus, Grid, Textarea, Typography, Dropdown, DropdownItem, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import CustomTable from '../../Common/CustomTable';
import styles from '../../Common.module.css';

import {ColumnsType} from 'antd/es/table';
import {useMemo, useState} from 'react';
import HistoryBackIcon from '../../Icons/HistoryBackIcon';

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
}

const ProductDetailsQualityStatusSection: React.FC = () => {
    const {t} = useTranslation('products');

    const [chosenValue, setChosenValue] = useState<string>('Отсутствующие данные о качестве');

    const handleSelect = (value: string | null) => {
        console.log(value);
        value && setChosenValue(value);
    };

    const STATUSES: IqStatuses[] = [
        {
            id: '77777',
            bu: 'Леруа Мерлен Россия',
            statuses: ['Отсутствующие данные о качестве', 'второе значение'],
            blockOrders: false,
            blockSellings: false,
            blockPublics: false,
        },
    ];

    const attr_columns = useMemo<ColumnsType<IDataType>>(
        () => [
            {
                title: 'BU',
                dataIndex: 'bu',
            },
            {
                title: 'Статус качества',
                dataIndex: 'statuses',
                render: (statuses: string[], record: IDataType) => (
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <Dropdown
                            size="m"
                            closeOnSelect
                            placeholder={t('Common.Select')}
                            value={chosenValue}
                            onSelect={handleSelect}
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
            },
            {
                title: 'Блокировка продажи',
                dataIndex: 'blockSellings',
            },
            {
                title: 'Блокировка публицкации',
                dataIndex: 'blockPublics',
            },
        ],
        [chosenValue, t]
    );

    const attr_data = useMemo<IDataType[]>(() => STATUSES.map(d => ({...d, key: d.id})), []);

    return (
        <Grid className={styles.panel} rowGap={16} columnGap={16}>
            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Grid className={styles.sectionItem} rowGap={16} columnGap={16} columns="1fr" rows="36px">
                    <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Title')}</Typography>

                    <Typography variant="m" size="body_long">
                        <BackofficeStatus align="left" text="" variant={'default'} />
                        {t('ProductDetails.QualityStatusSection.Table.Empty')}
                    </Typography>

                    <CustomTable columns={attr_columns} dataSource={attr_data} pagination={false} size="small" />
                </Grid>
            </Grid>

            <Grid rowGap={16} columnGap={16} columns="1fr">
                <Typography variant="h3">{t('ProductDetails.QualityStatusSection.Comments')}</Typography>
                <Textarea />
            </Grid>
        </Grid>
    );
};

export default ProductDetailsQualityStatusSection;
