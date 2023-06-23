import {useMemo} from 'react';
import {Grid, Typography, Caption} from 'fronton-react';
import {ChevronRightIcon} from '@fronton/icons-react';

interface IProps {
    data: {
        productModelNomenclatureDepartmentCode: string | undefined;
        productModelNomenclatureSubDepartmentCode: string | undefined;
        productModelNomenclatureConsolidationCode: string | undefined;
        productModelNomenclatureModelCode: string | undefined;
    };
}

const NomenclatureRow: React.FC<IProps> = ({
    data: {
        productModelNomenclatureDepartmentCode,
        productModelNomenclatureSubDepartmentCode,
        productModelNomenclatureConsolidationCode,
        productModelNomenclatureModelCode,
    },
}) => {
    const departments = useMemo(
        () => [
            productModelNomenclatureDepartmentCode,
            productModelNomenclatureSubDepartmentCode,
            productModelNomenclatureConsolidationCode,
            productModelNomenclatureModelCode,
        ],
        [
            productModelNomenclatureDepartmentCode,
            productModelNomenclatureSubDepartmentCode,
            productModelNomenclatureConsolidationCode,
            productModelNomenclatureModelCode,
        ]
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
                                {d}
                            </Typography>
                            <Caption message={d} />
                        </Grid>
                        {showChevron && <ChevronRightIcon />}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default NomenclatureRow;
