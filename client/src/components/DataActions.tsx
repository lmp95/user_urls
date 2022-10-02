import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";

const DataActions = (props: GridRenderCellParams<any>, onDeleteItem: any) => {

    return (
        <>
            <IconButton onClick={undefined}><EditOutlined fontSize='small' color='primary' /></IconButton>
            <IconButton onClick={() => onDeleteItem(props.row)}><DeleteOutline fontSize='small' color='error' /></IconButton>
        </>
    );
};

export default DataActions;