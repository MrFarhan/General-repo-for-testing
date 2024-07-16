import {
  signUp,
  signIn,
  signOut,
  fetchAuthSession,
  confirmSignUp,
  confirmResetPassword,
  updatePassword,
} from 'aws-amplify/auth';
import { resetPassword } from 'aws-amplify/auth';
import { patch, get, post } from 'aws-amplify/api';
import { uploadData, getUrl } from 'aws-amplify/storage';


export const signupUser = async values => {
  const { email, password, name, country, currency } = values || {};
  try {
    const user = await signUp({
      username: email,
      password,
      options: {
        userAttributes: {
          'custom:name': name,
          'custom:country': country,
          'custom:currency': currency,
        },
      },
      autoSignIn: {
        enabled: true,
      },
    });
    return { success: true, data: user };
  } catch (error) {
    throw error;
  }
};

export const signinUser = async values => {
  const { password, username } = values || {};
  try {
    const newRes = await signIn({ username, password });
    return newRes;
  } catch (error) {
    throw error;
  }
};

export const getUserAuthDetails = async () => {
  try {
    const session = await fetchAuthSession({ forceRefresh: true }).catch(x => { console.log("catch x on get auth details") });

    return {
      success: true,
      data: {
        ...session,
        userId: session?.userSub,
        token: session?.tokens?.accessToken?.toString() || "",
      },
    };
  } catch (err) {
    return { success: false, error: err };
  }
};


export const forgotPassword = async username => {
  try {
    const { nextStep } = await resetPassword({ username });
    const { codeDeliveryDetails, resetPasswordStep } = nextStep || {};
    if (resetPasswordStep === 'CONFIRM_RESET_PASSWORD_WITH_CODE') {
      return {
        success: true,
        message: `Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`,
      };
    } else if (resetPasswordStep === 'DONE') {
      return {
        success: true,
        message: `Successfully reset password.`,
      };
    }
  } catch (error) {
    console.log(`Forgot password catch : ${error}`);
    throw error;
  }
};

export const changePassword = async ({ username, code, password }) => {
  try {
    const confirmPassword = await confirmResetPassword({
      username,
      confirmationCode: code,
      newPassword: password,
    });

    return {
      success: true,
      data: confirmPassword,
      message: 'Password changed successfully',
    };
  } catch (error) {
    console.log(`changePassword catch : ${error}`);
    throw error;
  }
};

export const updateUser = async props => {

  let token = props?.token;
  let userId = props?.userId

  if (!token) {
    const session = await fetchAuthSession({ forceRefresh: true });
    userId = session?.userSub;
    token = session.tokens.accessToken?.toString()
  }

  const restOperation = patch({
    apiName: 'myapiname',
    path: `/user/${userId}`,
    options: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: props,
    },
  });

  const { body } = await restOperation.response;
  const response = await body.json();

  return {
    success: true,
    data: response,
  };
};

export const handleOtp = async props => {
  const { type, username, code, password } = props || {};
  try {
    if (type == 'CONFIRM_SIGN_UP') {
      const data = await confirmSignUp({
        username,
        confirmationCode: code,
      });
      if (password?.length) {
        await signinUser({
          username,
          password,
        });
      }
      return { success: true, result: data };
    }
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  const res = await signOut({ global: true });
  return res;
};

export const updatePasswordFunc = async ({ oldPassword, newPassword }) => {
  try {
    const updatePasswordResult = await updatePassword({
      oldPassword,
      newPassword,
    });

    return {
      success: true,
      data: updatePasswordResult,
      message: 'Password changed successfully',
    };
  } catch (error) {
    console.log(`Forgot password catch : ${error}`);
    throw error;
  }
};

