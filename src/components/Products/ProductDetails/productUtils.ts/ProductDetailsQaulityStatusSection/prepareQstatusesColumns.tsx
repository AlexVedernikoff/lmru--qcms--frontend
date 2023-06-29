import {Dropdown, DropdownItem, RegularButton, Input} from 'fronton-react';
import {IDataDeatailsQstatus} from '../../../../../common/types/productDetails';
import HistoryBackIcon from '../../../../Icons/HistoryBackIcon';
import {CustomSwitch} from '../../../../Common/Switch/CustomSwitch';
import {EBlockers} from '../../ProductDetailsQualityStatusSection';

type HandleSelectType = (recordId: string) => (value: string | null) => void;
type HandleChangeType = (recordId: string, value: string) => void;
type HandleStatusCommentType = (recordId: string, comment: string) => void;
type HandleBlockersCommentsType = (recordId: string, comment: string, value: string) => void;

export const prepareQstatusesColumns = (
    handleSelect: HandleSelectType,
    handleChange: HandleChangeType,
    handleStatusComment: HandleStatusCommentType,
    handleBlockersComments: HandleBlockersCommentsType
) => {
    return [
        {
            title: 'BU',
            dataIndex: 'buCodeText',
        },
        {
            title: 'Статус качества',
            dataIndex: 'statuses',
            render: (statuses: string[], record: IDataDeatailsQstatus) =>
                record &&
                statuses?.length > 0 && (
                    <>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                            <Dropdown size="m" closeOnSelect value={record.ruStatus} onSelect={handleSelect(record.id)}>
                                {statuses.map((status, i) => (
                                    <DropdownItem text={status} value={status} key={i} />
                                ))}
                            </Dropdown>

                            <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                                <HistoryBackIcon />
                            </RegularButton>
                        </div>

                        {record.isStatusCommentOpened && (
                            <Input
                                inputSize="m"
                                autoComplete="off"
                                placeholder="Комментарий для статуса качества"
                                value={record.statusComment}
                                onChange={e => {
                                    handleStatusComment(record.id, e.target.value);
                                }}
                            />
                        )}
                    </>
                ),
        },
        {
            title: 'Блокировка заказов',
            dataIndex: 'blockOrders',
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(record.id, EBlockers.BlockOrders)}
                            name=""
                            checked={record?.blockOrders ? record.blockOrders : false}
                        />
                        <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                    {record.isBlockOrderOpened && (
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            placeholder="Комментарий для блокировки заказа"
                            value={record.blockOrdersComment}
                            onChange={e => {
                                handleBlockersComments(record.id, e.target.value, EBlockers.BlockOrders);
                            }}
                        />
                    )}
                </>
            ),
        },
        {
            title: 'Блокировка продажи',
            dataIndex: 'blockSellings',
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(record.id, EBlockers.BlockSellings)}
                            name=""
                            checked={record?.blockSellings ? record.blockSellings : false}
                        />
                        <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                    {record.isBlockSellingsOpened && (
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            placeholder="Комментарий для блокировки продажи"
                            value={record.blockSellingsComment}
                            onChange={e => {
                                handleBlockersComments(record.id, e.target.value, EBlockers.BlockSellings);
                            }}
                        />
                    )}
                </>
            ),
        },
        {
            title: 'Блокировка публицкации',
            dataIndex: 'blockPublics',
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <CustomSwitch
                            handleChange={() => handleChange(record.id, EBlockers.BlockPublics)}
                            name=""
                            checked={record?.blockPublics ? record.blockPublics : false}
                        />
                        <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                            <HistoryBackIcon />
                        </RegularButton>
                    </div>
                    {record.isBlockPublicsOpened && (
                        <Input
                            inputSize="m"
                            autoComplete="off"
                            placeholder="Комментарий для блокировки публицкации"
                            value={record.blockPublicsComment}
                            onChange={e => {
                                handleBlockersComments(record.id, e.target.value, EBlockers.BlockPublics);
                            }}
                        />
                    )}
                </>
            ),
        },
    ];
};
