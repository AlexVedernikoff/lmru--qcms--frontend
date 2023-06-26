import {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import AccordionPanel from '../../Common/AccordionPanel';
import MasterPlanForm from './MasterPlanForm';

const ModelDetailsMasterPlan: React.FC = () => {
    const {t} = useTranslation('models');

    const sectionList = useMemo(
        () => [
            t('ModelDetails.MasterPlan.Section.Developer.Title'),
            t('ModelDetails.MasterPlan.Section.Importer.Title'),
            t('ModelDetails.MasterPlan.Section.Exporter.Title'),
        ],
        [t]
    );

    return (
        <div>
            {sectionList.map((section, index) => (
                <AccordionPanel key={index} numberIcon={index + 1} header={section}>
                    <MasterPlanForm />
                </AccordionPanel>
            ))}
        </div>
    );
};

export default ModelDetailsMasterPlan;
