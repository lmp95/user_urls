import { Button, TextField, TextFieldProps } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { BlacklistRegexInterface } from '../interfaces/blacklistRegex.interface';
import fetchApi from '../utils/fetchApi';

function Blacklist() {
  const [blacklistRegex, setBlacklistRegex] = useState('');
  const [loading, setLoading] = useState(true);

  const updateBlacklistRegex = async () => {
    setLoading(true);
    await fetchApi('/blacklist', 'POST', {
      regexFormat: blacklistRegex,
    })
      .then((response) => {
        setBlacklistRegex(response.regexFormat);
      })
      .catch((error) => {
        // onErrorCallback();
      });
  };

  useEffect(() => {
    fetchApi('/blacklist', 'GET')
      .then((response) => {
        setBlacklistRegex(response.regexFormat);
      })
      .catch(() => {});
    setLoading(false);
  }, [loading]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 400 }}>
      <TextField
        className='text-field'
        variant='outlined'
        label='Regex'
        helperText='Enter regex format'
        value={blacklistRegex}
        onChange={(event) => setBlacklistRegex(event.target.value)}
      />
      <Button
        variant='contained'
        disableElevation
        onClick={updateBlacklistRegex}
      >
        Update
      </Button>
    </div>
  );
}

export default Blacklist;
