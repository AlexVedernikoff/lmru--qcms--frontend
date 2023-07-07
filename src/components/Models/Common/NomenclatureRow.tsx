import {useMemo} from 'react';
import {Grid, Typography, Caption} from 'fronton-react';
import {ChevronRightIcon} from '@fronton/icons-react';

interface IProps {
    code: {
        department: string | undefined;
        subdepartment: string | undefined;
        consolidation: string | undefined;
        model: string | undefined;
    };
    name?: {
        department: string | undefined;
        subdepartment: string | undefined;
        consolidation: string | undefined;
        model: string | undefined;
    };
}

const NomenclatureRow: React.FC<IProps> = ({code, name}) => {
    const departments = useMemo(
        () => [
            [code.department, name?.department],
            [code.subdepartment, name?.subdepartment],
            [code.consolidation, name?.consolidation],
            [code.model, name?.model],
        ],
        [
            code.department,
            code.subdepartment,
            code.consolidation,
            code.model,
            name?.department,
            name?.subdepartment,
            name?.consolidation,
            name?.model,
        ]
    );

    const hasData = useMemo<boolean>(
        () => [code.department, code.subdepartment, code.consolidation, code.model].filter(v => !!v).length > 0,
        [code.consolidation, code.department, code.model, code.subdepartment]
    );

    if (!hasData) {
        return <div />;
    }

    return (
        <Grid columns={`repeat(${departments.length || 1}, 1fr)`} columnGap={12}>
            {departments.map(([code, name], i) => {
                const showChevron = departments.length > 1 && i !== departments.length - 1;
                return (
                    <Grid key={i} columns={`repeat(${showChevron ? 2 : 1}, auto)`} alignItems="center" columnGap={16}>
                        <Grid columns="1fr">
                            <Typography variant="s" size="body_long">
                                {name}
                            </Typography>
                            <Caption message={code} />
                        </Grid>
                        {showChevron && <ChevronRightIcon />}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default NomenclatureRow;
