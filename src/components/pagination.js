import { Pagination as AntPagination } from "antd";
import { useEffect, useState } from "react";

export const Pagination = ({
                               totalItems,
                               defaultPage,
                               onChangePage,
                               defaultPageSize,
                           }) => {
    const [page, setPage] = useState(defaultPage ?? 1);
    useEffect(() => {
        setPage(defaultPage);
    }, [defaultPage]);

    return (
        <AntPagination
            total={totalItems}
            pageSize={defaultPageSize ?? 10}
            onChange={(pageNum, pageSize) => onChangePage(pageNum)}
        />
    );
};
