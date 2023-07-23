import { useState } from "react";

export const usePaginationHook = ({ countPerPage, defaultPage }) => {
    const [page, setPage] = useState(defaultPage ?? 1);
    const [countPerPageState, setCountPerPage] = useState(countPerPage ?? 10);

    const onChangePage = (pageNumber, recordsPerPage) => {
        setPage(pageNumber);
        if (recordsPerPage) setCountPerPage(recordsPerPage);
    };

    return {
        countPerPage: countPerPageState,
        page,
        onChangePage,
    };
};
