import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import {PlusIcon} from '@fronton/icons-react';
import {ERegulatoryType, IMasterPlanTask} from 'common/types/models';
import MasterPlanTable from './MasterPlanTable';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const MasterPlanAddModal: React.FC<IProps> = ({isOpen, onClose}) => {
    const {t} = useTranslation('models');

    const [tableData, setTableData] = useState<IMasterPlanTask[]>([]);

    const handleClose = () => {
        onClose();
    };

    const handleSave = () => {};

    const handleAddRow = () => {
        setTableData(p => [
            ...p,
            {
                manualProcessing: false,
                packagingMaterialDocumentTypes: [],
                regulatoryType: ERegulatoryType.DISTRIBUTOR,
                responsible: {id: 1, type: 'QE'},
                taskRequired: false,
                approvers: [],
            },
        ]);
    };

    const handleTableChange = () => {
        setTableData([]);
    };

    return (
        <Modal show={isOpen} onClose={handleClose} size="l" style={{zIndex: 15}}>
            <ModalHeader title={t('Buttons.Add')} />
            <ModalContent>
                <Grid columns="1fr auto" gap={24}>
                    <div />
                    <RegularButton variant="pseudo" onClick={handleAddRow} iconLeft={<PlusIcon />}>
                        {t('Buttons.Add')}
                    </RegularButton>
                </Grid>
                <MasterPlanTable isEditMode data={tableData} onChange={handleTableChange} />
            </ModalContent>
            <ModalFooter>
                <Grid columns="1fr auto" gap={24}>
                    <div />
                    <RegularButton onClick={handleSave}>{t('Buttons.Save')}</RegularButton>
                </Grid>
            </ModalFooter>
        </Modal>
    );
};

export default MasterPlanAddModal;
