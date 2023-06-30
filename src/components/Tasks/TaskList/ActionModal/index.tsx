import {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import AddApprover from './AddApprover';
import AddAssignee from './AddAssignee';
import tasksApi from '../../tasksApi';
import {EModalVariant} from '../types';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    dataList: unknown[];
    variant: EModalVariant;
}

const ActionModal: React.FC<IProps> = ({isOpen, onClose, dataList, variant}) => {
    const {t} = useTranslation('tasks');

    const [type, setType] = useState<string | undefined>();
    const [user, setUser] = useState<string | undefined>();

    const [updateTasks] = tasksApi.endpoints.updateTasks.useMutation();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };
    const handleSelect = (v: string | null) => {
        setType(p => (p === v || !v ? undefined : v));
    };

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        await updateTasks({
            header: {
                securityCode: 'security_code',
            },
            body: {
                // @ts-ignore-next-line
                qualityActions: dataList.map(v => {
                    let result = v;

                    switch (variant) {
                        case EModalVariant.approver:
                            // @ts-ignore-next-line
                            result = {...v, approvers: [{type, externalId: user}]};
                            break;
                        case EModalVariant.assignee:
                            // @ts-ignore-next-line
                            result = {...v, responsible: [{type, externalId: user}]};
                            break;
                    }

                    return result;
                }),
                updatedBy: 'currentUser',
            },
        });
        onClose();
    };

    const content = useMemo(() => {
        let header: string = '';
        let body: React.ReactNode = '';

        switch (variant) {
            case EModalVariant.approver:
                header = 'Изменение утверждающего';
                body = <AddApprover handleInput={handleInput} handleSelect={handleSelect} user={user} type={type} />;
                break;
            case EModalVariant.assignee:
                header = 'Изменение исполнителя';
                body = <AddAssignee handleInput={handleInput} handleSelect={handleSelect} user={user} type={type} />;
                break;
        }

        return {header, body};
    }, [type, user, variant]);

    return (
        <Modal show={isOpen} onClose={handleClose} size="m">
            <ModalHeader title={content.header} />
            <ModalContent>{content.body}</ModalContent>
            <ModalFooter>
                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton onClick={onClose} size="m" variant="outline">
                        {t('Buttons.Cancel')}
                    </RegularButton>

                    <RegularButton onClick={handleSave}>{t('Buttons.Save')}</RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default ActionModal;
