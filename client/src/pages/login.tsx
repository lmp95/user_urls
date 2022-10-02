import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import fetchApi from '../utils/fetchApi';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginInterface } from '../interfaces/login.interface';
import { Cookie } from '../utils/cookies';
import { useDispatch } from 'react-redux';
import { assignUser } from '../reducers/user.reducer';
import SnackbarBox from '../components/SnackbarBox';

function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInterface>();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitLogin: SubmitHandler<LoginInterface> = async (data) => {
    await fetchApi('/auth/login', 'POST', data)
      .then((response) => {
        onSuccessCallback(response);
      })
      .catch((error) => {
        onErrorCallback();
      });
  };

  const onSuccessCallback = (response: any) => {
    dispatch(assignUser(response));
    Cookie.setCookies(response.token);
    navigate('/');
  };

  const onErrorCallback = () => {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 1000);
  };

  return (
    <div className='login'>
      <div className='login-card'>
        <p className='title'>Welcome</p>
        <p className='sub-title'>Please enter email and password</p>
        <form className='login-form' onSubmit={handleSubmit(onSubmitLogin)}>
          <TextField
            className='text-field'
            id='email'
            label='Email'
            variant='outlined'
            {...register('email', { required: true })}
            error={errors?.email && true}
            helperText={errors?.email && 'This field is required'}
          />
          <TextField
            className='text-field'
            id='password'
            type={'password'}
            label='Password'
            variant='outlined'
            {...register('password', { required: true })}
            error={errors?.password && true}
            helperText={errors?.password && 'This field is required'}
          />
          <Button variant='contained' disableElevation type='submit'>
            Submit
          </Button>
        </form>
        {isError && (
          <SnackbarBox
            show={isError}
            message='Email and password is not correct.'
            severity='error'
          />
        )}
      </div>
    </div>
  );
}

export default Login;
