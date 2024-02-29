import { AiOutlineLoading } from 'react-icons/ai';

export default function PageLoader() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className=''>
        <AiOutlineLoading className='animate-spin text-accent' size={'64px'} />
      </div>
    </div>
  );
}
