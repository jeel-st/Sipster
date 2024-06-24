import { Box, Center, HStack, Icon, IconButton, Stagger } from 'native-base'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

export default function ProfileStagger({ isOpen, onToggle }) {
    return (
        <Center position="absolute">
            <Box alignItems="center" minH="220">
                <HStack alignItems="center">
                    <IconButton variant="solid" borderRadius="xl" size="10" onPress={onToggle} bg="#242424" icon={<Icon as={MaterialCommunityIcons} size="6" name="dots-horizontal" />} />
                </HStack>

                <Stagger visible={isOpen} initial={{
                    opacity: 0,
                    scale: 0,
                    translateY: 34
                }} animate={{
                    translateY: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                        type: "spring",
                        mass: 0.8,
                        stagger: {
                            offset: 30
                        }
                    }
                }} exit={{
                    translateY: 34,
                    scale: 0.5,
                    opacity: 0,
                    transition: {
                        duration: 100,
                        stagger: {
                            offset: 30
                        }
                    }
                }}>
                    <IconButton mt="4" variant="solid" bg="#DFFA54" borderRadius="xl" icon={<Icon as={MaterialCommunityIcons} size="5" name="microphone" color="black" />} />
                    <IconButton mt="4" variant="solid" bg="#DFFA54" borderRadius="xl" icon={<Icon as={MaterialCommunityIcons} size="5" name="video" color="black" />} />
                    <IconButton mt="4" variant="solid" bg="#DFFA54" borderRadius="xl" icon={<Icon as={MaterialIcons} size="5" name="photo-library" color="black" />} />
                </Stagger>
            </Box>
        </Center>
    )
}