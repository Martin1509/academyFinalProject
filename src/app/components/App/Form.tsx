// /** @tsx jsx */
// import {jsx} from '@emotion/react';

import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import {Formik} from 'formik';
import {css} from '@emotion/react';
import {TextField, Button} from '@mui/material';
import * as Yup from 'yup';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import {v4 as uuidv4} from 'uuid';

import {createAttendee, getAllAttendees} from 'app/services/attendeesService';
import {Dropzone} from './Dropzone';
import {ItemList} from './ItemList';
import {Attendee} from 'app/models/App/Attendee';
import useInvalidate from './useInvalidate';

const FormContainer = styled.div(() => ({
  backgroundColor: '#f7f7f7',
  height: '100vh',
  textAlign: 'center'
}));

const formStyle = css({
  display: 'inline-block',
  maxWidth: '500px'
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
  const [imagePreview, setImagePreview] = useState<string>('');
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [valid, invalidate] = useInvalidate();

  useEffect(() => {
    getAllAttendees().then((data) => {
      setAttendees(data);
    });
  }, [valid]);

  return (
    <FormContainer>
      <div css={formStyle}>
        <Formik
          initialValues={{email: '', name: '', info: '', birthdate: new Date()}}
          validationSchema={FormSchema}
          onSubmit={(values, {setSubmitting}) => {
            createAttendee({
              id: uuidv4(),
              name: values.name,
              'e-mail': values.email,
              birthdate: (moment(values.birthdate.toString())).format('D.M.YYYY').toString(),
              moreInfo: values.info,
              file: imagePreview
            }).then(() => invalidate())
              .catch( (error) => {
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
                  fullWidth
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
                  fullWidth
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
                    inputFormat="DD.MM.YYYY"
                    value={values.birthdate}
                    onChange={(data) => setFieldValue('birthdate', data)}
                    renderInput={(params) => (
                      <TextField
                        id='birthdate'
                        name="birthdate"
                        fullWidth
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
                  fullWidth
                  error={errors.info ? true : false}
                  helperText={errors.info}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Dropzone setImagePreview={setImagePreview} imagePreview={imagePreview}/>
              <Button
                variant="outlined"
                fullWidth
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
      <ItemList attendees={attendees} invalidate={invalidate}/>
    </FormContainer>
  );
};

export {Form};
