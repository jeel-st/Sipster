import { View, Image, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import { classNames } from '../../utils'
import { fetchProfilePicture, fetchProfilePictureCompressed } from '../../utils/database/imageFetcher'
import { RefreshContext } from '../provider/RefreshProvider'

const windowWidth = Dimensions.get('window').width

export default function HomeActivityImage({ friend }) {
    const [imageLoaded, setImageLoaded] = useState(false)

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    const refreshDate = useContext(RefreshContext)

    return (
        <View style={{
            height: '100%',
            // windowWidth without margin border
            width: windowWidth - 48,
            resizeMode: 'cover',
        }}>
            <Image
                source={{ uri: fetchProfilePicture(friend, refreshDate) }}
                style={{ width: '100%', height: '100%', opacity: imageLoaded ? 1 : 0, position: 'absolute', zIndex: 20 }}
                className={classNames('rounded-2xl')}
            />
            <Image
                source={{ uri: fetchProfilePictureCompressed(friend, refreshDate) }}
                style={{ width: '100%', height: '100%' }}
                onLoadEnd={handleImageLoad}
                className={classNames('rounded-2xl')}
            />
        </View>
    )
}
