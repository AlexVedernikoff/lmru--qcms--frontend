import {Grid, RegularButton} from 'fronton-react';
import {PlusIcon, TrashIcon} from '@fronton/icons-react';
import {useTranslation} from 'react-i18next';
import MasterPlanRequirements from './MasterPlanRequirements';

const MasterPlanForm: React.FC = () => {
    const {t} = useTranslation('models');

    const handleSaveClick = () => {};
    const handleAddClick = () => {};
    const handleDeleteClick = () => {};

    return (
        <Grid>
            <Grid columns="1fr auto">
                <div />
                <div>
                    <RegularButton onClick={handleSaveClick} variant="pseudo" iconLeft={<PlusIcon />}>
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
            <MasterPlanRequirements />
        </Grid>
    );
};

export default MasterPlanForm;
