import { GridColDef, } from "@mui/x-data-grid";
import DataActions from "../components/DataActions";

const generateDataColumnRow = (data: any, onDeleteItem: any) => {
    let columns: GridColDef[] = [];
    for (const [key] of Object.entries(data[0])) {
        if(key === '_id') continue;
        if(key === 'expiry') {
            columns.push(
                {
                    field: key,
                    headerName: key.charAt(0).toUpperCase() + key.slice(1),
                    flex: 1,
                    sortable: false,
                    valueGetter: (params) => convertToLocalDate(params.row.expiry)
                });
        }
        else columns.push(
            {
                field: key,
                headerName: key.charAt(0).toUpperCase() + key.slice(1),
                flex: 1,
                sortable: false,
            });
    }
    columns.push(
        {
            field: '',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            renderCell: (params) => DataActions(params, onDeleteItem),
        },
    );
    return columns;
}

const convertToLocalDate = (date: Date) => {
    return new Date(date).toDateString();
}

export const Common = {
    generateDataColumnRow,
    convertToLocalDate
}