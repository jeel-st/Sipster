import { View } from 'react-native';
import { Games } from '../components';
import { classNames } from '../utils';

export default function Tab() {
  return (
    <View className={classNames(
      'flex-1',
      'bg-primary'
    )}>
      <Games />
    </View>
  );
}