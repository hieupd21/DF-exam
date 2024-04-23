'use client';

import { useAppContext } from '@/app/AppProvider';
import envConfig from '@/config';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Page() {
  const { accessToken } = useAppContext();
  const [data, setData] = useState<any>([]);

  const getProject = async () => {
    if (accessToken) {
      await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/projects`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(async (response) => {
        const payload = await response.json();
        setData(payload.results);
      });
    }
  };

  useEffect(() => {
    getProject();
  }, [accessToken]);

  return (
    <div className='container'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>License</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((d: any) => (
            <TableRow key={d.id}>
              <TableCell>{d.id}</TableCell>
              <TableCell>{d.project_domain}</TableCell>
              <TableCell>{d.project_name}</TableCell>
              <TableCell>
                {d.license_use.map((x: any, index: number) => (
                  <p key={index}>
                    {x.license_type} - {x.libraries.join(', ')}
                  </p>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
