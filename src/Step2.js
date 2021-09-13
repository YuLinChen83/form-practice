import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import { useData } from './DataContext';
import MainContainer from './components/MainContainer';
import FileInput from './components/FileInput';
import PrimaryButton from './components/PrimaryButton';
import Form from './components/Form';

const Step2 = () => {
  const history = useHistory();
  const { data, setValues } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const onSubmit = (data2) => {
    history.push('/result');
    setValues(data2);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput name="files" control={control} />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};

export default Step2;
