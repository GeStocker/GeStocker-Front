import UserBusiness from '@/views/Superadmin/UserBusiness/UserBusiness';
import React from 'react'
const UserBusinessPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);

    return <UserBusiness userId={id} />;
  };
  
  export default UserBusinessPage;