import {Dropdown, DropdownItem, RegularButton, Input} from 'fronton-react';
import {IDataDeatailsQstatus} from '../../../../../common/types/productDetails';
import HistoryBackIcon from '../../../../Icons/HistoryBackIcon';
import {CustomSwitch} from '../../../../Common/Switch/CustomSwitch';
import {ColumnsType} from 'antd/es/table';
import styles from '../../ProductDetailsQstatusSection/productDetailsQstatuses.module.css';
import HistoryTabModal from '../../ProductDetailsQstatusSection/HistoryTabModal';

type HandleChangeType = (recordId: string, value: string, selectedValue?: string | null) => void;
type HandleCommentsType = (recordId: string, comment: string, value: string) => void;
type HandleHistoryTablesType = (recordId: string, dataIndex: string) => void;

export enum DataIndexQtable {
    BuCodeText = 'buCodeText',
    Statuses = 'statuses',
    BlockOrders = 'blockOrders',
    BlockSellings = 'blockSellings',
    BlockPublics = 'blockPublics',
}

export const prepareQstatusesColumns = (
    handleChange: HandleChangeType,
    handleComments: HandleCommentsType,
    handleHistoryTables: HandleHistoryTablesType
): ColumnsType<IDataDeatailsQstatus> => {
    return [
        {
            title: 'BU',
            dataIndex: DataIndexQtable.BuCodeText,
            width: 180,
        },
        {
            title: 'Статус качества',
            dataIndex: DataIndexQtable.Statuses,
            width: 350,
            render: (statuses: string[], record: IDataDeatailsQstatus) =>
                record &&
                statuses?.length > 0 && (
                    <>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                            <Dropdown
                                className={styles.dropdown}
                                size="m"
                                closeOnSelect
                                value={record.ruStatus}
                                onSelect={selectedValue =>
                                    handleChange(record.id, DataIndexQtable.Statuses, selectedValue)
                                }
                            >
                                {statuses.map((status, i) => (
                                    <DropdownItem
                                        className={styles.dropdownItem}
                                        text={status}
                                        value={status}
                                        key={i}
                                    />
                                ))}
                            </Dropdown>

                            <RegularButton
                                onClick={() => handleHistoryTables(record.id, DataIndexQtable.Statuses)}
                                data-id={record.id}
                                href=""
                                rel=""
                                aria-label=""
                                variant="pseudo"
                                iconOnly
                            >
                                <HistoryBackIcon />
                            </RegularButton>
                        </div>

                        <Input
                            className={styles.inputComment}
                            inputSize="m"
                            autoComplete="off"
                            disabled={!record.isStatusCommentOpened}
                            placeholder="Комментарий..."
                            value={record.statusComment}
                            error={!record.isValidStatus}
                            onChange={e => {
                                handleComments(record.id, e.target.value, DataIndexQtable.Statuses);
                            }}
                        />

                        {record.isStatusHistoryOpened && record.statusRowHistory && (
                            <HistoryTabModal
                                isOpen={record.isStatusHistoryOpened}
                                onClose={() => handleHistoryTables(record.id, DataIndexQtable.Statuses)}
                                rowHistory={record.statusRowHistory}
                            />
                        )}
                    </>
                ),
        },
        {
            title: 'Блокировка заказов',
            dataIndex: DataIndexQtable.BlockOrders,
            width: 210,
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(record.id, DataIndexQtable.BlockOrders)}
                            name=""
                            checked={record?.blockOrders ? record.blockOrders : false}
                        />
                        <RegularButton
                            onClick={() => handleHistoryTables(record.id, DataIndexQtable.BlockOrders)}
                            data-id={record.id}
                            href=""
                            rel=""
                            aria-label=""
                            variant="pseudo"
                            iconOnly
                        >
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        placeholder="Комментарий..."
                        disabled={!record.isBlockOrderOpened}
                        value={record.blockOrdersComment}
                        error={!record.isValidBlockOrders}
                        onChange={e => {
                            handleComments(record.id, e.target.value, DataIndexQtable.BlockOrders);
                        }}
                    />

                    {record.isOrdersHistoryOpened && record.ordersRowHistory && (
                        <HistoryTabModal
                            isOpen={record.isOrdersHistoryOpened}
                            onClose={() => handleHistoryTables(record.id, DataIndexQtable.BlockOrders)}
                            rowHistory={record.ordersRowHistory}
                        />
                    )}
                </>
            ),
        },
        {
            title: 'Блокировка продажи',
            dataIndex: DataIndexQtable.BlockSellings,
            width: 210,
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(record.id, DataIndexQtable.BlockSellings)}
                            name=""
                            checked={record?.blockSellings ? record.blockSellings : false}
                        />
                        <RegularButton
                            onClick={() => handleHistoryTables(record.id, DataIndexQtable.BlockSellings)}
                            data-id={record.id}
                            href=""
                            rel=""
                            aria-label=""
                            variant="pseudo"
                            iconOnly
                        >
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        placeholder="Комментарий..."
                        disabled={!record.isBlockSellingsOpened}
                        value={record.blockSellingsComment}
                        error={!record.isValidBlockSellings}
                        onChange={e => {
                            handleComments(record.id, e.target.value, DataIndexQtable.BlockSellings);
                        }}
                    />

                    {record.isSellingsHistoryOpened && record.sellingsRowHistory && (
                        <HistoryTabModal
                            isOpen={record.isSellingsHistoryOpened}
                            onClose={() => handleHistoryTables(record.id, DataIndexQtable.BlockSellings)}
                            rowHistory={record.sellingsRowHistory}
                        />
                    )}
                </>
            ),
        },
        {
            title: 'Блокировка публицкации',
            dataIndex: DataIndexQtable.BlockPublics,
            width: 210,
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(record.id, DataIndexQtable.BlockPublics)}
                            name=""
                            checked={record?.blockPublics ? record.blockPublics : false}
                        />
                        <RegularButton
                            onClick={() => handleHistoryTables(record.id, DataIndexQtable.BlockPublics)}
                            data-id={record.id}
                            href=""
                            rel=""
                            aria-label=""
                            variant="pseudo"
                            iconOnly
                        >
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        placeholder="Комментарий..."
                        disabled={!record.isBlockPublicsOpened}
                        value={record.blockPublicsComment}
                        error={!record.isValidBlockPublics}
                        onChange={e => {
                            handleComments(record.id, e.target.value, DataIndexQtable.BlockPublics);
                        }}
                    />

                    {record.isPublicationsHistoryOpened && record.publicationsRowHistory && (
                        <HistoryTabModal
                            isOpen={record.isPublicationsHistoryOpened}
                            onClose={() => handleHistoryTables(record.id, DataIndexQtable.BlockPublics)}
                            rowHistory={record.publicationsRowHistory}
                        />
                    )}
                </>
            ),
        },
    ];
};
