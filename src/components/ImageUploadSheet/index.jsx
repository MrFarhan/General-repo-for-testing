import React, { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import { openCamera, openPicker } from 'react-native-image-crop-picker';
import { styles } from './style';
import { CustomButton } from '..';
import { Icons, colors, images } from '../../Themes';
import { useIsFocused } from '@react-navigation/native';
const ImageUploadSheet = ({ setPic, pic }) => {
  const actionSheetRef = useRef();
  const [loadingState, setLoadingState] = useState({
    takePhoto: false,
    uploadPhoto: false,
  });
  const [image, setImage] = useState(null);
  const isFocus = useIsFocused()
  useEffect(() => {
    FastImage.clearDiskCache();
    FastImage.clearMemoryCache();
  }, [isFocus])
  const openActionSheet = () => {
    actionSheetRef.current.show();
  };
  const propCropImagePicker = {
    cropping: true,
    mediaType: 'photo',
    compressImageQuality: 1,
  };
  const takePhoto = () => {
    setLoadingState({ ...loadingState, takePhoto: true });
    openCamera(propCropImagePicker)
      .then(async image => {
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        setPic({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        actionSheetRef.current.hide();

      })
      .catch(err => {
        console.log('img upload err:', err);
        setLoadingState({ ...loadingState, takePhoto: false });
      });
  };

  const choosePhoto = async () => {
    setLoadingState({ ...loadingState, uploadPhoto: true });
    openPicker(propCropImagePicker)
      .then(async image => {
        setImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        setPic({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
        actionSheetRef.current.hide();

      })
      .catch(err => {
        console.log('img upload 2 err:', err);
        setLoadingState({ ...loadingState, uploadPhoto: false });
      });
  };
  return (
    <View>
      <Pressable style={styles.profileImageContainer} onPress={openActionSheet}>
        <FastImage
          style={styles.profileImage}
          source={

            image ? image : pic ? { uri: pic } : images.product_image
          }
          resizeMode={FastImage.resizeMode.contain}
          alt="profile"
        />
        <View style={styles.cameraIconContainer}>
          <View style={styles.profileIconStyle}>
            <Icons.Entypo name="camera" size={22} color={colors.black} style={{ padding: 5 }} />
          </View>
        </View>
      </Pressable>
      <ActionSheet ref={actionSheetRef}>
        <View style={styles.optionListContainer}>
          <View style={{ marginBottom: 25 }}>
            <CustomButton
              text="Capture Photo"
              width={'100%'}
              onPress={takePhoto}
              disable={loadingState.takePhoto}
              loader={loadingState.takePhoto}
            />
          </View>
          <View>
            <CustomButton
              text="Choose Photo"
              width={'100%'}
              onPress={choosePhoto}
              disable={loadingState.uploadPhoto}
              loader={loadingState.uploadPhoto}
            />
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};

export default ImageUploadSheet;
