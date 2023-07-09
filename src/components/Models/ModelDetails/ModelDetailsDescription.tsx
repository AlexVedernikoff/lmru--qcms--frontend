import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useParams} from 'react-router-dom';
import {Grid, RegularButton, Textarea, Typography} from 'fronton-react';
import EditIcon from '../../Icons/EditIcon';
import modelsApi from '../modelsApi';
import styles from './ModelDetails.module.css';

const ModelDetailsDescription: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {data: details, refetch} = modelsApi.endpoints.getModelDetails.useQuery({id});
    const [updateModel] = modelsApi.endpoints.updateQualityModel.useMutation();

    const [isEditMode, setIsEditMode] = useState(false);
    const [text, setText] = useState<string | undefined>(undefined);

    useEffect(() => {
        setText(details?.qualityModelDescription);
    }, [details?.qualityModelDescription]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleSaveClick = async () => {
        await updateModel({
            id,
            accept: 'application/json',

            body: {
                qualityModelDescription: text,
                updatedBy: 'currentUser',
            },
        });

        await refetch();

        setIsEditMode(false);
    };

    return (
        <Grid gap={16} columns="1fr" alignContent="start" justifyContent="start">
            <Grid columns="1fr auto" gap={16}>
                <Typography variant="h3">{t('ModelDetails.Description.Title')}</Typography>
                {isEditMode ? (
                    <Grid columns="120px" gap={16}>
                        <RegularButton onClick={handleSaveClick}>{t('Buttons.Save')}</RegularButton>
                    </Grid>
                ) : (
                    <Grid columns="48px" gap={16}>
                        <RegularButton variant="pseudo" aria-label="edit" size="s" onClick={handleEditClick}>
                            <EditIcon />
                        </RegularButton>
                    </Grid>
                )}
            </Grid>

            {isEditMode ? (
                <Textarea className={styles.description} value={text} onChange={handleTextChange} />
            ) : (
                <Grid>
                    <Typography variant="s" size="body_long">
                        {details?.qualityModelDescription}
                    </Typography>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Grid>
            )}
        </Grid>
    );
};

export default ModelDetailsDescription;
