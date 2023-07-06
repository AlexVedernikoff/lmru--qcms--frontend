import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Grid, RegularButton, Typography} from 'fronton-react';
import {PlusIcon, TrashIcon} from '@fronton/icons-react';
import {useParams} from 'react-router-dom';
import CardView from '../../Common/CardView';
import modelsApi from '../modelsApi';
import MasterPlanTable from './MasterPlanTable';
import MasterPlanAddModal from './MasterPlanAddModal';
import {IMasterPlanTask} from '../../../common/types/models';
import MasterPlanRemoveTaskModal from './MasterPlanRemoveTaskModal';

interface IProps {
    tasks: IMasterPlanTask[];
    handleConfirmDeletion: () => void;
    handleRemoveModalClose: () => void;
    handleDeleteClick: () => void;
    isRemoveOpen: boolean;
    setTasksToRemove: (rows: number[]) => void;
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

    const [isOpen, setIsOpen] = useState(false);

    const handleCardClose = () => {};

    const handleSaveClick = () => {};

    const handleAddClick = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

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
