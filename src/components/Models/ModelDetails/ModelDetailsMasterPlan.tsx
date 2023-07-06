import {useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AccordionPanel from '../../Common/AccordionPanel';
import modelsApi from '../modelsApi';
import MasterPlanRequirements from './MasterPlanRequirements';
import {ERegulatoryType} from '../../../common/types/models';
import {IDeleteMasterPlanTasksParams} from '../../../common/types/models';

const ModelDetailsMasterPlan: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const [isRemoveOpen, setIsRemoveOpen] = useState(false);
    const [tasksToRemove, setTasksToRemove] = useState<number[]>([]);
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

    let details1 = details?.masterPlanIds?.[0]?.tasks;
    console.log('details1 = ', details1);

    const [deleteTasks, result] = modelsApi.useDeleteMasterPlanTasksMutation();

    console.log('result = ', result?.data?.tasks);

    if (result?.data?.tasks) details1 = result?.data?.tasks;

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

        // for (const task of details?.masterPlanIds?.[0]?.tasks || []) {
        for (const task of details1 || []) {
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
        // }, [details?.masterPlanIds, t]);
    }, [details1, t]);

    // ************************************************************

    const deleteTaskQueryArg: IDeleteMasterPlanTasksParams = {
        id,
        body: {
            updatedBy: 'Alex',
            taskIDs: tasksToRemove,
        },
        securityCode: 'security_code',
    };

    const handleConfirmDeletion = async () => {
        console.log('Вы подтвердили удаление задачи!');
        const details2 = await deleteTasks(deleteTaskQueryArg);
        // console.log('details2 = ', );
        setIsRemoveOpen(false);
    };

    const handleRemoveModalClose = () => {
        //закрываем модальное окно
        setIsRemoveOpen(false);
    };

    const handleDeleteClick = () => {
        //открываем модальное окно
        setIsRemoveOpen(true);
    };

    // ************************************************************

    return (
        <div>
            {planList.map((section, index) => (
                <AccordionPanel key={index} numberIcon={index + 1} header={section.label}>
                    <MasterPlanRequirements
                        tasks={section.list}
                        handleConfirmDeletion={handleConfirmDeletion}
                        isRemoveOpen={isRemoveOpen}
                        handleRemoveModalClose={handleRemoveModalClose}
                        handleDeleteClick={handleDeleteClick}
                        setTasksToRemove={setTasksToRemove}
                        tasksToRemove={tasksToRemove}
                    />
                </AccordionPanel>
            ))}
        </div>
    );
};

export default ModelDetailsMasterPlan;
