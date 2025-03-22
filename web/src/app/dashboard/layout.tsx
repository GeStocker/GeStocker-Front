import SideBar from '@/components/SideBar/SideBar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
       <SideBar/>
      <div className='w-full'>{children}</div>
    </div>
  );
}
