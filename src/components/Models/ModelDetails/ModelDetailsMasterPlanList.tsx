import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {EBUCodes} from 'common/types/common';
import {ERegulatoryType, IMasterPlanTask} from 'common/types/models';
import AccordionPanel from '../../Common/AccordionPanel';
import modelsApi from '../modelsApi';
import ModelDetailsMasterPlan from './ModelDetailsMasterPlan';

type TTasks = {taskList: IMasterPlanTask[]; masterPlanId: number | undefined};

const ModelDetailsMasterPlanList: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();

    const {data: modelDetails} = modelsApi.endpoints.getModelDetails.useQuery({id});

    const planList = useMemo(() => {
        const defaultTasks = (): TTasks => ({masterPlanId: undefined, taskList: []});

        const manufacturerTasks = defaultTasks();
        const importerTasks = defaultTasks();
        const distributorTasks = defaultTasks();

        for (const plan of modelDetails?.masterPlanIds?.filter(mp => mp.bu.code === EBUCodes.Russia) || []) {
            for (const task of plan.tasks) {
                switch (task.regulatoryType) {
                    case ERegulatoryType.DISTRIBUTOR:
                        distributorTasks.masterPlanId = plan.id;
                        distributorTasks.taskList.push(task);
                        break;
                    case ERegulatoryType.IMPORTER:
                        importerTasks.masterPlanId = plan.id;
                        importerTasks.taskList.push(task);
                        break;
                    case ERegulatoryType.MANUFACTURER:
                        manufacturerTasks.masterPlanId = plan.id;
                        manufacturerTasks.taskList.push(task);
                        break;
                }
            }
        }

        return [
            {
                label: t('ModelDetails.MasterPlan.Section.MANUFACTURER.Title'),
                data: manufacturerTasks,
            },
            {
                label: t('ModelDetails.MasterPlan.Section.IMPORTER.Title'),
                data: importerTasks,
            },
            {
                label: t('ModelDetails.MasterPlan.Section.DISTRIBUTOR.Title'),
                data: distributorTasks,
            },
        ];
    }, [modelDetails?.masterPlanIds, t]);

    return (
        <div>
            {planList.map((section, index) => (
                <AccordionPanel key={index} numberIcon={index + 1} header={section.label}>
                    <ModelDetailsMasterPlan masterPlanId={section.data.masterPlanId!} tasks={section.data.taskList} />
                </AccordionPanel>
            ))}
        </div>
    );
};

export default ModelDetailsMasterPlanList;
