import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, RegularButton, Typography, Modal, ModalContent, ModalHeader} from 'fronton-react';
import {PlusIcon, TrashIcon} from '@fronton/icons-react';
import {useParams} from 'react-router-dom';
import CardView from '../../Common/CardView';
import modelsApi from '../modelsApi';
import MasterPlanTable from './MasterPlanTable';
import MasterPlanAddModal from './MasterPlanAddModal';
import {IMasterPlanTask} from '../../../common/types/models';
import MasterPlanRemoveTaskModal from './MasterPlanRemoveTaskModal';
import {IDeleteMasterPlanTasksParams} from '../../../common/types/models';

interface IProps {
    tasks: IMasterPlanTask[];
    handleConfirmDeletion: () => void;
    handleRemoveModalClose: () => void;
    handleDeleteClick: () => void;
    isRemoveOpen: boolean;
    setTasksToRemove: any;
    // setTasksToRemove: () => number[];
    tasksToRemove: number[];
}

const MasterPlanRequirements: React.FC<IProps> = ({
    tasks,
    handleConfirmDeletion,
    handleRemoveModalClose,
    handleDeleteClick,
    isRemoveOpen,
    setTasksToRemove,
    tasksToRemove,
}) => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    const [deleteTasks] = modelsApi.useDeleteMasterPlanTasksMutation();

    const [isOpen, setIsOpen] = useState(false);
    // const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    // const [tasksToRemove, setTasksToRemove] = useState<number[]>([]);

    // const deleteTaskQueryArg: IDeleteMasterPlanTasksParams = {
    //     id,
    //     body: {
    //         updatedBy: 'Alex',
    //         taskIDs: tasksToRemove,
    //     },
    //     securityCode: 'security_code',
    // };

    console.log('tasks = ', tasks);
    console.log('Задачи к удалению: ', tasksToRemove);
    // console.log('task id = ', id);

    const handleCardClose = () => {};

    const handleSaveClick = () => {};

    const handleAddClick = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };
    // *************************************************
    // const handleRemoveModalClose = () => {
    //     //закрываем модальное окно
    //     setIsRemoveOpen(false);
    // };

    // const handleDeleteClick = () => {
    //     //открываем модальное окно
    //     setIsRemoveOpen(true);
    // };

    // const handleConfirmDeletion = () => {
    //     console.log('Вы подтвердили удаление задачи!');
    //     deleteTasks(deleteTaskQueryArg);
    //     setIsRemoveOpen(false);
    // };

    // *************************************************

    return (
        <Grid rowGap={24}>
            <Grid columns="1fr auto">
                <div />
                <div>
                    <RegularButton onClick={handleSaveClick} variant="pseudo" iconLeft={<PlusIcon />}>
                        {t('Buttons.Save')}
                    </RegularButton>
                    <RegularButton onClick={handleAddClick} variant="pseudo" iconLeft={<PlusIcon />}>
                        {t('Buttons.Add')}
                    </RegularButton>
                    <RegularButton
                        onClick={handleDeleteClick}
                        variant="pseudo"
                        iconLeft={<TrashIcon />}
                        disabled={!Boolean(tasksToRemove.length)}
                    >
                        {t('Buttons.Delete')}
                    </RegularButton>
                </div>
            </Grid>

            <Grid columns="auto auto auto" columnGap={24} rowGap={24}>
                {details?.regulatoryReferences?.map((data, index) => (
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

            <MasterPlanTable data={tasks} setTasksToRemove={setTasksToRemove} />
            <MasterPlanRemoveTaskModal
                isOpen={isRemoveOpen}
                onClose={handleRemoveModalClose}
                handleConfirmDeletion={handleConfirmDeletion}
            />
            <MasterPlanAddModal isOpen={isOpen} onClose={handleModalClose} />
        </Grid>
    );
};

export default MasterPlanRequirements;
