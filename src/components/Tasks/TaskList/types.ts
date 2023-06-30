import {TWithReactKey} from '../../../common/clientModels';
import {ITaskListResponse} from '../../../common/types/tasks';

export enum EModalVariant {
    approver,
    assignee,
    documents,
}

export type TDataType = TWithReactKey<ITaskListResponse['content'][number]>;
