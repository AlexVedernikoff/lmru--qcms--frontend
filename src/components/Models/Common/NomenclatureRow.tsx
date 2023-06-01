import {Grid, Typography, Caption} from 'fronton-react';
import {ChevronRightIcon} from '@fronton/icons-react';
import {IModelTableItem} from '../../../common/clientModels';

interface IProps {
    data: IModelTableItem['nomenclature'];
}

const NomenclatureRow: React.FC<IProps> = ({data}) => {
    return (
        <Grid columns={`repeat(${(data.length || 1) * 2 - 1}, 1fr)`} columnGap="12px">
            {data.map((d, i) => {
                const showChevron = data.length > 1 && i !== data.length - 1;
                return (
                    <Grid key={i} columns={`repeat(${showChevron ? 2 : 1}, 1fr)`} alignItems="center" columnGap="12px">
                        <Grid columns="1fr">
                            <Typography variant="s" size="body_long">
                                {d.code}
                            </Typography>
                            <Caption message={d.description} />
                        </Grid>
                        {showChevron && <ChevronRightIcon />}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default NomenclatureRow;
