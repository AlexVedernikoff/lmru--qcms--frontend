import {Typography} from 'fronton-react';

interface IProps {
    label: string | number | undefined;
    text: string | number | undefined;
}

const TextBlock: React.FC<IProps> = ({label, text}) => (
    <div>
        <Typography variant="s" size="body_long" color="text-minor">
            {label}
        </Typography>
        <br />
        <Typography variant="s" size="body_short">
            {text}
        </Typography>
    </div>
);

export default TextBlock;
