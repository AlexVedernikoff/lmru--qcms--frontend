import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AccordionPanel from '../../Common/AccordionPanel';
import modelsApi from '../modelsApi';
import MasterPlanRequirements from './MasterPlanRequirements';
import {ERegulatoryType} from '../../../common/types/models';
import {IDeleteMasterPlanTasksParams} from '../../../common/types/models';
import MasterPlanRemErrorTaskModal from './MasterPlanRemErrorTaskModal';
import MasterPlanRemoveTaskModal from './MasterPlanRemoveTaskModal';

export interface IInitialState {
    IMPORTER: number[];
    DISTRIBUTOR: number[];
    MANUFACTURER: number[];
}

const ModelDetailsMasterPlan: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [removeTaskError, setRemoveTaskError] = useState(false);

    const initialState: IInitialState = {
        IMPORTER: [],
        DISTRIBUTOR: [],
        MANUFACTURER: [],
    };

    const [tasksToRemove, setTasksToRemove] = useState(initialState);

    const updateTasks = (key: keyof IInitialState, value: number[]) => {
        setTasksToRemove(prevTasks => {
            prevTasks[key] = value;
            return {...prevTasks};
        });
    };
    const removeTasksArr: number[] = [];

    for (let key in tasksToRemove) {
        removeTasksArr.push(...tasksToRemove[key as keyof IInitialState]);
    }

    const {data: modelDetails} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    const [deleteTasks, result] = modelsApi.useDeleteMasterPlanTasksMutation();

    let tasks = useMemo(() => {
        return result?.data?.tasks || modelDetails?.masterPlanIds?.[0]?.tasks || [];
    }, [result, modelDetails]);

    useEffect(() => {
        if (result.isError && !removeTaskError) setRemoveTaskError(true);
        if (result.data) {
            setTasksToRemove(initialState);
        }

        // eslint-disable-next-line
    }, [result]);

    const planList = useMemo(() => {
        const manufacturerTasks = [];
        const importerTasks = [];
        const distributorTasks = [];

        // TODO: Remove comments when design for master plans will be ready
        // for (const plan of details?.masterPlanIds || []) {
        //     for (const task of plan.tasks) {
        //         switch (task.regulatoryType) {
        //             case ERegulatoryType.DISTRIBUTOR:
        //                 distributorTasks.push(task);
        //                 break;
        //             case ERegulatoryType.IMPORTER:
        //                 importerTasks.push(task);
        //                 break;
        //             case ERegulatoryType.MANUFACTURER:
        //                 manufacturerTasks.push(task);
        //                 break;
        //         }
        //     }
        // }

        for (const task of tasks || []) {
            switch (task.regulatoryType) {
                case ERegulatoryType.DISTRIBUTOR:
                    distributorTasks.push(task);
                    break;
                case ERegulatoryType.IMPORTER:
                    importerTasks.push(task);
                    break;
                case ERegulatoryType.MANUFACTURER:
                    manufacturerTasks.push(task);
                    break;
            }
        }

        return [
            {
                label: t('ModelDetails.MasterPlan.Section.MANUFACTURER.Title'),
                list: manufacturerTasks,
            },
            {
                label: t('ModelDetails.MasterPlan.Section.IMPORTER.Title'),
                list: importerTasks,
            },
            {
                label: t('ModelDetails.MasterPlan.Section.DISTRIBUTOR.Title'),
                list: distributorTasks,
            },
        ];
    }, [tasks, t]);

    const deleteTaskQueryArg: IDeleteMasterPlanTasksParams = {
        id,
        body: {
            updatedBy: 'Alex', //имя пользователя localStorage пока не содержится.
            taskIDs: removeTasksArr,
        },
        securityCode: 'security_code',
    };

    const handleConfirmDeletion = async () => {
        await deleteTasks(deleteTaskQueryArg);
        setIsRemoveOpen(false);
    };

    const handleRemoveModalClose = () => {
        setIsRemoveOpen(false);
    };

    const handleRemoveModalErrClose = () => {
        setRemoveTaskError(false);
    };

    const handleDeleteClick = () => {
        setIsRemoveOpen(true);
    };

    return (
        <div>
            {planList.map((section, index) => (
                <AccordionPanel key={index} numberIcon={index + 1} header={section.label}>
                    <MasterPlanRequirements
                        tasks={section.list}
                        handleDeleteClick={handleDeleteClick}
                        updateTasks={updateTasks}
                        removeTasksArr={removeTasksArr}
                    />
                </AccordionPanel>
            ))}
            <MasterPlanRemoveTaskModal
                isOpen={isRemoveOpen}
                onClose={handleRemoveModalClose}
                handleConfirmDeletion={handleConfirmDeletion}
            />
            <MasterPlanRemErrorTaskModal isOpen={removeTaskError} onClose={handleRemoveModalErrClose} />
        </div>
    );
};

export default ModelDetailsMasterPlan;
