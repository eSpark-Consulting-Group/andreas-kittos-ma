import {api} from '../../../api';

interface EmailLink {
  to: string;
}

interface ResetPass {
  password: string;
  token: string;
}

interface ResponseSendLink {
  status: boolean;
  message: string;
  data: null;
}

interface ResponseResetPass {
  status: boolean;
  message: string;
  data: null;
}

const handleSendLink = async (req: EmailLink): Promise<{status: boolean}> => {
  console.log('req', req);
  try {
    const response = await api.post<ResponseSendLink>(
      '/user/password-reset-email-link',
      {
        ...req,
      },
    );
    if (response.data?.status) {
      return {status: true};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

const handleResetPass = async (req: ResetPass): Promise<{status: boolean}> => {
  console.log('req', req);
  try {
    const response = await api.put<ResponseResetPass>('/user/password-reset', {
      ...req,
    });
    if (response.data?.status) {
      return {status: true};
    } else {
      return {status: false};
    }
  } catch (error) {
    console.log('error', error);
    return {status: false};
  }
};

export {handleSendLink, handleResetPass};
