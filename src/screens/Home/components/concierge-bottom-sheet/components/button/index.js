import { Pressable, View } from 'react-native'
import { styles } from './styles'
import { CustomText } from '../../../../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

export const Button = ({
    onPress,
    title,
    customStyle,
    backgroundColor,
    color,
    borderColor,
    type = 'Pill',
    disabled = false,
    icon,
}) => {
    const handlePress = () => {
        if (disabled) {
            return
        } else {
            onPress()
        }
    }

    return (
        <View
            style={{
                ...styles({ color, backgroundColor, type, borderColor, disabled }).button,
                ...customStyle,
            }}
        >
            <Pressable style={styles({ type }).pressable} onPress={handlePress}>
                {icon && type === 'Pill' && (
                    <FontAwesomeIcon icon={icon} size={icon === faWhatsapp ? 17 : 16} color={color} />
                )}
                <CustomText
                    customStyle={{
                        ...styles({ color, backgroundColor, type }).text,
                    }}
                    fontWeight="bold"
                    type="display"
                >
                    {title}
                </CustomText>
                {icon && type === 'Rounded' && (
                    <FontAwesomeIcon icon={icon} size={12} color={color} />
                )}
            </Pressable>
        </View>
    )
}
