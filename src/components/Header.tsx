import React from 'react';
import styled from 'styled-components';

type ComponentProps = {
  children: React.ReactNode;
};

export default function Header({ children }: ComponentProps) {
  return <Title>{children}</Title>;
}

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
`;
