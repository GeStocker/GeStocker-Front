import React from 'react'

const StepCard: React.FC<{title: string, description: string}> = ({title, description}) => {
  return (
    <div className='flex flex-col gap-1 justify-around bg-background container min-h-28 h-fit w-full md:w-[26rem] rounded-md px-6 py-3 border'>
        <h3 className='text-lg md:text-xl font-bold text-left'>{title}</h3>
        <p className='text-sm md:text-base text-custom-textSubtitle text-left'>{description}</p>
    </div>
  )
}

export default StepCard