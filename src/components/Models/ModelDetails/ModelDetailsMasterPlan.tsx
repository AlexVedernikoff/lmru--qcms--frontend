import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Grid, RegularButton, Typography} from 'fronton-react';
import {FloppyDiskIcon, PlusIcon, TrashIcon} from '@fronton/icons-react';
import {notification} from 'antd';
import {ERegulatoryType, IMasterPlanTask} from 'common/types/models';
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
    const [updateModel] = modelsApi.endpoints.updateQualityModel.useMutation();
    const [deleteTasks, deleteTasksResult] = modelsApi.endpoints.deleteMasterPlanTasks.useMutation();

    const [isEditMode, setIsEditMode] = useState(false);
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
    const [isRemoveTaskOpen, setIsRemoveTaskOpen] = useState(false);

    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

    useEffect(() => {
        if (deleteTasksResult.isError) {
            notificationApi.error({
                message: 'Ошибка!',
                description: 'Во время выполнения запроса произошла ошибка.',
            });
        }
    }, [deleteTasksResult.isError, notificationApi]);

    useEffect(() => {
        if (deleteTasksResult.data) {
            setSelectedTasks([]);
        }
    }, [deleteTasksResult.data]);

    const updateTasks = useCallback((key: ERegulatoryType, value: number[]) => {
        setSelectedTasks(value);
    }, []);

    const handleCardClose = () => {};

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = async () => {
        await updateModel({id, body: {updatedBy: 'currentUser'}});
        await refetch();
        setIsEditMode(false);
    };

    const handleAddClick = () => setIsAddTaskOpen(true);
    const handleAddModalClose = () => setIsAddTaskOpen(false);

    const handleDeleteClick = () => setIsRemoveTaskOpen(true);
    const handleRemoveModalClose = () => setIsRemoveTaskOpen(false);

    const handleConfirmDeletion = async (masterPlanId: number) => {
        setIsRemoveTaskOpen(false);
        await deleteTasks({id: masterPlanId, body: {taskIDs: selectedTasks, updatedBy: 'currentUser'}});
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

            <MasterPlanTable isEditMode={isEditMode} data={tasks} updateTasks={updateTasks} />

            <MasterPlanAddModal isOpen={isAddTaskOpen} onClose={handleAddModalClose} />
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
