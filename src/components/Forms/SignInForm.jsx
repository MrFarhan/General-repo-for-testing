import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import {
  CustomButton,
  CustomHeading,
  CustomTextfield,
  ValidationError,
} from '..';
// import Icons from '../../Themes/icons';
import { styles } from './Style';
import { useFormik } from 'formik';
import { signinInitialValues } from '../../Formik/initialValues';
import { signinSchema } from '../../Formik/schema';
import { signinUser } from '../../service/auth';
import Toast from 'react-native-toast-message';

const SignInForm = () => {
  const { navigate, reset } = useNavigation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loader, setLoader] = useState(false);

  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: signinInitialValues,
    validationSchema: signinSchema,
    onSubmit: async values => {
      try {
        setLoader(true);
        const result = await signinUser({
          username: values?.email,
          password: values?.password,
        });
        console.log("result", result)
        setLoader(false);
        if (result?.nextStep?.signInStep == 'CONFIRM_SIGN_UP') {
          navigate('Otp', { ...values, type: result?.nextStep?.signInStep });
        } else if (
          result?.nextStep?.signInStep == 'DONE' &&
          result?.isSignedIn
        ) {
          reset({ index: 0, routes: [{ name: 'Main' }] });
          // navigate('Main');
        }
      } catch (error) {
        setLoader(false);
        console.log("error ", error)
        Toast.show({
          type: 'error',
          text1: error?.message || 'Something went wrong',
        });
      }
    },
  });

  const isFocus = useIsFocused();

  useEffect(() => {
    resetForm();
  }, [isFocus]);


  return (
    <View>
      <CustomHeading text={'Sign In'} headingStyle={styles.heading} />
      <View style={styles.inputContainer}>
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
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          customStyle={{ color: "black", width: "85%" }}
          secureTextEntry={secureTextEntry}

        />
        {!!errors.password && touched.password && (
          <ValidationError errorMessage={errors.password} />
        )}
        <Text
          onPress={() => navigate('Forgot-password')}
          style={styles.forgotPassword}>
          Forgot password
        </Text>
      </View>
      <CustomButton text={'Sign In'} onPress={handleSubmit} loader={loader} />
    </View>
  );
};

export default SignInForm;
