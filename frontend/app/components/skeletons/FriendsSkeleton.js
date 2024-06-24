import { Center, Skeleton, VStack, HStack } from 'native-base';
import { styles } from '../../constants';
import React from 'react'

/*
    FriendsSkeleton is a component that represents the skeleton of the friends page.
    It displays a skeleton of the friends page.
    Typ: Component from skeletons

    @return: JSX -> returns the FriendsSkeleton component
*/
export default function FriendsSkeleton() {
    return (
        <Center w="100%" mt={5} ml={8}>
            <HStack space="2">
                <VStack space="2" alignItems="center" >
                    <Skeleton h="100" w="100" rounded="80" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                    <Skeleton.Text w="70" lines={1} alignItems="center" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                </VStack>
                <VStack space="2" alignItems="center" >
                    <Skeleton h="100" w="100" rounded="80" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                    <Skeleton.Text w="70" lines={1} alignItems="center" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                </VStack>
                <VStack space="2" alignItems="center" >
                    <Skeleton h="100" w="100" rounded="80" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                    <Skeleton.Text w="70" lines={1} alignItems="center" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                </VStack>
                <VStack space="2" alignItems="center" >
                    <Skeleton h="100" w="100" rounded="80" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                    <Skeleton.Text w="70" lines={1} alignItems="center" startColor={styles.Colors.primary} endColor={styles.Colors.secondary} />
                </VStack>
            </HStack>
        </Center>
    )
}