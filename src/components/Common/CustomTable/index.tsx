import {useRef, useState, useEffect} from 'react';
import {Table, TablePaginationConfig, TableProps} from 'antd';
import {Counter, Grid, Pagination, PaginationItem} from 'fronton-react';
import {ChevronLeftIcon, ChevronRightIcon} from '@fronton/icons-react';
import './Table.css';

function CustomTable<T extends object>(props: TableProps<T>) {
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

    const handleChangeListSize = (_e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const v = parseInt(value, 10);
        const {pageSize, current, onChange} = (props.pagination as TablePaginationConfig) || {};
        if (v && v !== pageSize) {
            onChange?.(current!, v);
        }
    };

    const handleChangePage: React.MouseEventHandler<HTMLAnchorElement> = e => {
        const {item} = e.currentTarget.dataset;
        const newPage = item ? parseInt(item, 10) : undefined;

        const {pageSize, current, onChange} = (props.pagination as TablePaginationConfig) || {};

        if (newPage && newPage !== current) {
            onChange?.(newPage, pageSize!);
        }
    };

    return (
        <Grid ref={ref => (containerRef.current = ref)} columns="1fr" rowGap={12}>
            <Table
                {...props}
                style={{width: containerSize}}
                pagination={{...props.pagination, style: {display: 'none'}}}
            />

            {!!props.pagination && (
                <Grid columns="1fr 1fr 1fr">
                    <Counter onChange={handleChangeListSize} value={(props.pagination?.pageSize || 1).toString()} />
                    <span />
                    <Grid columns="1fr 1fr">
                        <span />
                        <Pagination
                            currentPage={props.pagination?.current || 1}
                            item={item => (
                                <PaginationItem onClick={handleChangePage} data-item={item}>
                                    {item}
                                </PaginationItem>
                            )}
                            itemsCount={props.pagination?.total || 1}
                            itemsPerPage={props.pagination?.pageSize || 1}
                            itemPrev={item => (
                                <PaginationItem wrap onClick={handleChangePage} data-item={item}>
                                    <ChevronLeftIcon />
                                </PaginationItem>
                            )}
                            itemNext={item => (
                                <PaginationItem wrap onClick={handleChangePage} data-item={item}>
                                    <ChevronRightIcon />
                                </PaginationItem>
                            )}
                        />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}

export default CustomTable;
