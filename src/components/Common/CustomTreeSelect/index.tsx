import {TreeSelect} from 'antd';
import {useTranslation} from 'react-i18next';
import {useGetProductModelNomenclatureQuery} from '../../../api/getProductModelNomenclature';
import {useGetManagementNomenclatureQuery} from '../../../api/getManagementNomenclature';
import {IProductModelNomenclatureResponse} from '../../../common/types/productModelNomenclature';
import {IManagementNomenclatureResponse} from '../../../common/types/productManagementNomenclature';
import style from './customTreeSelect.module.css';
import {modNomKeys, manNomKeys} from './consts';

const {SHOW_PARENT} = TreeSelect;

export type TNomenclatureValue = Record<string, Array<string | number>>;

interface IProps {
    className?: string;
    nomenclatureValue: TNomenclatureValue;
    handleChange: (result: TNomenclatureValue) => void;
}

type TProps = React.PropsWithChildren<IProps>;

export const СustomTreeSelect: React.FC<TProps> = ({className, nomenclatureValue, handleChange: onTreeChange}) => {
    const {t} = useTranslation('providers');
    const {data: productModelNomenclature = []} = useGetProductModelNomenclatureQuery();
    const {data: managementNomenclature = []} = useGetManagementNomenclatureQuery();
    const title: 'nameRu' | 'code' = 'nameRu'; //когда починят бэк, присвоить title = 'nameRu'

    const productNomenclatureData = () =>
        productModelNomenclature.map((el: IProductModelNomenclatureResponse) => {
            return {
                title: el[title],
                value: `${modNomKeys[0]} ${el.code}`,
                children: el.subdepartments.map(subDep => {
                    return {
                        title: subDep[title],
                        value: `${modNomKeys[1]} ${subDep.code}`,
                        children: subDep.modelConsolidationGroups.map(modCon => {
                            return {
                                title: modCon[title],
                                value: `${modNomKeys[2]} ${modCon.code}`,
                                children: modCon.models
                                    ? modCon.models.map(mod => {
                                          return {
                                              title: mod[title],
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

    const type = modNomKeys.includes(Object.keys(nomenclatureValue)[0]) ? 'product' : 'management';

    const nomenclatureData = type === 'product' ? productNomenclatureData() : managementNomenclatureData();

    const keys = type === 'product' ? modNomKeys : manNomKeys;

    const translation = type === 'product' ? 'productModelNomenclature' : 'managementNomenclature';

    const treeSelectValue = (keys: string[]) =>
        keys.reduce((acc: string[], key) => {
            const idsArr: string[] = nomenclatureValue[key as string] as string[];
            if (idsArr) acc.push(...idsArr.map((el: string) => `${key} ${el}`));
            return acc;
        }, []);

    const initialAcc = (keys: string[]) =>
        keys.reduce((acc: TNomenclatureValue, key: string) => {
            acc[key] = [];
            return acc;
        }, {});

    const result = (newValue: string[]) =>
        newValue.reduce((acc: TNomenclatureValue, el: string) => {
            let [key, value] = el.split(' ');
            if (keys[0] === manNomKeys[0]) {
                acc[key].push(Number(value));
            } else {
                acc[key].push(value);
            }
            return acc;
        }, initialAcc(keys));

    const treeProps = {
        className: `${style.treeSelect} ${className}`,
        treeData: nomenclatureData,
        value: treeSelectValue(keys),
        onChange: (newValue: string[]) => {
            onTreeChange(result(newValue));
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
