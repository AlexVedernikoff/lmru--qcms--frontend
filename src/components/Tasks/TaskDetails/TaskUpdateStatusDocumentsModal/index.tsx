import {DatePicker, Input, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import {ITaskUploadedDocument} from '../../../../common/types/taskDetails';
import styles from './styles.module.css';
import {ChangeEvent, useState} from 'react';
import {taskDetailsApi} from '../api';
import {useParams} from 'react-router-dom';
import {CustomSwitch} from '../../../Common/Switch/CustomSwitch';
import cutText from '../../../../utils/cutText';
import {notification} from 'antd';

interface Props {
    show: boolean;
    onClose: () => void;
    uploadedDocuments: ITaskUploadedDocument[];
}
type IBodyRequest = {
    [id: number]: {
        mask?: string;
        startDate?: string;
        endDate?: string;
        isForLot?: boolean;
    };
};

const TaskUpdateStatusDocumentsModal: React.FC<Props> = ({show, onClose, uploadedDocuments}) => {
    const {t} = useTranslation('tasks');
    const {id: taskId} = useParams();
    const [text, setText] = useState<IBodyRequest>({});
    const [api, contextHolder] = notification.useNotification();

    // TODO добавить тип документа
    // const [select, setSelect] = useState<ISelectDocument>({});

    const handleInputChange = (value: string, id: number) => {
        setText(prevText => {
            return {...prevText, [id]: {...prevText[id], mask: value}};
        });
    };
    // const handleSelect = (value: string, id: number) => {
    //     setSelect(prevText => {
    //         return {...prevText, [id]: value};
    //     });
    // };

    const [statusDocument] = taskDetailsApi.useUpdateStatusDocumentMutation();
    const onHandleFilterChange = (e: IBodyRequest[number], id: number) => {
        setText(prevText => {
            return {...prevText, [id]: {...prevText[id], ...e}};
        });
    };

    const handleUpdateStatusDocumentSubmit = () => {
        return uploadedDocuments.map(el => {
            let arr = [];
            if (text.hasOwnProperty(el.id)) {
                arr.push(el.id);
                statusDocument({
                    updatedBy: 'Alex',
                    documents: [
                        {
                            id: Number(arr.join()),
                            status: el.status,
                            mask: text[el.id].mask,
                            issueDate: text[el.id].startDate,
                            expireDate: text[el.id].endDate,
                            rosAccreditationApproveStatus: el?.rosAccreditationApproveStatus! || undefined,
                            isForLot: text[el.id].isForLot,
                            fileName: el.fileName,
                            fileLink: el.linkToFile,
                            approvingStatuses: [
                                {
                                    productId: Number(taskId!),
                                    approvingStatus: 'APPROVED',
                                },
                            ],
                            // removeProductBundle: el.
                            comment: el.comment || undefined,
                        },
                    ],
                })
                    .unwrap()
                    .then(
                        () => {
                            api.open({
                                message: 'Запрос успешно отправлен!',
                            });
                        },
                        () => {
                            api.open({
                                message: 'Не удалось отправить запрос, повторите попытку позже',
                            });
                        }
                    );
            }
            return statusDocument;
        });
    };
    const handleSubmit = () => {
        handleUpdateStatusDocumentSubmit();
        onClose();
    };

    return (
        <>
            {contextHolder}
            <Modal
                className={styles.overflow}
                size="l"
                onClose={onClose}
                show={show}
                aria-hidden="false"
                aria-modal="true"
            >
                <ModalHeader title={t('TaskTabs.Actions.actions.updateDocument')} />
                <ModalContent>
                    {uploadedDocuments.map((el, i) => {
                        return (
                            <div key={i} className={styles.container}>
                                <div className={styles.fileName}>{cutText(el.fileName)}</div>{' '}
                                {/* <Dropdown
                                size="m"
                                closeOnSelect
                                placeholder={t('Common.Select')}
                                defaultSelected={uploadedDocuments[i].status}
                                label={t('TaskTabs.Documents.UploadedDocuments.Field.status')}
                                // value={select[el.id]!}
                                // onSelect={value => handleSelect(value!, el.id)}
                                className={styles.select}
                            >
                                <DropdownItem text="ACTIVE" value={'ACTIVE'} />
                                <DropdownItem text="INACTIVE" value={'INACTIVE'} />
                                <DropdownItem text="DELETED" value={'DELETED'} />
                                <DropdownItem text="IN_RENEWAL" value={'IN_RENEWAL'} />
                            </Dropdown> */}
                                <Input
                                    id={el.id.toString()}
                                    className={styles.input}
                                    inputSize="m"
                                    autoComplete="off"
                                    label={'маска документа'}
                                    name={'mask'}
                                    placeholder=""
                                    value={text[el.id]?.mask!}
                                    onChange={e => handleInputChange(e.target.value, el.id)}
                                />
                                <CustomSwitch
                                    name={''}
                                    checked={
                                        text[el.id]?.hasOwnProperty('isForLot') ? text[el.id]?.isForLot! : el?.isForLot!
                                    }
                                    handleChange={function (event: ChangeEvent<HTMLInputElement>): void {
                                        if (text[el.id]?.hasOwnProperty('isForLot')) {
                                            setText(prevText => {
                                                return {
                                                    ...prevText,
                                                    [el.id]: {
                                                        ...prevText[el.id],
                                                        isForLot: !prevText[el.id]?.isForLot!,
                                                    },
                                                };
                                            });
                                        } else {
                                            setText(prevText => {
                                                return {
                                                    ...prevText,
                                                    [el.id]: {
                                                        ...prevText[el.id],
                                                        isForLot: !el?.isForLot!,
                                                    },
                                                };
                                            });
                                        }
                                    }}
                                ></CustomSwitch>
                                <DatePicker
                                    date={[text[el.id]?.startDate!, text[el.id]?.endDate!] || []}
                                    mode="range"
                                    size="s"
                                    view="double"
                                    onChange={function noRefCheck(e) {
                                        const datesArr = [text[el.id]?.startDate, text[el.id]?.endDate];
                                        const datesArrRemoveEmpty = datesArr.filter(el => el);
                                        if (datesArrRemoveEmpty.length < 2) {
                                            datesArrRemoveEmpty.push(e.slice(-1)[0]);
                                        } else {
                                            datesArrRemoveEmpty.splice(0, datesArrRemoveEmpty.length);
                                            datesArrRemoveEmpty.push(e[0]);
                                        }
                                        datesArrRemoveEmpty.sort();
                                        onHandleFilterChange(
                                            {
                                                startDate: datesArrRemoveEmpty[0],
                                                endDate: datesArrRemoveEmpty[1],
                                            },
                                            el.id
                                        );
                                    }}
                                    datePlaceholder="ДД/ММ/ГГГГ - ДД/ММ/ГГГГ"
                                    label={'Даты'}
                                />
                            </div>
                        );
                    })}
                </ModalContent>
                <ModalFooter>
                    <div className={styles.save}>
                        <RegularButton size="l" onClick={handleSubmit}>
                            Сохранить
                        </RegularButton>
                    </div>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default TaskUpdateStatusDocumentsModal;
