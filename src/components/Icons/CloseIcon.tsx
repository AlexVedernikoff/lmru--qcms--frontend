import {InternalIconComponent} from '@fronton/icons-react/types';

const CloseIcon: InternalIconComponent = ({color}) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.99984 0.666672C4.39723 0.666672 0.666504 4.3974 0.666504 9.00001C0.666504 13.6026 4.39723 17.3333 8.99984 17.3333C13.6024 17.3333 17.3332 13.6026 17.3332 9.00001C17.3332 4.3974 13.6024 0.666672 8.99984 0.666672ZM6.39567 5.30521L8.99984 7.90938L11.604 5.30521L12.6946 6.39584L10.0905 9.00001L12.6946 11.6042L11.604 12.6948L8.99984 10.0906L6.39567 12.6948L5.30505 11.6042L7.90921 9.00001L5.30505 6.39584L6.39567 5.30521Z"
            fill={color}
        />
    </svg>
);

export default CloseIcon;
