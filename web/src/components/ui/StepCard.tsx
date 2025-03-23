import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className='flex flex-col gap-3 bg-white h-fit md:h-48 w-full md:w-96 rounded-md items-center p-5'>
        <div className='border rounded-full p-1 bg-custom-GrisOscuro'>
            {icon}
        </div>
        <h3 className='text-xl font-bold'>{title}</h3>
        <p className='text-lg text-custom-textSubtitle text-center'>{description}</p>
    </div>
  );
};

export default StepCard;
