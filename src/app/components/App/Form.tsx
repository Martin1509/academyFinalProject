// /** @tsx jsx */
// import {jsx} from '@emotion/react';

import React from 'react';
import styled from '@emotion/styled';
import {Formik} from 'formik';
import {css} from '@emotion/react';
import {TextField, Button} from '@mui/material';
import * as Yup from 'yup';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import moment from 'moment';

import {Dropzone} from './Dropzone';

const FormContainer = styled.div(() => ({
  backgroundColor: '#f7f7f7',
  height: '100vh',
  textAlign: 'center'
}));

// const FormContainer = styled.div`
// backgroundColor: '#f7f7f7',
// height: '100vh',
// textAlign: 'center'
// `;

const formStyle = css({
  boxSizing: 'border-box'
});

const inputStyle = css({
  marginTop: '20px'
});

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(40, 'Too Long!')
    .test('contain_number', 'Cannot contain number!', function(value) {
      return value !== undefined ? !/\d/.test(value?.toString()) : true;
    })
    .required('Required'),
  email: Yup.string()
    .min(3, 'Too Short!')
    .max(80, 'Too Long!')
    .matches(
      /^(?:[a-zA-Z0-9!#$%&‘*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&‘*+/=?^_`{|}~-]+)*)@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/,
      'Email is in incorrect format!'
    )
    .required('Required'),
  birthdate: Yup.date()
    .typeError('Must be valid date!')
    .test('age_check', 'Age must be between 18 to 99', function(value) {
      const minDate = new Date();
      const maxDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);
      maxDate.setFullYear(maxDate.getFullYear() - 99);
      if (
        maxDate.getTime() <= new Date(value!).getTime() &&
        new Date(value!).getTime() <= minDate.getTime()
      ) {
        return true;
      }
      return false;
    })
    .required('Required')
});

const Form: React.FC = () => {
  const [, setFileSelected] = React.useState<File>();
  const [imagePreview, setImagePreview] = React.useState<string>('');
  console.log(imagePreview);

  return (
    <FormContainer>
      <div css={formStyle}>
        <Formik
          initialValues={{email: '', name: '', info: '', birthdate: new Date()}}
          validationSchema={FormSchema}
          onSubmit={(values, {setSubmitting}) => {
            axios.post('http://localhost:8081/attendees', {
              id: 'uuid' + Math.floor(Math.random() * 1000),
              name: values.name,
              'e-mail': values.email,
              birthdate: (moment(values.birthdate.toString())).format('D.M.YYYY').toString(),
              moreInfo: values.info,
              file: imagePreview
            }).catch( (error) => {
              console.log(error);
            });

            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  css={inputStyle}
                  id="name"
                  label="Name"
                  variant="outlined"
                  name="name"
                  error={errors.name && touched.name ? true : false}
                  helperText={errors.name && touched.name && errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <TextField
                  css={inputStyle}
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  error={errors.email && touched.email ? true : false}
                  helperText={errors.email && touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    css={inputStyle}
                    label="Birthdate"
                    inputFormat="MM.DD.YYYY"
                    value={values.birthdate}
                    onChange={(data) => setFieldValue('birthdate', data)}
                    renderInput={(params) => (
                      <TextField
                        id='birthdate'
                        name="birthdate"
                        {...params}
                        error={
                          errors.birthdate && touched.birthdate ? true : false
                        }
                        helperText={
                          errors.birthdate &&
                          touched.birthdate &&
                          errors.birthdate
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <TextField
                  css={inputStyle}
                  id="info"
                  label="More info"
                  variant="outlined"
                  name="info"
                  error={errors.info ? true : false}
                  helperText={errors.info}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Dropzone setFileSelected={setFileSelected} setImagePreview={setImagePreview}/>
              <div css={inputStyle}>
                {imagePreview != undefined && imagePreview != '' ? (
                  <img css={{height: '150px'}} src={imagePreview} alt="img"/>
                ) : (
                  <></>
                )}
              </div>
              <Button
                css={inputStyle}
                variant="outlined"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </FormContainer>
  );
};

export {Form};
