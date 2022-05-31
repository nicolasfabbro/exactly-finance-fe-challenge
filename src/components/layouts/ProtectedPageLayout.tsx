import { FC, ReactNode } from 'react';

type Props = {
  canAccess: boolean;
  children?: ReactNode;
};

export const ProtectedPageLayout: FC<Props> = ({ canAccess, children }) => {
  if (!canAccess) return <h1>You don't have permissions to see this content</h1>

  return (
    <>{children}</>
  )
}
