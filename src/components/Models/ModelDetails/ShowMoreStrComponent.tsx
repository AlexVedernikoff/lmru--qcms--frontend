import {useEffect, useRef, useState} from 'react';
import {Grid} from 'fronton-react';
import {ChevronDownIcon} from '@fronton/icons-react';
import {TFunction} from 'i18next';

interface IProps {
    arr: string[];
    sliceBeforePointers: number;
    t: TFunction<'models', undefined, 'models'>;
}

const ShowMoreStrComponent: React.FC<IProps> = ({arr, sliceBeforePointers, t}) => {
    const ellipsisRef = useRef<HTMLDivElement>(null);
    const [showAllValues, setShowAllValues] = useState(false);

    useEffect(() => {
        const handleMouseEnter = () => setShowAllValues(true);
        const handleMouseLeave = () => setShowAllValues(false);

        const ellipsisElement = ellipsisRef.current;

        if (ellipsisElement) {
            ellipsisElement.addEventListener('mouseenter', handleMouseEnter);
            ellipsisElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (ellipsisElement) {
                ellipsisElement.removeEventListener('mouseenter', handleMouseEnter);
                ellipsisElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <ul style={{margin: 0}}>
            {arr.slice(0, sliceBeforePointers).map((value, index) => (
                <div key={index}>
                    <li>{value}</li>
                </div>
            ))}
            <div ref={ellipsisRef}>
                {!showAllValues && arr.length > sliceBeforePointers && (
                    <Grid justifyContent="center" style={{paddingTop: '3px'}}>
                        <Grid columnGap={4} alignItems="end" columns="auto auto" style={{fontSize: '12px'}}>
                            <div>{t('ModelDetails.MasterPlan.Table.ShowMore')}</div>
                            <ChevronDownIcon size="s" />{' '}
                        </Grid>
                    </Grid>
                )}
                {showAllValues &&
                    arr.slice(sliceBeforePointers).map((value, index) => (
                        <div ref={ellipsisRef} key={index + sliceBeforePointers}>
                            <li>{value}</li>
                        </div>
                    ))}
            </div>
        </ul>
    );
};

export default ShowMoreStrComponent;
