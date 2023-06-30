import {Grid, Dropdown, DropdownItem, Input} from 'fronton-react';
import {useTranslation} from 'react-i18next';

interface IProps {
    user: string | undefined;
    type: string | undefined;
    handleSelect: (v: string | null) => void;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddApprover: React.FC<IProps> = ({handleInput, handleSelect, type, user}) => {
    const {t} = useTranslation('tasks');

    return (
        <Grid gap={24}>
            <Dropdown
                size="m"
                closeOnSelect
                placeholder={t('Common.Select')}
                label={t('TaskList.Filters.QE')}
                value={type}
                onSelect={handleSelect}
            >
                <DropdownItem text="Поставщик" value={'SUPPLIER'} />
                <DropdownItem text="QE" value={'QE'} />
                <DropdownItem text="SQM" value={'SQM'} />
                <DropdownItem text="Подрядчик" value={'SERVICE_PROVIDER'} />
            </Dropdown>

            <Input
                inputSize="m"
                autoComplete="off"
                label={'Утверждающий'}
                name={'user'}
                placeholder=""
                value={user}
                onChange={handleInput}
            />
        </Grid>
    );
};

export default AddApprover;
