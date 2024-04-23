'use client';

import loginRequest from '@/apis/login';
import { useAppContext } from '@/app/AppProvider';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { LoginBody, LoginBodyType } from '@/schemaValidations/login.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();

  const { setAccessToken } = useAppContext();

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginBodyType) => {
    try {
      const result = await loginRequest.login(values);
      toast({
        description: 'Login successfully',
      });
      setAccessToken(result.payload.access_token);
      router.push('/project');
    } catch (error: any) {
      toast({
        description: 'Login failed',
        variant: 'destructive',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2 max-w-[400px] w-full'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Nhập email' type='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder='Nhập mật khẩu' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full !mt-5'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
