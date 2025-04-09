
import BusinessProducts from '@/views/Superadmin/BusinessProducts/BusinessProducts';
import React from 'react'
const BusinessProductsPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = React.use(params);

    return <BusinessProducts businessId={id} />;
  };
  
  export default BusinessProductsPage;