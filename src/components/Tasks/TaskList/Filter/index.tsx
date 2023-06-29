import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {skipToken} from '@reduxjs/toolkit/dist/query';
import {Dropdown, DropdownItem, Grid, Input, RegularButton} from 'fronton-react';
import {ChevronDownIcon, ChevronUpIcon} from '@fronton/icons-react';
import AdditionalFilter from './AdditionalFilter';
import styles from '../../../Common.module.css';
import tasksApi from '../../tasksApi';
import CustomCheckbox from '../../../Common/CustomCheckbox/CustomCheckbox';
import {ITaskListParams} from '../../../../common/types/tasks';

export type TFilterFormState = ITaskListParams['body']['searchBy'];

interface IProps {
    onSubmit: (filters: TFilterFormState) => void;
}

const Filter: React.FC<IProps> = ({onSubmit}) => {
    const {t} = useTranslation('tasks');

    const {isLoading, isFetching} = tasksApi.endpoints.getTasks.useQueryState(skipToken);

    const [isMoreFiltersActive, setIsMoreFiltersActive] = useState(false);
    const [formState, setFormState] = useState<TFilterFormState>({});

    const handleShowMoreFiltersClick = () => {
        setIsMoreFiltersActive(prevState => !prevState);
    };

    const handleClear: React.MouseEventHandler<HTMLButtonElement> = _e => {
        setFormState({});
        onSubmit(formState);
    };

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = _e => {
        onSubmit(formState);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const name = e.target.name as keyof TFilterFormState;
        let newValue: unknown = value;

        switch (name) {
            case 'actionStatuses':
            case 'awaitedDocumentTypes':
            case 'conclusions':
            case 'categoryTypeNames':
                newValue = [value];
                break;
            case 'qualityActionId':
                newValue = parseInt(value, 10);
                break;
        }

        setFormState(p => ({...p, [name]: newValue}));
    };

    const handleSelect = (name: keyof TFilterFormState) => (value: string | null) => {
        let prevValue: unknown = formState[name];
        let newValue: unknown = value;

        switch (name) {
            case 'responsible':
                newValue = [value];
                prevValue = formState[name]?.[0]?.type;
                break;
        }

        setFormState({...formState, [name]: prevValue === value ? undefined : newValue});
    };

    const handleCheck = (value: boolean | undefined, name: string) => {};

    return (
        <Grid rowGap={16} alignItems="center" className={styles.panel}>
            <Grid columnGap={16} columns="repeat(3, 1fr)" alignItems="baseline" rowGap={48}>
                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={24}>
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.productCode')}
                        name={'productCode'}
                        placeholder=""
                        value={formState.productCode}
                        onChange={handleInputChange}
                    />
                    {/* <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.responsibleContractor')}
                        name={'productCode'}
                        placeholder=""
                        value={formState.productCode}
                        onChange={handleInputChange}
                    /> */}
                    <Dropdown
                        size="m"
                        closeOnSelect
                        placeholder={t('Common.Select')}
                        label={t('TaskList.Filters.QE')}
                        value={formState.responsible?.[0]?.type}
                        onSelect={handleSelect('responsible')}
                    >
                        <DropdownItem text="Поставщик" value={'SUPPLIER'} />
                        <DropdownItem text="QE" value={'QE'} />
                        <DropdownItem text="SQM" value={'SQM'} />
                        <DropdownItem text="Подрядчик" value={'SERVICE_PROVIDER'} />
                    </Dropdown>
                    {/* <CustomSwitch checked={formState.fromAnother} handleChange={() => {}} name={'Actions from another platform'} /> */}
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={24}>
                    {/* <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.QE')}
                        name={'responsible'}
                        placeholder=""
                        value={formState.responsible?.[0]?.type}
                        onChange={handleInputChange}
                    /> */}
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.taskStatus')}
                        name={'actionStatuses'}
                        placeholder=""
                        value={formState.actionStatuses?.[0]!}
                        onChange={handleInputChange}
                    />
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.providerName')}
                        name={'supplierName'}
                        placeholder=""
                        value={formState.supplierName}
                        onChange={handleInputChange}
                    />
                    {/* <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.contractor')}
                        name={'responsible'}
                        placeholder=""
                        value={formState.responsible?.[0]?.type}
                        onChange={handleInputChange}
                    /> */}
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.conclusion')}
                        name={'conclusions'}
                        placeholder=""
                        value={formState.conclusions?.[0]}
                        onChange={handleInputChange}
                    />
                </Grid>

                <Grid columnGap={16} columns="1fr" alignItems="baseline" rowGap={12}>
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.documentType')}
                        name={'awaitedDocumentTypes'}
                        placeholder=""
                        value={formState.awaitedDocumentTypes?.[0]!}
                        onChange={handleInputChange}
                    />
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.taskNumber')}
                        name={'qualityActionId'}
                        placeholder=""
                        value={formState.qualityActionId?.toString()}
                        onChange={handleInputChange}
                    />
                    <Input
                        inputSize="m"
                        autoComplete="off"
                        label={t('TaskList.Filters.taskType')}
                        name={'categoryTypeNames'}
                        placeholder=""
                        value={formState.categoryTypeNames?.[0]}
                        onChange={handleInputChange}
                    />

                    <CustomCheckbox
                        name="isForUpdate"
                        onChange={handleCheck}
                        value={formState.isForUpdate}
                        label={t('TaskList.Filters.isUpdating')}
                    />
                </Grid>
            </Grid>

            {isMoreFiltersActive && <AdditionalFilter formState={formState} setFormState={setFormState} />}

            <Grid columnGap={16} columns="repeat(6, 1fr)" alignItems="baseline">
                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton
                        onClick={handleShowMoreFiltersClick}
                        size="m"
                        variant="pseudo"
                        iconLeft={isMoreFiltersActive ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    >
                        {isMoreFiltersActive ? t('Buttons.Less') : t('Buttons.More')}
                    </RegularButton>
                </Grid>

                <span />
                <span />
                <span />
                <span />

                <Grid columnGap={16} columns="repeat(2, 1fr)">
                    <RegularButton disabled={isLoading || isFetching} onClick={handleClear} size="m" variant="outline">
                        {t('Buttons.Clear')}
                    </RegularButton>

                    <RegularButton disabled={isLoading || isFetching} size="m" variant="primary" onClick={handleSubmit}>
                        {t('Buttons.Search')}
                    </RegularButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Filter;
