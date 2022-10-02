import { Button, TextField } from '@mui/material';
import React, { MouseEventHandler } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { UrlInterface } from '../interfaces/url.interface';

function UrlForm({
  onCancel,
  onConfirm,
}: {
  onCancel?: MouseEventHandler;
  onConfirm?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className='create-form' onSubmit={handleSubmit(onConfirm)}>
      <TextField
        id='fullUrl'
        className='text-field'
        variant='outlined'
        label='Full Url'
        {...register('fullUrl', { required: true })}
        error={errors?.fullUrl && true}
        helperText={errors?.fullUrl && 'This field is required'}
      />
      <TextField
        id='expiry'
        className='text-field'
        variant='outlined'
        label='Expire In'
        type={'number'}
        {...register('expiry', {
          required: true,
        })}
        error={errors?.expiry && true}
        helperText={errors?.expiry && 'This field is required'}
      />
      <div className='form-btns'>
        <Button type='submit' variant='contained' disableElevation>
          Submit
        </Button>
        <Button variant='text' disableElevation onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default UrlForm;
