import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, FormControlLabel } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MainContainer from './components/MainContainer';
import Form from './components/Form';
import Input from './components/Input';
import CustomCheckbox from './components/CustomCheckbox';
import PrimaryButton from './components/PrimaryButton';
import { useData } from './DataContext';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contains numbers')
    .required('First name is required field'),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last name is a required field'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  acceptTerms: yup.bool().oneOf([true], 'Love it is required'),
});

const Step1 = () => {
  const { setValues, data } = useData();
  const history = useHistory();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      acceptTerms: data.acceptTerms,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (submitData) => {
    history.push('/step2');
    setValues(submitData);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('firstName')}
          type="text"
          label="First Name"
          required
          name="firstName"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
        <Input
          {...register('lastName')}
          type="text"
          label="Last Name"
          required
          name="lastName"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
        <Input
          {...register('email')}
          type="text"
          label="Email"
          required
          name="email"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormControlLabel
          control={
            <Controller
              control={control}
              name="acceptTerms"
              defaultValue="false"
              inputRef={register()}
              render={({ field: { onChange } }) => <CustomCheckbox onChange={(e) => onChange(e.target.checked)} />}
            />
          }
          label="Love it"
        />
        <Typography variant="inherit" color="secondary">
          {errors.acceptTerms ? `(${errors.acceptTerms.message})` : ''}
        </Typography>
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step1;
