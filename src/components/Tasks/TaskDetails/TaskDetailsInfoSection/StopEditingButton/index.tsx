import {Grid, RegularButton} from 'fronton-react';
import {useTranslation} from 'react-i18next';

interface Props {
    onClick: () => void;
}

const StopEditingButton: React.FC<Props> = ({onClick}) => {
    const {t} = useTranslation('tasks');

    return (
        <RegularButton onClick={onClick} aria-label="" variant="pseudo" style={{verticalAlign: 'middle'}}>
            <Grid columnGap="6px" columns="auto auto">
                {t('TaskDetails.Buttons.StopEditing')}
            </Grid>
        </RegularButton>
    );
};

export default StopEditingButton;
