import { View, Text } from 'react-native'
import { Center, NativeBaseProvider, Skeleton, VStack } from "native-base";
import { styles } from '../../constants';
import React from 'react'

/*
    FriendsH2Skeleton is a component that represents the skeleton of the friends page.
    It displays a skeleton of the friends page.
    Typ: Component from skeletons

    @return: JSX -> returns the FriendsH2Skeleton component
*/
export default function FriendsH2Skeleton() {
    return (
        <Center w="100%" className="mt-[15px]">
            <VStack w="100%" maxW="400" borderWidth="0" space={8} overflow="hidden" rounded="md" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }}>
                <Skeleton h="81" rounded="81" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                <Skeleton h="81" rounded="81" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                <Skeleton h="81" rounded="81" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                <Skeleton h="81" rounded="81" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                <Skeleton h="81" rounded="81" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
            </VStack>
        </Center>
    )
}