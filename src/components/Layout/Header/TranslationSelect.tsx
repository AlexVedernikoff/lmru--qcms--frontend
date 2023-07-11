import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown, DropdownItem} from 'fronton-react';
import {ETranslation} from 'common/clientModels';

const localeList: ETranslation[] = [ETranslation.RU, ETranslation.EN];

const TranslationSelect: React.FC = () => {
    const {i18n} = useTranslation();
    const [locale, setLocale] = useState(localStorage.getItem('locale') || ETranslation.RU);

    useEffect(() => {
        if (i18n.language !== locale) {
            i18n.changeLanguage(locale);
        }
    }, [i18n, locale]);

    const handleSelect = (value: string | null) => {
        setLocale(value as ETranslation);
        localStorage.setItem('locale', value || '');
    };

    return (
        <Dropdown size="s" closeOnSelect value={locale} onSelect={handleSelect}>
            {localeList.map(d => (
                <DropdownItem key={d} text={d.toUpperCase()} value={d} />
            ))}
        </Dropdown>
    );
};

export default TranslationSelect;
