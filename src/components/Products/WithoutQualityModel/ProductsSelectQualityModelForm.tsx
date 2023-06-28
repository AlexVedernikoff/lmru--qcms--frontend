import {Grid, Radio, RadioGroup, RegularButton, Typography} from 'fronton-react';
import ModelsIcon from '../../Icons/ModelsIcon';
import {useTranslation} from 'react-i18next';
import {ChangeEvent, useState} from 'react';
import withoutModelApi from './withoutModelApi';
import {IProduct} from '../../../common/types/products';

interface Props {
    products: IProduct[];
    onSubmit: (qualityModelId: string) => void;
}

export const ProductsSelectQualityModelForm: React.FC<Props> = ({products, onSubmit}) => {
    const {t} = useTranslation('products');

    const [selectedQualityModelId, setSelectedQualityModelId] = useState<string | null>(null);

    const handleRadioGroupChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setSelectedQualityModelId(prevSelectedQualityModelId => (prevSelectedQualityModelId === value ? null : value));
    };

    const handleRadioClick = (id: number) => {
        if (selectedQualityModelId === `${id}`) {
            setSelectedQualityModelId(null);
        }
    };

    const isSubmitButtonDisabled = !products.length || !selectedQualityModelId;

    const handleSubmit = () => {
        if (!isSubmitButtonDisabled) {
            onSubmit(selectedQualityModelId);
        }
    };

    const getQualityModelsQuery = withoutModelApi.useGetQualityModelsQuery({
        header: {
            securityCode: 'security_code',
        },
        body: {
            searchBy: {},
            pageIndex: 0,
            pageSize: 100,
        },
    });
    const qualityModels = getQualityModelsQuery.data?.content || [];

    return (
        <Grid rowGap={16}>
            <Typography variant="h3">
                {'11_Краски Подготовка основания Грунтовка стен и аксессуары Шпаклевка'}
            </Typography>

            <Grid columns="24px 1fr" columnGap={12}>
                <ModelsIcon color="black" />

                <Typography variant="l" size="body_long">
                    {t('WithoutModels.Table.SelectModel')}
                </Typography>
            </Grid>

            <Grid>
                <RadioGroup name="group" onChange={handleRadioGroupChange} value={selectedQualityModelId}>
                    {qualityModels.map(({id, qualityModelLabel}) => (
                        <Radio
                            key={id}
                            label={qualityModelLabel}
                            value={id}
                            checked={selectedQualityModelId === `${id}`}
                            onClick={() => handleRadioClick(id)}
                        />
                    ))}
                </RadioGroup>
            </Grid>

            <Grid columns="118px">
                <RegularButton size="m" variant="primary" disabled={isSubmitButtonDisabled} onClick={handleSubmit}>
                    Применить
                </RegularButton>
            </Grid>
        </Grid>
    );
};

export default ProductsSelectQualityModelForm;
