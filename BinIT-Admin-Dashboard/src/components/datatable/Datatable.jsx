import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./Datatable.scss";

export const Datatable = (props) => {
  return (
    <div className="datatable">
      <DataGrid
        className="datatableint"
        rows={props.rows} // Use the rows passed from the parent component
        columns={props.columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        autoHeight
      />
    </div>
  );
};

