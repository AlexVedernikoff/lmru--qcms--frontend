import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Grid, RegularButton, Typography} from 'fronton-react';
import {FloppyDiskIcon, PlusIcon, TrashIcon} from '@fronton/icons-react';
import {notification} from 'antd';
import {IMasterPlanTask} from 'common/types/models';
import CardView from '../../Common/CardView';
import modelsApi from '../modelsApi';
import MasterPlanTable from './MasterPlanTable';
import MasterPlanAddModal from './MasterPlanAddModal';
import MasterPlanRemoveTaskModal from './MasterPlanRemoveTaskModal';
import EditIcon from 'components/Icons/EditIcon';

interface IProps {
    masterPlanId: number;
    tasks: IMasterPlanTask[];
}

const ModelDetailsMasterPlan: React.FC<IProps> = ({masterPlanId, tasks}) => {
    const [notificationApi, notificationContext] = notification.useNotification();
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {data: modelDetails, refetch} = modelsApi.endpoints.getModelDetails.useQuery({id});
    const [updateMasterPlanTasks, updateMasterPlanTasksResult] =
        modelsApi.endpoints.updateMasterPlanTasks.useMutation();
    const [deleteTasks, deleteTasksResult] = modelsApi.endpoints.deleteMasterPlanTasks.useMutation();

    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isRemoveTaskOpen, setIsRemoveTaskOpen] = useState(false);

    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
    const [editedTasks, setEditedTasks] = useState<IMasterPlanTask[]>(tasks);

    useEffect(() => {
        if (updateMasterPlanTasksResult.isSuccess) {
            setEditedTasks(tasks);
        }
    }, [updateMasterPlanTasksResult.isSuccess, notificationApi, tasks]);

    useEffect(() => {
        if (updateMasterPlanTasksResult.isError || deleteTasksResult.isError) {
            notificationApi.error({
                message: 'Ошибка!',
                description: 'Во время выполнения запроса произошла ошибка.',
            });
        }
    }, [deleteTasksResult.isError, notificationApi, updateMasterPlanTasksResult.isError]);

    useEffect(() => {
        if (deleteTasksResult.data) {
            setSelectedTasks([]);
        }
    }, [deleteTasksResult.data]);

    const updateTasks = useCallback((value: number[]) => {
        setSelectedTasks(value);
    }, []);

    const handleTasksUpdate = useCallback((updatedTasks: IMasterPlanTask[]) => {
        setEditedTasks(updatedTasks);
    }, []);

    const handleCardClose = () => {};

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = async () => {
        await updateMasterPlanTasks({
            id: masterPlanId,
            body: {
                updatedBy: 'currentUser',
                tasks: editedTasks.map(t => ({
                    id: t.id!,
                    categoryTypeId: t.categoryType!.id!,
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
        await refetch();
        setIsEditMode(false);
    };

    const handleAddClick = () => setIsAddTaskOpen(true);
    const handleAddModalClose = () => setIsAddTaskOpen(false);

    const handleDeleteClick = () => setIsRemoveTaskOpen(true);
    const handleRemoveModalClose = () => setIsRemoveTaskOpen(false);

    const handleConfirmDeletion = async (masterPlanId: number) => {
        await deleteTasks({id: masterPlanId, body: {taskIDs: selectedTasks, updatedBy: 'currentUser'}});
        setIsRemoveTaskOpen(false);
        await refetch();
    };

    return (
        <Grid rowGap={24}>
            <Grid columns="1fr auto">
                <div />
                <div>
                    {isEditMode ? (
                        <RegularButton onClick={handleSaveClick} variant="pseudo" iconLeft={<FloppyDiskIcon />}>
                            {t('Buttons.Save')}
                        </RegularButton>
                    ) : (
                        <RegularButton onClick={handleEditClick} variant="pseudo" iconLeft={<EditIcon />}>
                            {t('Buttons.Edit')}
                        </RegularButton>
                    )}
                    <RegularButton onClick={handleAddClick} variant="pseudo" iconLeft={<PlusIcon />}>
                        {t('Buttons.Add')}
                    </RegularButton>
                    <RegularButton
                        onClick={handleDeleteClick}
                        variant="pseudo"
                        iconLeft={<TrashIcon />}
                        disabled={!selectedTasks.length}
                    >
                        {t('Buttons.Delete')}
                    </RegularButton>
                </div>
            </Grid>

            <Grid columns="auto auto auto" columnGap={24} rowGap={24}>
                {modelDetails?.regulatoryReferences?.map((data, index) => (
                    <CardView
                        key={index}
                        header={
                            data.required
                                ? t('ModelDetails.MasterPlan.Requirement.Type.Required')
                                : t('ModelDetails.MasterPlan.Requirement.Type.Optional')
                        }
                        onClose={handleCardClose}
                        infoLink={data.hyperlink}
                    >
                        <Typography variant="s" size="body_accent">
                            {data.title}
                        </Typography>
                    </CardView>
                ))}
            </Grid>

            <MasterPlanTable
                isEditMode={isEditMode}
                data={editedTasks}
                updateTasks={updateTasks}
                onChange={handleTasksUpdate}
            />

            <MasterPlanAddModal masterPlanId={masterPlanId} isOpen={isAddTaskOpen} onClose={handleAddModalClose} />
            <MasterPlanRemoveTaskModal
                isOpen={isRemoveTaskOpen}
                onClose={handleRemoveModalClose}
                onConfirm={handleConfirmDeletion}
                masterPlanId={masterPlanId}
            />
            {notificationContext}
        </Grid>
    );
};

export default ModelDetailsMasterPlan;
