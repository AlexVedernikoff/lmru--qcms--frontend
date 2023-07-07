import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Grid, RegularButton, Typography} from 'fronton-react';
import {FloppyDiskIcon, PlusIcon, TrashIcon} from '@fronton/icons-react';
import {IMasterPlanTask} from '../../../common/types/models';
import CardView from '../../Common/CardView';
import modelsApi from '../modelsApi';
import MasterPlanTable from './MasterPlanTable';
import MasterPlanAddModal from './MasterPlanAddModal';

interface IProps {
    tasks: IMasterPlanTask[];
}

const MasterPlanRequirements: React.FC<IProps> = ({tasks}) => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {data: details, refetch} = modelsApi.endpoints.getModelDetails.useQuery({id, securityCode: 'security_code'});
    const [updateModel] = modelsApi.endpoints.updateQualityModel.useMutation();

    const [isOpen, setIsOpen] = useState(false);
    // const [editedRows, setEditedRows] = useState([]);

    const handleCardClose = () => {};

    const handleSaveClick = async () => {
        await updateModel({
            id,
            securityCode: 'security_code',
            body: {
                updatedBy: 'currentUser',
            },
        });

        await refetch();
    };

    const handleAddClick = () => {
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setIsOpen(false);
    };

    const handleDeleteClick = () => {};

    const handleTableChange = () => {};

    return (
        <Grid rowGap={24}>
            <Grid columns="1fr auto">
                <div />
                <div>
                    <RegularButton onClick={handleSaveClick} variant="pseudo" iconLeft={<FloppyDiskIcon />}>
                        {t('Buttons.Save')}
                    </RegularButton>
                    <RegularButton onClick={handleAddClick} variant="pseudo" iconLeft={<PlusIcon />}>
                        {t('Buttons.Add')}
                    </RegularButton>
                    <RegularButton onClick={handleDeleteClick} variant="pseudo" iconLeft={<TrashIcon />}>
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

            <MasterPlanTable data={tasks} onChange={handleTableChange} />

            <MasterPlanAddModal isOpen={isOpen} onClose={handleModalClose} />
        </Grid>
    );
};

export default MasterPlanRequirements;
