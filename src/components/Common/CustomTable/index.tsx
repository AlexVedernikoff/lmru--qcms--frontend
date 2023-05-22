import {useRef, useState, useEffect} from 'react';
import {Table, TableProps} from 'antd';
import {Counter, Grid, Pagination, PaginationItem} from 'fronton-react';
import {ChevronLeftIcon, ChevronRightIcon} from '@fronton/icons-react';
import './Table.css';

function CustomTable<T extends object>(props: TableProps<T>) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerSize, setContainerSize] = useState(500);

    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

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
        if (v && v !== size) {
            setSize(v);
        }
    };

    const handleChangePage: React.MouseEventHandler<HTMLAnchorElement> = e => {
        const {item} = e.currentTarget.dataset;
        const newPage = item ? parseInt(item, 10) : undefined;

        if (newPage && newPage !== page) {
            setPage(newPage);
        }
    };

    return (
        <Grid ref={ref => (containerRef.current = ref)} columns="1fr" rowGap="12px">
            <Table
                {...props}
                style={{width: containerSize}}
                pagination={{...props.pagination, style: {display: 'none'}}}
            />

            {!!props.pagination && (
                <Grid columns="1fr 1fr 1fr">
                    <Counter onChange={handleChangeListSize} value={size.toString()} />
                    <span />
                    <Grid columns="1fr 1fr">
                        <span />
                        <Pagination
                            currentPage={page}
                            item={item => (
                                <PaginationItem onClick={handleChangePage} data-item={item}>
                                    {item}
                                </PaginationItem>
                            )}
                            itemsCount={100}
                            itemsPerPage={size}
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
