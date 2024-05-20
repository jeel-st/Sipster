import { View, TouchableOpacity, Text } from 'react-native'
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { classNames } from '../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import useProfileHeaderButton from '../../utils/hooks/useProfileHeaderButton'
import ProfileStagger from './ProfileStagger'
import ProfileInviteBtn from './ProfileInviteBtn'

export default function ProfileHeaderButtons({ friend }) {
    const { isFriend, isInvited, removeFriendHandler, inviteFriendHandler, closeInviteHandler, isOpen, onToggle } = useProfileHeaderButton(friend);

    return (
        <View className={classNames('z-20')}>
            <SafeAreaView className={classNames(
                'absolute flex-row justify-between items-center',
                'px-4',
                'w-full mt-[-16px]',
            )}>
                {/* Back Button*/}
                <TouchableOpacity onPress={() => router.back()}>
                    <View className={classNames(
                        'justify-center items-center',
                        'pr-1',
                        'w-10 h-10',
                        'rounded-xl bg-secondary',
                    )}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                <View className={classNames(
                    'flex-row justify-between items-center',
                    'space-x-2'
                )}>
                    <ProfileInviteBtn
                        isInvited={isInvited}
                        isFriend={isFriend}
                        closeInviteHandler={closeInviteHandler}
                        inviteFriendHandler={inviteFriendHandler}
                        removeFriendHandler={removeFriendHandler}
                    />

                    {/* Settings Button*/}
                    <TouchableOpacity onPress={() => console.log("Profile Settings Button")} className="w-10 h-10">
                        {<ProfileStagger isOpen={isOpen} onToggle={onToggle} />}
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </View>
    );
}
