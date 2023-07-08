import {useEffect, useRef, useState} from 'react';
import {Grid} from 'fronton-react';

interface IProps {
    arr: string[];
    sliceBeforePointers: number;
}

const PointersComponent: React.FC<IProps> = ({arr, sliceBeforePointers}) => {
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
        <div>
            {arr.slice(0, sliceBeforePointers).map((value, index) => (
                <div key={index}>{value}</div>
            ))}
            <div ref={ellipsisRef}>
                {!showAllValues && arr.length > sliceBeforePointers && (
                    <Grid justifyContent="center">
                        <div style={{textDecoration: 'underline', fontSize: '20px'}}>...</div>
                    </Grid>
                )}
                {showAllValues &&
                    arr.slice(sliceBeforePointers).map((value, index) => (
                        <div ref={ellipsisRef} key={index + sliceBeforePointers}>
                            {value}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default PointersComponent;
