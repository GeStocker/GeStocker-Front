"use client";
import { routes } from '@/routes/routes';
import { usePathname } from 'next/navigation';
import React from 'react'

interface VisibleWrapperProps {
    children: React.ReactNode
  }
const hidePages = [routes.login, routes.register]

export const VisibleWrapperNavbar: React.FC<VisibleWrapperProps>= ({children}) => {
    const pathname= usePathname();

    if(hidePages.includes(pathname)){
        return null;
    }

  return (
    <div>{children}</div>
  )
}

const hidePagesFooter = [routes.login, routes.register]

export const VisibleWrapperFooter: React.FC<VisibleWrapperProps>= ({children}) => {
    const pathname= usePathname();

    if(hidePagesFooter.includes(pathname)){
        return null;
    }

  return (
    <div>{children}</div>
  )
}