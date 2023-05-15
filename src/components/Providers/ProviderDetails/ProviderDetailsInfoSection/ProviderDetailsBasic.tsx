import {Checkbox, Grid, Input, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import { Button } from 'antd';
import EditIcon from '../../../Icons/EditIcon';

const ProductDetailsProvider: React.FC = () => {
    const {t} = useTranslation('providers');
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => { };
  
    return (
        <Grid className={styles.sectionItem} columns="3fr 0.1fr" rowGap={24} columnGap={24} >

          <Typography variant="h3">{t('ProviderDetails.MainData.Title')}</Typography>
          <Button size='small' style={{border: 'none'}}type="default" icon={<EditIcon />} />
          <Grid rowGap={18} columnGap={24} columns="1fr 1fr">
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.Category')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'15  ADEO SERVICES"'}
                </Typography>
            </div>

            <Input
                inputSize="m"
                autoComplete="off"
                label={t('ProviderDetails.MainData.ExNameSupplier')}
                name={'modelNameOrCode'}
                placeholder={t('Common.Input')}
                value={undefined}
                onChange={handleInputChange}
            />

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.RMSCode')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    12345667
                </Typography>
            </div>
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.SupplierStatus')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'REGULAR'}
                </Typography>
            </div>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.Country')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    Россия
                </Typography>
            </div>
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.VendorLevelMonitoring')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'3'}
                </Typography>
            </div>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.BusinessLicense')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    1095027002784
                </Typography>
            </div>
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.NonConformity')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'0'}
                </Typography>
            </div>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.CodeSSM')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    88035
                </Typography>
            </div>
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.NrustKiller')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'0'}
                </Typography>
            </div>

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.INN')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'5027146905'}
                </Typography>
            </div>
            

            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.FailureRateInspections')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'0'}
                </Typography>
            </div>

            <div>
                <Checkbox checked={false} label={t('ProviderDetails.MainData.TopAVS')} />
            </div>  
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.Status')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'Ссылка'}
                </Typography>
            </div> 
            <div>
                <Checkbox checked={false} label={t('ProviderDetails.MainData.SupplierInternationalProcurement')} />
            </div>
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.BillingCountry')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'Россия'}
                </Typography>
            </div> 
            <div>
                <Checkbox checked={false} label={t('ProviderDetails.MainData.TemporaryPermission')} />
            </div>   
            <br />
            <div />
            <div>
                <Typography variant="s" size="body_long" color="text-minor">
                    {t('ProviderDetails.MainData.SupplyDepartment')}
                </Typography>
                <br />
                <Typography variant="s" size="body_short">
                    {'EASTERN EUROPEAN SOURCING OFFICE'}
                </Typography>
            </div> 
          </Grid>
        </Grid>
    );
};

export default ProductDetailsProvider;
