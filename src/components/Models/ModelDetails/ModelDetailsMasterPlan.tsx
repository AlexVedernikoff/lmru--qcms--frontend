import {useMemo} from 'react';
import {useParams} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import AccordionPanel from '../../Common/AccordionPanel';
import modelsApi from '../modelsApi';
import MasterPlanRequirements from './MasterPlanRequirements';
import {ERegulatoryType} from '../../../common/types/models';

const ModelDetailsMasterPlan: React.FC = () => {
    const {t} = useTranslation('models');
    const {id = ''} = useParams();
    const {data: details} = modelsApi.endpoints.getModelDetails.useQueryState({id, securityCode: 'security_code'});

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

        for (const task of details?.masterPlanIds?.[0]?.tasks || []) {
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
    }, [details?.masterPlanIds, t]);

    return (
        <div>
            {planList.map((section, index) => (
                <AccordionPanel key={index} numberIcon={index + 1} header={section.label}>
                    <MasterPlanRequirements tasks={section.list} />
                </AccordionPanel>
            ))}
        </div>
    );
};

export default ModelDetailsMasterPlan;
