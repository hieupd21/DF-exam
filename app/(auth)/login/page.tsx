import LoginForm from './form';

const Page = () => {
  return (
    <div>
      <h1 className='text-3xl font-semibold text-center'>Login</h1>
      <div className='flex justify-center'>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
