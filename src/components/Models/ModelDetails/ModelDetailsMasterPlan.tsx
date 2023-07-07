import {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AccordionPanel from '../../Common/AccordionPanel';
import modelsApi from '../modelsApi';
import MasterPlanRequirements from './MasterPlanRequirements';
import {ERegulatoryType} from '../../../common/types/models';
import {IDeleteMasterPlanTasksParams} from '../../../common/types/models';
import MasterPlanRemoveTaskModal from './MasterPlanRemoveTaskModal';
import {notification, Button, Space} from 'antd';

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
    const [api, contextHolder] = notification.useNotification();

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

    const openNotification = () => {
        const btn = (
            <Space>
                <Button
                    type="primary"
                    onClick={() => {
                        api.destroy();
                        setRemoveTaskError(false);
                    }}
                >
                    Принять
                </Button>
            </Space>
        );
        api.open({
            message: 'Ошибка!',
            description: 'Во время выполнения запроса произошла ошибка.',
            btn,
            duration: 0,
        });
    };

    useEffect(() => {
        if (result.isError && !removeTaskError) {
            openNotification();
            setRemoveTaskError(true);
        }
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

    const handleDeleteClick = () => {
        setIsRemoveOpen(true);
    };

    return (
        <div>
            {contextHolder}
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
        </div>
    );
};

export default ModelDetailsMasterPlan;
