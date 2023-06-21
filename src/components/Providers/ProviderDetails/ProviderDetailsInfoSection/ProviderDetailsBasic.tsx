import {Checkbox, Grid, Input, Typography} from 'fronton-react';
import {useTranslation} from 'react-i18next';
import styles from '../../../Common.module.css';
import {Button} from 'antd';
import EditIcon from '../../../Icons/EditIcon';
import {useGetSupplierDetsQuery} from '../../../../api/getSupplierDetails';
import {ISupplierDetailsResponse} from '../../../../common/types/supplierDetails';

const ProductDetailsProvider: React.FC = () => {
    const supplierId = 1;
    const {t} = useTranslation('providers');
    const handleInputChange = (_: React.ChangeEvent<HTMLInputElement>, value: string) => {};
    const {data: supplierDetails = {}} = useGetSupplierDetsQuery(supplierId);

    const {
        billingCountry,
        businessLicence,
        manufacturingMonitoringPlatform,
        registrationStatus,
        status,
        supplierCategory,
        supplierDepartmentCountry,
        supplierExName,
        supplierInn,
        supplierRMSCode,
    } = (supplierDetails as ISupplierDetailsResponse) || {};

    return (
        <Grid className={styles.sectionItem} columns="3fr 0.1fr" rowGap={24} columnGap={24}>
            <Typography variant="h3">{t('ProviderDetails.MainData.Title')}</Typography>
            <Button size="small" style={{border: 'none'}} type="default" icon={<EditIcon />} />
            <Grid rowGap={18} columnGap={24} columns="1fr 1fr">
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.Category')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {supplierCategory}
                    </Typography>
                </div>

                <Input
                    inputSize="m"
                    autoComplete="off"
                    label={t('ProviderDetails.MainData.ExNameSupplier')}
                    name={'modelNameOrCode'}
                    placeholder={t('Common.Input')}
                    value={supplierExName}
                    onChange={handleInputChange}
                />

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.RMSCode')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {supplierRMSCode}
                    </Typography>
                </div>
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.SupplierStatus')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {status}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.Country')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {supplierDepartmentCountry}
                    </Typography>
                </div>
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.VendorLevelMonitoring')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {manufacturingMonitoringPlatform}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.BusinessLicense')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {businessLicence}
                    </Typography>
                </div>
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.NonConformity')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {''}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.CodeSSM')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {''}
                    </Typography>
                </div>
                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.NrustKiller')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {''}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.INN')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {supplierInn}
                    </Typography>
                </div>

                <div>
                    <Typography variant="s" size="body_long" color="text-minor">
                        {t('ProviderDetails.MainData.FailureRateInspections')}
                    </Typography>
                    <br />
                    <Typography variant="s" size="body_short">
                        {''}
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
                        {registrationStatus}
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
                        {billingCountry}
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
                        {''}
                    </Typography>
                </div>
            </Grid>
        </Grid>
    );
};

export default ProductDetailsProvider;
