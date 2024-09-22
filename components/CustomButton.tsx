import { ButtonProps } from '@/types/type';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { icons } from '@/constants';
const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
  switch (variant) {
    case 'secondary':
      return styles.bgSecondary;
    case 'danger':
      return styles.bgDanger;
    case 'success':
      return styles.bgSuccess;
    case 'outline':
      return styles.bgOutline;
    default:
      return styles.bgPrimary;
  }
};

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
  switch (variant) {
    case 'primary':
      return styles.textPrimary;
    case 'secondary':
      return styles.textSecondary;
    case 'danger':
      return styles.textDanger;
    case 'success':
      return styles.textSuccess;
    default:
      return styles.textDefault;
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = 'primary',
  textVariant = 'default',
  Icon,
  className,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button]} {...props}>
      <Text style={[styles.text, getTextVariantStyle(textVariant)]}>{title}</Text>
      <Image style={styles.icon} source={Icon} />
      <Image style={styles.icons} source={icons.Arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '75%',
    borderRadius: 9999, // rounded-full
    padding: 10, // p-3
    flexDirection: 'row', // flex flex-row
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // shadow-md shadow-neutral-400/70
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    backgroundColor: '#B5ACA2',
    shadowRadius: 3,
    height: 70,
    elevation: 2, // Shadow for Android
    paddingLeft: 25,
  },
  gradient: {
    flex: 1,
    padding: 20, // Same padding as button for inner content
    borderRadius: 9999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgPrimary: {
    backgroundColor: '#808080', // bg-gray-500
  },
  bgSecondary: {
    backgroundColor: '#808080', // bg-gray-500
  },
  bgDanger: {
    backgroundColor: '#ff0000', // bg-red-500
  },
  bgSuccess: {
    backgroundColor: '#008000', // bg-green-500
  },
  bgOutline: {
    backgroundColor: 'transparent',
    borderColor: '#d4d4d4', // border-neutral-300
    borderWidth: 0.5,
  },
  text: {
    fontSize: 18, // text-lg
    fontWeight: 'bold',
    width: '90%',
    textAlign: 'left',
    paddingLeft: 30,
  },
  textPrimary: {
    color: '#000000', // text-black
  },
  textSecondary: {
    color: '#f5f5f5', // text-gray-100
  },
  textDanger: {
    color: '#ffcccc', // text-red-100
  },
  textSuccess: {
    color: '#ccffcc', // text-green-100
  },
  textDefault: {
    color: '#ffffff', // text-white
  },
  icon: {
    position: 'relative',
    top: 3,
    left: 45,
    zIndex: 0,
  },
  icons: {
    marginRight: 12,
  },
});

export default CustomButton;
