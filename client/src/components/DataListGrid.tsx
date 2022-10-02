import { Box } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UrlInterface } from '../interfaces/url.interface';
import { RootState } from '../stores/store';
import { Common } from '../utils/common';
import fetchApi from '../utils/fetchApi';
import PopupModal from './PopupModal';

function DataListGrid({
  data,
  reload,
}: {
  data: GridRowsProp;
  reload?: Function;
}) {
  const [showDialog, setShowDialog] = useState(false);
  const [selected, setSelected] = useState<UrlInterface>();
  const { token } = useSelector((state: RootState) => state.user);

  const onDeleteItem = (item: UrlInterface) => {
    setShowDialog(true);
    setSelected(item);
  };

  const onConfirmDelete = async () => {
    if (selected) {
      await fetchApi(`/url/${selected?._id}`, 'DELETE', undefined, token)
        .then(() => {
          reload && reload();
        })
        .catch(() => {});
    }
    setShowDialog(false);
  };

  let columns: GridColDef[] = [];
  if (data.length > 0)
    columns = Common.generateDataColumnRow(data, onDeleteItem);

  return (
    <Box height={'500px'}>
      <DataGrid
        getRowId={(row: any) => row._id}
        rows={data}
        disableColumnMenu
        pageSize={10}
        columns={columns}
        hideFooter
      />
      {showDialog && (
        <PopupModal
          open={showDialog}
          size='sm'
          body={`Are you sure to delete ${selected?.shortCode}?`}
          title='Logout'
          onOk={onConfirmDelete}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </Box>
  );
}

export default DataListGrid;
