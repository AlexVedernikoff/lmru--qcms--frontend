import {RegularButton} from 'fronton-react';
import EditIcon from '../../../Icons/EditIcon';

interface Props {
    onClick: () => void;
}

const EditButton: React.FC<Props> = ({onClick}) => {
    return (
        <RegularButton
            onClick={onClick}
            aria-label=""
            variant="pseudo"
            style={{verticalAlign: 'middle', padding: '0px 7px'}}
        >
            <EditIcon />
        </RegularButton>
    );
};

export default EditButton;
