import {TreeSelect} from 'antd';
import {useTranslation} from 'react-i18next';
import {useGetProductModelNomenclatureQuery} from '../../../api/getProductModelNomenclature';
import {useGetManagementNomenclatureQuery} from '../../../api/getManagementNomenclature';
import {IProductModelNomenclatureResponse} from '../../../common/types/productModelNomenclature';
import {IManagementNomenclatureResponse} from '../../../common/types/productManagementNomenclature';
import s from './customTreeSelect.module.css';

const {SHOW_PARENT} = TreeSelect;

interface IProps {
    type: 'product' | 'management';
    nomenclatureValue: string[];
    handleChange: (val: string[], treeChangeKeys: string[]) => void;
}

type TProps = React.PropsWithChildren<IProps>;

export const СustomTreeSelect: React.FC<TProps> = ({type, nomenclatureValue, handleChange: onTreeChange}) => {
    const {t} = useTranslation('providers');
    const {data: productModelNomenclature = []} = useGetProductModelNomenclatureQuery();
    const {data: managementNomenclature = []} = useGetManagementNomenclatureQuery();
    const modNomKeys = [
        'productModelNomenclatureDepartmentId',
        'productModelNomenclatureSubdepartmentId',
        'productModelNomenclatureConsolidationId',
        'productModelNomenclatureCodeId',
    ];

    const manNomKeys = [
        'productManagementNomenclatureDepartmentId',
        'productManagementNomenclatureSubdepartmentId',
        'productManagementNomenclatureTypeId',
        'productManagementNomenclatureSubtypeId',
    ];

    const productNomenclatureData = () =>
        productModelNomenclature.map((el: IProductModelNomenclatureResponse) => {
            return {
                title: el.nameRu,
                value: `${modNomKeys[0]} ${el.code}`,
                children: el.subdepartments.map(subDep => {
                    return {
                        title: subDep.nameRu,
                        value: `${modNomKeys[1]} ${subDep.code}`,
                        children: subDep.modelConsolidationGroups.map(modCon => {
                            return {
                                title: modCon.nameRu,
                                value: `${modNomKeys[2]} ${modCon.code}`,
                                children: modCon.models
                                    ? modCon.models.map(mod => {
                                          return {
                                              title: mod.nameRu,
                                              value: `${modNomKeys[3]} ${mod.code}`,
                                          };
                                      })
                                    : undefined,
                            };
                        }),
                    };
                }),
            };
        });

    const managementNomenclatureData = () =>
        managementNomenclature.map((el: IManagementNomenclatureResponse) => {
            return {
                title: el.name,
                value: `${manNomKeys[0]} ${el.id}`,
                children: el.subDepartments.map(subDep => {
                    return {
                        title: subDep.name,
                        value: `${manNomKeys[1]} ${subDep.id}`,
                        children: subDep.types
                            ? subDep.types.map(modCon => {
                                  return {
                                      title: modCon.name,
                                      value: `${manNomKeys[2]} ${modCon.id}`,
                                      children: modCon.subTypes
                                          ? modCon.subTypes.map(mod => {
                                                return {
                                                    title: mod.name,
                                                    value: `${manNomKeys[3]} ${mod.id}`,
                                                };
                                            })
                                          : undefined,
                                  };
                              })
                            : undefined,
                    };
                }),
            };
        });

    const nomenclatureData = type === 'product' ? productNomenclatureData() : managementNomenclatureData();

    console.log('nomenclatureValue = ', nomenclatureValue);

    // console.log('nomenclatureData = ', nomenclatureData);

    const translation = type === 'product' ? 'productModelNomenclature' : 'managementNomenclature';

    const treeChangeKeys = type === 'product' ? modNomKeys : manNomKeys;

    const {treeSelect} = s;

    const treeProps = {
        className: treeSelect,
        treeData: nomenclatureData,
        value: nomenclatureValue,
        onChange: (val: string[]) => {
            onTreeChange(val, treeChangeKeys);
        },
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: t(`ProvidersList.DetailFilters.${translation}`),
        style: {
            width: '100%',
        },
    };

    return <TreeSelect {...treeProps} />;
};
