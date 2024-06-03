import { View, TouchableOpacity, Text } from 'react-native'
import { FontAwesome, AntDesign, MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { classNames } from '../../utils'
import { SafeAreaView } from 'react-native-safe-area-context'
import useProfileHeaderButton from '../../utils/hooks/useProfileHeaderButton'
import ProfileStagger from './ProfileStagger'
import ProfileInviteBtn from './ProfileInviteBtn'

/*
    ProfileHeaderButtons is a component that represents the header buttons in the profile page.
    It displays a back button, a settings button, and an invite button.
    Typ: Component from profile

    @param friend: object -> the friend to display
    @return:       JSX -> returns the ProfileHeaderButtons component
*/
export default function ProfileHeaderButtons({ friend }) {
    const { isFriend, isInvited, removeFriendHandler, inviteFriendHandler, closeInviteHandler, isOpen, onToggle } = useProfileHeaderButton(friend);

    return (
        <View className={classNames('z-20')}>
            <SafeAreaView className={classNames(
                'absolute flex-row justify-between items-center', // position
                'px-4', // spacing
                'w-full mt-[-16px]', // sizing
            )}>
                {/* Back Button*/}
                <TouchableOpacity onPress={() => router.back()}>
                    <View className={classNames(
                        'justify-center items-center', // position
                        'pr-1', // spacing
                        'w-10 h-10', // sizing
                        'rounded-xl bg-secondary', // styling
                    )}>
                        <FontAwesome name="chevron-left" size={24} color="white" />
                    </View>
                </TouchableOpacity>

                <View className={classNames(
                    'flex-row justify-between items-center', // position
                    'space-x-2' // spacing
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
