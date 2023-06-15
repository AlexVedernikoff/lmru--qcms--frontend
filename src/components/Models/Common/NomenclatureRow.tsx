import {Grid, Typography, Caption} from 'fronton-react';
import {ChevronRightIcon} from '@fronton/icons-react';
import modelsApi from '../modelsApi';

interface IProps {
    code: string;
}

const NomenclatureRow: React.FC<IProps> = ({code}) => {
    const {data} = modelsApi.useGetModelNomenclatureQuery({securityCode: 'security_code', application: code});

    if (!data?.departments?.length) {
        return <div />;
    }

    const departments = data.departments.flatMap(d => [
        d,
        ...d.subdepartments.flatMap(s => [
            s,
            ...s.modelConsolidationGroups.flatMap(mcg => [mcg, ...mcg.models.flatMap(m => m)]),
        ]),
    ]);

    return (
        <Grid columns={`repeat(${(data.departments.length || 1) * 2 - 1}, 1fr)`} columnGap="12px">
            {departments.map((d, i) => {
                const showChevron = departments.length > 1 && i !== departments.length - 1;
                return (
                    <Grid key={i} columns={`repeat(${showChevron ? 2 : 1}, 1fr)`} alignItems="center" columnGap="12px">
                        <Grid columns="1fr">
                            <Typography variant="s" size="body_long">
                                {d.code}
                            </Typography>
                            <Caption message={d.nameRu} />
                        </Grid>
                        {showChevron && <ChevronRightIcon />}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default NomenclatureRow;
