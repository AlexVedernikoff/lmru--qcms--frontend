import {useRef, useState, useEffect} from 'react';
import {Table, TableProps} from 'antd';

function AutoWidthTable<T extends object>(props: TableProps<T>) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerSize, setContainerSize] = useState(500);

    const updateContainerSize = () => {
        if (containerRef.current) {
            setContainerSize(containerRef.current.clientWidth);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', updateContainerSize);
        updateContainerSize();
        return () => {
            window.removeEventListener('resize', updateContainerSize);
        };
    }, []);

    return (
        <div ref={ref => (containerRef.current = ref)}>
            <Table {...props} style={{width: containerSize}} />
        </div>
    );
}

export default AutoWidthTable;
