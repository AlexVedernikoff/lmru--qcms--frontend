import {Grid, RegularButton} from 'fronton-react';
import EditIcon from '../../../Icons/EditIcon';
import {useTranslation} from 'react-i18next';

interface Props {
    onClick: () => void;
}

const EditTaskDataButton: React.FC<Props> = ({onClick}) => {
    const {t} = useTranslation('tasks');

    return (
        <RegularButton onClick={onClick} aria-label="" variant="pseudo" style={{verticalAlign: 'middle'}}>
            <Grid columnGap="6px" columns="auto auto">
                <EditIcon color="none" />
                {t('TaskDetails.Buttons.Edit')}
            </Grid>
        </RegularButton>
    );
};

export default EditTaskDataButton;
