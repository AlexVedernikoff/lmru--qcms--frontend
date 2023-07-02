import {useState} from 'react';
import {IProvidersParams} from '../../../../common/types/providers';
import {useGetProvidersQuery} from '../../services';

export const useGetProviders = (props: IProvidersParams) => {
    const [requestPayload, updateRequestPayload] = useState<IProvidersParams>(props);
    const {isLoading, error, data: providers} = useGetProvidersQuery(requestPayload);

    function loadProvidersList(payload: IProvidersParams) {
        updateRequestPayload(payload);
    }

    return {isLoading, providers, error, loadProvidersList};
};
