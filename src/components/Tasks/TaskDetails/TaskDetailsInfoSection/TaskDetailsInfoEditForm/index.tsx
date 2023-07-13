import {MagnifyingGlassIcon} from '@fronton/icons-react';
import {Grid, Typography, RegularButton, Dropdown, DropdownItem} from 'fronton-react';
import {ActionStatus, ITaskDetails, ITaskUpdateInfoParams} from '../../../../../common/types/taskDetails';
import {convertDateFromServer} from '../../../../../utils/convertDateFromServer';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';

import styles from '../../../../Common.module.css';
import s from './styles.module.css';

interface Props {
    taskDetails: ITaskDetails;
    onSubmit: (formData: ITaskUpdateInfoParams) => void;
    isSubmitButtonDisabled: boolean;
}

interface IFormState {
    actionStatus: ActionStatus;
}

const TaskDetailsInfoEditForm: React.FC<Props> = ({taskDetails, onSubmit, isSubmitButtonDisabled}) => {
    const {t} = useTranslation('tasks');

    const [formState, setFormState] = useState<IFormState>({
        actionStatus: taskDetails.actionStatus,
    });

    const areTaskDetailsChanged = formState.actionStatus !== taskDetails.actionStatus;

    const handleSubmit = () => {
        if (isSubmitButtonDisabled || !areTaskDetailsChanged) return;
        onSubmit({
            updatedBy: 'Matvey',
            qualityActions: [
                {
                    id: parseInt(taskDetails.id, 10),
                    actionStatus: formState.actionStatus,
                    publicComment: '',
                },
            ],
        });
    };

    const handleActionStatusSelect = (value: string | null) => {
        if (!value) return;
        const actionStatus = value as ActionStatus;

        setFormState(prevFormState => ({
            ...prevFormState,
            actionStatus,
        }));
    };

    const taskDetailsResponsibleType = taskDetails.responsible[0]?.type;
    const taskDetailsApproversType = taskDetails.approvers[0]?.type;
    const taskDetailsApproversExternalId = taskDetails.approvers[0]?.externalId;
    const taskDetailsResponsibleExternalId = taskDetails.responsible[0]?.externalId;

    return (
        <Grid rowGap={16}>
            <Grid gap={16} columns="2.5fr 2.5fr 1.5fr 1.5fr">
                {/* Provider */}
                <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProvider.Provider')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {`${taskDetails.supplierData.supplierRMSCode} - ${taskDetails.supplierData.name}`}
                            <RegularButton
                                href=""
                                rel=""
                                aria-label=""
                                variant="pseudo"
                                iconOnly
                                style={{verticalAlign: 'middle'}}
                            >
                                <MagnifyingGlassIcon />
                            </RegularButton>
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProvider.ProviderStatus')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetails.product.regulatoryStatus}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProvider.TargetBU')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetails.targetBuCodes}
                        </Typography>
                    </div>
                </Grid>

                {/* Product */}
                <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProduct.Product')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {`${taskDetails.product.code} - ${taskDetails.product.code}`}
                            <RegularButton
                                href=""
                                rel=""
                                aria-label=""
                                variant="pseudo"
                                iconOnly
                                style={{verticalAlign: 'middle'}}
                            >
                                <MagnifyingGlassIcon />
                            </RegularButton>
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProduct.ProductCodeAdeo')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetails.product.adeoProductCode}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProduct.EAN')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetails.product.ean}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProduct.QualityModel')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetails.product.qualityModel}
                            <RegularButton
                                href=""
                                rel=""
                                aria-label=""
                                variant="pseudo"
                                iconOnly
                                style={{verticalAlign: 'middle'}}
                            >
                                <MagnifyingGlassIcon />
                            </RegularButton>
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProduct.QualityStatus')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetails.product.qualityStatus}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsProduct.ADEORisk')}
                        </Typography>
                        <br />
                        <Typography className={s.important} variant="s" size="body_short">
                            {taskDetails.product.adeoRisk}
                        </Typography>
                    </div>
                </Grid>

                {/* QE */}
                <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsQE.QE')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetailsResponsibleType === 'QE' && 'QE'}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsQE.SQM')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetailsApproversType === 'SQM' && taskDetailsApproversExternalId}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsQE.Contractor')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetailsResponsibleType === 'SUPPLIER' && taskDetailsResponsibleExternalId}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsQE.TypeApprover')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {taskDetailsApproversType}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsQE.ApproverPlatform')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {'По умолчанию'}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsQE.TaskStatus')}
                        </Typography>
                        <br />
                        <Dropdown value={formState.actionStatus} onSelect={handleActionStatusSelect} closeOnSelect>
                            {Object.values(ActionStatus).map(actionStatus => (
                                <DropdownItem
                                    key={actionStatus}
                                    text={t(`TaskDetails.ActionStatus.${actionStatus}`)}
                                    value={actionStatus}
                                />
                            ))}
                        </Dropdown>
                    </div>
                </Grid>

                {/* Dates */}
                <Grid className={styles.sectionItem} rowGap={8} columnGap={16} rows="36px 36px 16px 36px">
                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsDates.DateCreation')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {convertDateFromServer(taskDetails.creationInformation.createdAt)}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsDates.DateChange')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {convertDateFromServer(taskDetails.lastUpdateInformation.updatedAt)}
                        </Typography>
                    </div>

                    <br />

                    <div>
                        <Typography variant="s" size="body_long" color="text-minor">
                            {t('TaskDetails.DetailsDates.ExpectedCompletionDate')}
                        </Typography>
                        <br />
                        <Typography variant="s" size="body_short">
                            {convertDateFromServer(taskDetails.realisationDueDate)}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid columns="auto" justifyContent="right">
                <RegularButton
                    disabled={isSubmitButtonDisabled || !areTaskDetailsChanged}
                    onClick={handleSubmit}
                    size="m"
                    variant="primary"
                >
                    {t('TaskDetails.Buttons.SubmitEditDetailsForm')}
                </RegularButton>
            </Grid>
        </Grid>
    );
};

export default TaskDetailsInfoEditForm;
