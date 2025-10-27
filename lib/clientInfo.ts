import { headers } from 'next/headers';

export const getClientInfo = async () => {
  const headersList = await headers();
  return {
    ip: headersList.get('x-forwarded-for') || '',
    userAgent: headersList.get('user-agent') || ''
  };
};

export const getClientInfoClientSide = () => {
  // This will only work client-side
  return {
    ip: '',
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : ''
  };
};
