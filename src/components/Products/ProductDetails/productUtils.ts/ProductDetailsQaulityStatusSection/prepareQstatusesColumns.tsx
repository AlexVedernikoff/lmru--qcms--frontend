import {Dropdown, DropdownItem, RegularButton, Input} from 'fronton-react';
import {IDataDeatailsQstatus} from '../../../../../common/types/productDetails';
import HistoryBackIcon from '../../../../Icons/HistoryBackIcon';
import {CustomSwitch} from '../../../../Common/Switch/CustomSwitch';
import {EBlockers} from '../../ProductDetailsQualityStatusSection';

type HandleSelectType = (record: IDataDeatailsQstatus) => (value: string | null) => void;
type HandleChangeType = (record: IDataDeatailsQstatus, value: string) => void;
type HandleStatusComment = (record: IDataDeatailsQstatus, comment: string) => void;
type HandleSaveStatusComment = (comment: string) => void;

export const prepareQstatusesColumns = (
    handleSelect: HandleSelectType,
    handleChange: HandleChangeType,
    handleStatusComment: HandleStatusComment,
    handleSaveStatusComment: HandleSaveStatusComment
) => {
    return [
        {
            title: 'BU',
            dataIndex: 'bu',
        },
        {
            title: 'Статус качества',
            dataIndex: 'statuses',
            render: (statuses: string[], record: IDataDeatailsQstatus) =>
                record &&
                statuses?.length > 0 && (
                    <>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                            <Dropdown
                                size="m"
                                closeOnSelect
                                value={record.curentStatus}
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

                        {record.isStatusCommentOpened && (
                            <div style={{display: 'grid', gridTemplateColumns: '0.8fr 0.2fr'}}>
                                <Input
                                    inputSize="m"
                                    autoComplete="off"
                                    // label="Комментарий для статуса качества"
                                    // name={'approvedBy'}
                                    placeholder="Комментарий для статуса качества"
                                    value={record.statusComment}
                                    onChange={e => {
                                        handleStatusComment(record, e.target.value);
                                    }}
                                />
                                <RegularButton
                                    disabled={record.statusComment ? false : true}
                                    onClick={() => handleSaveStatusComment(record.statusComment)}
                                >
                                    сохранить
                                </RegularButton>
                            </div>
                        )}
                    </>
                ),
        },
        {
            title: 'Блокировка заказов',
            dataIndex: 'blockOrders',
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                    <CustomSwitch
                        handleChange={() => handleChange(record, EBlockers.BlockOrders)}
                        name=""
                        checked={record.blockOrders}
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
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                    <CustomSwitch
                        handleChange={() => handleChange(record, EBlockers.BlockSellings)}
                        name=""
                        checked={record.blockSellings}
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
            render: (_statuses: string[], record: IDataDeatailsQstatus) => (
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                    <CustomSwitch
                        handleChange={() => handleChange(record, EBlockers.BlockPublics)}
                        name=""
                        checked={record.blockPublics}
                    />
                    <RegularButton data-id={record.id} href="" rel="" aria-label="" variant="pseudo" iconOnly>
                        <HistoryBackIcon />
                    </RegularButton>
                </div>
            ),
        },
    ];
};
