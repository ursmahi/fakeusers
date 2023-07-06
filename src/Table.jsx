import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
const Table = ({colNames,userData}) => {

    const gridRef = useRef();

    const onBtnExport = useCallback(() => {
        gridRef.current.api.exportDataAsCsv();
    }, []);

    return (
        <>
            <div className="w-11/12 h-fit m-5">

                <div className="ag-theme-alpine " style={{height:550}}>

                    <AgGridReact
                        ref={gridRef}
                        pagination={true}
                        paginationAutoPageSize={true}
                        rowStyle={{ borderRight: '1px solid #ccc' }}
                        // paginationPageSize={10}
                        rowData={userData}
                        columnDefs={colNames}
                        >
                    </AgGridReact>
                </div>
            <button className="bg-blue-400 rounded-md p-2 text-white"
            onClick={onBtnExport}
            >Export CSV</button>
            </div>
        </>
    );
};

export default Table;
