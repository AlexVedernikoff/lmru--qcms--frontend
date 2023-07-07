import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {Grid, Typography, RegularButton} from 'fronton-react';
import {IUpdateQualityModelParams} from '../../../common/types/models';
import EditIcon from '../../Icons/EditIcon';
import modelsApi from '../modelsApi';

type TData = IUpdateQualityModelParams['body'];

interface IProps {
    title: string;
}

interface IResult {
    isEditMode: boolean;
    onChangeData: (data: TData) => void;
    EditButtonHeader: JSX.Element;
}

const useEditModelDetails = (props: IProps): IResult => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {refetch} = modelsApi.endpoints.getModelDetails.useQuery({id, securityCode: 'security_code'});
    const [updateModel] = modelsApi.endpoints.updateQualityModel.useMutation();

    const [isEditMode, setIsEditMode] = useState(false);
    const [updatedData, setUpdatedData] = useState<TData>({updatedBy: ''});

    const handleDataChange = (newData: TData) => {
        setUpdatedData(p => ({...p, ...newData}));
    };

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = async () => {
        await updateModel({
            id,
            accept: 'application/json',
            securityCode: 'security_code',
            body: {
                ...updatedData,
                updatedBy: 'currentUser',
            },
        });

        await refetch();

        setIsEditMode(false);
    };

    const EditButtonHeader = (
        <Grid columns="1fr auto" gap={16}>
            <Typography variant="h3">{props.title}</Typography>
            {isEditMode ? (
                <Grid columns="120px" gap={16}>
                    <RegularButton onClick={handleSaveClick}>{t('Buttons.Save')}</RegularButton>
                </Grid>
            ) : (
                <Grid columns="48px" gap={16}>
                    <RegularButton variant="pseudo" aria-label="edit" size="s" onClick={handleEditClick}>
                        <EditIcon color="none" />
                    </RegularButton>
                </Grid>
            )}
        </Grid>
    );

    return {
        onChangeData: handleDataChange,
        EditButtonHeader,
        isEditMode,
    };
};

export default useEditModelDetails;
