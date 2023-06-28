import {Dropdown, DropdownItem, RegularButton} from 'fronton-react';
import {IDataDeatailsQstatus} from '../../../../../common/types/productDetails';
import HistoryBackIcon from '../../../../Icons/HistoryBackIcon';
import {CustomSwitch} from '../../../../Common/Switch/CustomSwitch';
import {EBlockers} from '../../ProductDetailsQualityStatusSection';

type HandleSelectType = (record: IDataDeatailsQstatus) => (value: string | null) => void;
type HandleChangeType = (record: IDataDeatailsQstatus, value: string) => void;

export const prepareQstatusesColumns = (handleSelect: HandleSelectType, handleChange: HandleChangeType) => {
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
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                        <Dropdown size="m" closeOnSelect value={record.status} onSelect={handleSelect(record)}>
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
