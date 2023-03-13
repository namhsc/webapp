import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function EmptyLayout({ children }: Props) {
  return <>{children}</>;
}
