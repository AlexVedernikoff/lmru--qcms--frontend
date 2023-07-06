import {TWithReactKey} from '../../../common/clientModels';
import {ITaskListResponse} from '../../../common/types/tasks';

export enum EModalVariant {
    approver = 'approver',
    responsible = 'responsible',
    documents = 'documents',
}

export type TDataType = TWithReactKey<ITaskListResponse['content'][number]>;

export interface IModalProps {
    isOpen: boolean;
    onClose: (isCompleted?: boolean) => void;
    dataList: TDataType[];
}
