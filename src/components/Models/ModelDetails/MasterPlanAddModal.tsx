import {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, Modal, ModalContent, ModalFooter, ModalHeader, RegularButton} from 'fronton-react';
import {PlusIcon} from '@fronton/icons-react';
import {ERegulatoryType, EUserRole, IMasterPlanTask} from 'common/types/models';
import MasterPlanTable from './MasterPlanTable';
import modelsApi from '../modelsApi';
import {useParams} from 'react-router-dom';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    masterPlanId: number;
}

const MasterPlanAddModal: React.FC<IProps> = ({masterPlanId, isOpen, onClose}) => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {refetch} = modelsApi.endpoints.getModelDetails.useQuery({id});
    const [createMasterPlanTasks] = modelsApi.endpoints.createMasterPlanTasks.useMutation();

    const [tableData, setTableData] = useState<IMasterPlanTask[]>([]);

    const handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        await createMasterPlanTasks({
            id: masterPlanId,
            body: {
                updatedBy: 'currentUser',
                tasks: tableData.map(t => ({
                    categoryTypeId: t.categoryType?.id,
                    regulatoryType: t.regulatoryType,
                    linkedRegulations: (t.linkedRegulations || []).map(l => l.id),
                    packagingMaterialDocumentTypes: (t.packagingMaterialDocumentTypes || []).map(p => p.id),
                    manualProcessing: t.manualProcessing,
                    taskRequired: t.taskRequired,
                    responsible: t.responsible,
                    approvers: t.approvers,
                    documentTemplates: t.documentTemplates,
                })),
            },
        });
        onClose();
        await refetch();
    };

    const handleAddRow = () => {
        setTableData(p => [
            ...p,
            {
                manualProcessing: false,
                packagingMaterialDocumentTypes: [],
                regulatoryType: ERegulatoryType.DISTRIBUTOR,
                responsible: {id: 1, type: EUserRole.QE},
                taskRequired: false,
                approvers: [],
            },
        ]);
    };

    const handleTableChange = useCallback((updatedTasks: IMasterPlanTask[]) => {
        setTableData(updatedTasks);
    }, []);

    return (
        <Modal style={{position: 'fixed', zIndex: 15}} show={isOpen} onClose={handleClose} size="l">
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
