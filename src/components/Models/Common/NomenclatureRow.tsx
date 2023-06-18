import {useMemo} from 'react';
import {Grid, Typography, Caption} from 'fronton-react';
import {ChevronRightIcon} from '@fronton/icons-react';
import modelsApi from '../modelsApi';

interface IProps {
    code: string;
}

const NomenclatureRow: React.FC<IProps> = ({code}) => {
    const {data} = modelsApi.useGetModelNomenclatureQuery({securityCode: 'security_code', application: code});

    const departments = useMemo(
        () =>
            [
                data?.[0],
                data?.[0]?.subdepartments?.[0],
                data?.[0]?.subdepartments?.[0]?.modelConsolidationGroups?.[0],
                data?.[0]?.subdepartments?.[0]?.modelConsolidationGroups?.[0]?.models?.[0],
            ] || [],
        [data]
    );

    if (!departments.length) {
        return <div />;
    }

    return (
        <Grid columns={`repeat(${(departments.length || 1) * 2 - 1}, 1fr)`} columnGap={12}>
            {departments.map((d, i) => {
                const showChevron = departments.length > 1 && i !== departments.length - 1;
                return (
                    <Grid key={i} columns={`repeat(${showChevron ? 2 : 1}, 1fr)`} alignItems="center" columnGap={12}>
                        <Grid columns="1fr">
                            <Typography variant="s" size="body_long">
                                {d?.code}
                            </Typography>
                            <Caption message={d?.nameRu} />
                        </Grid>
                        {showChevron && <ChevronRightIcon />}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default NomenclatureRow;
