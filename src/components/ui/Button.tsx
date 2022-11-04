import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base'

interface IButton extends IButtonProps {
  title: string
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ title, type = 'PRIMARY', ...rest }: IButton) {
  return (
    <ButtonNativeBase
      {...rest}
      w='full'
      h={14}
      rounded={'sm'}
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.700' : 'yellow.700'
      }}
      _loading={{
        _spinner: { color: 'black' }
      }}>
      <Text
        textTransform={'uppercase'}
        fontSize='sm'
        fontFamily={'heading'}
        color={type === 'SECONDARY' ? 'white' : 'black'}>
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
