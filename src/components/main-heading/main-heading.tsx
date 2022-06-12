import React, { ReactNode } from 'react'
import { Heading } from '@chakra-ui/react'

const MainHeading: React.FC<MainHeadingProps> = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Heading data-testid="main-heading" {...props}>
    {children}
  </Heading>
)

export interface MainHeadingProps {
  children?: ReactNode
}

export default MainHeading
