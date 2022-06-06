import { Button, useColorMode, ButtonProps } from '@chakra-ui/react'
import React from 'react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ModeButton: React.FC<ButtonProps> = ({ ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button onClick={toggleColorMode} p="8px" {...props} aria-label="mode-button">
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}

export default ModeButton
