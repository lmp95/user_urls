import { AddOutlined } from '@mui/icons-material';
import { Button, Pagination, Stack, TextField } from '@mui/material';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataListGrid from '../components/DataListGrid';
import DropDownMenu from '../components/DropDownMenu';
import PopupModal from '../components/PopupModal';
import UrlForm from '../components/UrlForm';
import { RootState } from '../stores/store';
import fetchApi from '../utils/fetchApi';

function UrlList() {
  const [dropDownMenu, setDropDownMenu] = useState<null | HTMLElement>(null);
  const [sortBy, setSortBy] = useState({ key: '', value: '' });
  const [filterKeyword, setFilterKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [urlList, setUrlList] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state: RootState) => state.user);

  const options = [
    { key: 'expiry', value: 'Expiry' },
    { key: 'numberOfHits', value: 'Number of Hits' },
  ];

  useEffect(() => {
    fetchApi(
      `/url?sort=${sortBy.key}&filter=${filterKeyword}&page=${
        page - 1
      }&pageSize=${pageSize}`,
      'GET',
      undefined,
      token
    )
      .then((response) => {
        setUrlList(response);
      })
      .catch(() => {});
    setLoading(false);
  }, [loading, sortBy, page]);

  const closeDialog = () => {
    setShowCreateForm(false);
  };

  const onCloseDropdown = () => {
    setDropDownMenu(null);
  };

  const onFilterKeyword = () => {
    setLoading(true);
  };

  const onSelectDropdown = (index: number) => {
    setSortBy(options[index]);
    setDropDownMenu(null);
  };

  const onCreateSubmit = async (data: any) => {
    await fetchApi('/url/generate', 'POST', data, token)
      .then((response) => {
        setLoading(true);
      })
      .catch((error) => {});
    setShowCreateForm(false);
  };

  return (
    <>
      <div className='list-header'>
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 600 }}>Sort By</p>
            <Button
              onClick={(event: MouseEvent<HTMLButtonElement>) =>
                setDropDownMenu(event.currentTarget)
              }
            >
              {sortBy.value.length > 0 ? sortBy.value : 'Select'}
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
              label='Keyword filter'
              id='filter'
              size='small'
              variant='standard'
              value={filterKeyword}
              onChange={(event) => setFilterKeyword(event.target.value)}
            />
            <Button
              style={{ marginLeft: 12 }}
              variant='contained'
              disableElevation
              onClick={onFilterKeyword}
            >
              Filter
            </Button>
          </div>
        </div>
        <Button
          variant='outlined'
          startIcon={<AddOutlined />}
          onClick={() =>
            showCreateForm ? setShowCreateForm(false) : setShowCreateForm(true)
          }
        >
          Create
        </Button>
      </div>
      <DataListGrid data={urlList} reload={setLoading} />
      <Stack style={{ display: 'flex', alignItems: 'end' }} spacing={2}>
        <Pagination
          onChange={(event, current) => setPage(current)}
          page={page}
          count={10}
          variant='outlined'
          shape='rounded'
        />
      </Stack>
      <div style={{ height: 16, width: '100%' }}></div>
      {showCreateForm && (
        <PopupModal
          title='Create New Url'
          open={showCreateForm}
          size='md'
          body={<UrlForm onCancel={closeDialog} onConfirm={onCreateSubmit} />}
          onCancel={closeDialog}
          onOk={undefined}
          isFooter={false}
        />
      )}
      <DropDownMenu
        options={options}
        anchorEl={dropDownMenu}
        onClose={onCloseDropdown}
        onSelect={onSelectDropdown}
      />
    </>
  );
}

export default UrlList;
