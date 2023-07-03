import {Dropdown, DropdownItem, RegularButton, Input} from 'fronton-react';
import {IDataDeatailsQstatus} from '../../../../../common/types/productDetails';
import HistoryBackIcon from '../../../../Icons/HistoryBackIcon';
import {CustomSwitch} from '../../../../Common/Switch/CustomSwitch';
import {EBlockers} from '../../ProductDetailsQstatusSection/ProductDetailsQualityStatusSection';
import {ColumnsType} from 'antd/es/table';
import styles from '../../ProductDetailsQstatusSection/productDetailsQstatuses.module.css';
import HistoryTabModal from '../../ProductDetailsQstatusSection/HistoryTabModal';

type HandleSelectType = (recordId: string) => (value: string | null) => void;
type HandleChangeType = (recordId: string, value: string) => void;
type HandleStatusCommentType = (recordId: string, comment: string) => void;
type HandleBlockersCommentsType = (recordId: string, comment: string, value: string) => void;
type HandleHistoryTablesType = (recordId: string, dataIndex: string) => void;

export enum DataIndexQtable {
    BuCodeText = 'buCodeText',
    Statuses = 'statuses',
    BlockOrders = 'blockOrders',
    BlockSellings = 'blockSellings',
    BlockPublics = 'blockPublics',
}

export const prepareQstatusesColumns = (
    handleSelect: HandleSelectType,
    handleChange: HandleChangeType,
    handleStatusComment: HandleStatusCommentType,
    handleBlockersComments: HandleBlockersCommentsType,
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
                                onSelect={handleSelect(record.id)}
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

                        {record.isStatusCommentOpened && (
                            <Input
                                className={styles.inputComment}
                                inputSize="m"
                                autoComplete="off"
                                placeholder="Комментарий..."
                                value={record.statusComment}
                                onChange={e => {
                                    handleStatusComment(record.id, e.target.value);
                                }}
                            />
                        )}

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
                            handleChange={() => handleChange(record.id, EBlockers.BlockOrders)}
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
                    {record.isBlockOrderOpened && (
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            placeholder="Комментарий..."
                            value={record.blockOrdersComment}
                            onChange={e => {
                                handleBlockersComments(record.id, e.target.value, EBlockers.BlockOrders);
                            }}
                        />
                    )}

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
                            handleChange={() => handleChange(record.id, EBlockers.BlockSellings)}
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
                    {record.isBlockSellingsOpened && (
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            placeholder="Комментарий..."
                            value={record.blockSellingsComment}
                            onChange={e => {
                                handleBlockersComments(record.id, e.target.value, EBlockers.BlockSellings);
                            }}
                        />
                    )}

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
                            handleChange={() => handleChange(record.id, EBlockers.BlockPublics)}
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
                    {record.isBlockPublicsOpened && (
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            placeholder="Комментарий..."
                            value={record.blockPublicsComment}
                            onChange={e => {
                                handleBlockersComments(record.id, e.target.value, EBlockers.BlockPublics);
                            }}
                        />
                    )}

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
