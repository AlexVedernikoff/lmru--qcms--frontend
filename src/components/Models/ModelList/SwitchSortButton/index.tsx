import {ArrowDownIcon, ArrowUpIcon, ArrowsDownUpIcon} from '@fronton/icons-react';
import {Sort} from '..';
import {QualityModelsSortDirection, QualityModelsSortableFields} from '../../../../common/types/searchQualityModels';

interface Props {
    sortField: QualityModelsSortableFields;
    currentSort?: Sort;
    onClick: () => void;
}

const SwitchSortButton: React.FC<Props> = ({sortField, currentSort, onClick}) => {
    const props = {
        cursor: 'pointer',
        onClick,
    };

    if (!currentSort || sortField !== currentSort.sortField) {
        return <ArrowsDownUpIcon {...props} />;
    }

    if (currentSort.sortDirection === QualityModelsSortDirection.ASC) {
        return <ArrowDownIcon {...props} />;
    }

    return <ArrowUpIcon {...props} />;
};

export default SwitchSortButton;
