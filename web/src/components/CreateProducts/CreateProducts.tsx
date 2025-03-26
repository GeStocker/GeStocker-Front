
import { useAuth } from '@/context/AuthContext'
import { getBusiness } from '@/services/user/business'
import { getAllCategories } from '@/services/user/category'
import { ICategory } from '@/types/interface'
import React, { useEffect, useState } from 'react'

const CreateProducts = () => {
    // const {token} = useAuth()
    // const [categories, setCategories] = useState<ICategory[]>()

    // const fetchCategories = async () => {
    //     const business= await getBusiness(token ?? "")
    //     const categories = await getAllCategories(business[0].id);
    //     setCategories(categories);
    // }

    // useEffect(()=>{
    //     fetchCategories()
    // },[categories])
  return (
    <div>
        {/* <div>{categories?.map((category)=><span key={category.id}>{category.name}</span>)}</div> */}
    </div>
  )
}

export default CreateProducts