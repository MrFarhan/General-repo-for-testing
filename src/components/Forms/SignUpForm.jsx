import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  CurrencyDropDown,
  CustomButton,
  CustomHeading,
  CustomTextfield,
  LocationDropDown,
  ValidationError,
} from '..';
import Icons from '../../Themes/icons';
import { styles } from './Style';
import { useFormik } from 'formik';
import { signupInitialValues } from '../../Formik/initialValues';
import { signupSchema } from '../../Formik/schema';
import Toast from 'react-native-toast-message';
import { signupUser } from '../../service/auth';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const SignUpForm = ({ isFocus }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [loader, setLoader] = useState(false);
  const { navigate } = useNavigation();
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    handleSubmit,
    setFieldValue,
    resetForm,
    setErrors,
    setTouched,
  } = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    onSubmit: async values => {
      try {
        setLoader(true);

        const { success } = await signupUser(values);
        setLoader(false);
        if (success) {
          setLoader(false);
          Toast.show({
            type: 'success',
            text1: 'Signedup successfully!',
            text2: 'Verification code sent to email.!',
          });
          let values1 = JSON.parse(JSON.stringify({ ...values }));
          resetForm();
          setTouched({}, false);
          setErrors({});
          navigate('Otp', { ...values1, type: 'CONFIRM_SIGN_UP' });
        }
      } catch (err) {
        console.log('signup err:', err);
        setLoader(false);
        Toast.show({
          type: 'error',
          text1: err?.error?.message || err?.message || 'Something went wrong',
        });
      }
    },
  });


  return (
    <View>
      <CustomHeading text={'Sign Up'} headingStyle={styles.heading} />
      <View style={styles.inputContainer}>
        <CustomTextfield
          placeholder="Name"
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          customStyle={{ color: "black", width: "100%" }}
        />
        {!!errors.name && touched.name && (
          <ValidationError errorMessage={errors.name} />
        )}
        <CustomTextfield
          placeholder="Email"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          customStyle={{ color: "black", width: "100%" }}
        />
        {!!errors.email && touched.email && (
          <ValidationError errorMessage={errors.email} />
        )}
        <CustomTextfield
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          customStyle={{ color: "black", width: "85%" }}
          EndAdornment={
            <Icons.Feather
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setSecureTextEntry(prev => !prev)}
            />
          }
        />
        {!!errors.password && touched.password && (
          <ValidationError errorMessage={errors.password} />
        )}
        <CustomTextfield
          placeholder="Confirm Password"
          onChangeText={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          value={values.confirmPassword}
          secureTextEntry={secureTextEntry2}
          customStyle={{ color: "black", width: "85%" }}
          EndAdornment={
            <Icons.Feather
              name={secureTextEntry2 ? 'eye-off' : 'eye'}
              size={20}
              onPress={() => setSecureTextEntry2(prev => !prev)}
            />
          }
        />
        {!!errors.confirmPassword && touched.confirmPassword && (
          <ValidationError errorMessage={errors.confirmPassword} />
        )}


      </View>
      <CustomButton text={'Sign Up'} onPress={handleSubmit} loader={loader} />
    </View>
  );
};

export default SignUpForm;
