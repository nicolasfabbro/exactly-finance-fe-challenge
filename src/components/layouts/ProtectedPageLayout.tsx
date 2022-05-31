import { FC, ReactNode } from 'react';
import { Unauthorized } from '../unauthorized';

type Props = {
  canAccess: boolean;
  children?: ReactNode;
};

export const ProtectedPageLayout: FC<Props> = ({ canAccess, children }) => {
  if (!canAccess) return <Unauthorized />

  return (
    <>{children}</>
  )
}
