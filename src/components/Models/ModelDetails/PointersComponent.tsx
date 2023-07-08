import {Grid} from 'fronton-react';
import React, {useEffect, useRef, useState, useCallback} from 'react';

interface IProps {
    arr: string[];
    sliceBeforePointers: number;
}

export const PointersComponent: React.FC<IProps> = ({arr, sliceBeforePointers}) => {
    const [showAllValues, setShowAllValues] = useState(false);
    const ellipsisRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = useCallback(() => {
        setShowAllValues(!showAllValues);
    }, [showAllValues]);

    const handleMouseLeave = useCallback(() => {
        setShowAllValues(showAllValues);
    }, [showAllValues]);

    useEffect(() => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
