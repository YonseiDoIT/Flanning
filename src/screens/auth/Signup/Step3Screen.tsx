// @ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import fcolor from 'src/assets/colors/fcolors';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import FontAS5Icon from 'react-native-vector-icons/FontAwesome5';
import {launchImageLibrary} from 'react-native-image-picker';

import {useSignup} from './SignupProvider';
import globalStyles from 'src/assets/styles/globalStyles';
import BText from 'src/components/common/BText';
import MText from 'src/components/common/MText';
import {validateIntroduction, validateNickname} from 'src/utils/validators';
import RText from 'src/components/common/RText';
import {firestore} from 'src/utils/firebase';

const Step3Screen = () => {
  const {handleStepNext, signupData, setSignupData} = useSignup();
  const [nicknameError, setNicknameError] = useState('');
  const [isCheckNickname, setIsCheckNickname] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleChange = (field, value) => {
    setSignupData(prevData => ({
      ...prevData,
      step3: {
        ...prevData.step3,
        [field]: value,
        ...(field === 'nickname' && {nicknameVerify: false}),
      },
    }));
  };

  const validationNickname = async () => {
    setIsCheckNickname(true);
    setNicknameError('');

    try {
      const users = await firestore()
        .collection('users')
        .where('nickname', '==', signupData.step3.nickname)
        .get();

      if (!users.empty) {
        // 이미 가입된 닉네임
        setNicknameError('이미 가입된 닉네임입니다');
        setSignupData(prevData => ({
          ...prevData,
          step3: {
            ...prevData.step3,
            nicknameVerify: false,
          },
        }));
      } else {
        // 이미 가입된 닉네임
        setNicknameError('사용 가능한 닉네임입니다');
        setSignupData(prevData => ({
          ...prevData,
          step3: {
            ...prevData.step3,
            nicknameVerify: true,
          },
        }));
      }
    } catch (error) {
      // 이미 가입된 닉네임
      setNicknameError('닉네임 검증 중 오류가 발생했습니다');
      setSignupData(prevData => ({
        ...prevData,
        step3: {
          ...prevData.step3,
          nicknameVerify: false,
        },
      }));
    } finally {
      setIsCheckNickname(false);
    }
  };

  const validationNext = () => {
    const {nickname, introduction, nicknameVerify} = signupData.step3;
    return (
      nickname &&
      nicknameVerify &&
      validateNickname(nickname) &&
      validateIntroduction(introduction)
    );
  };

  const handleSelectImage = async () => {
    try {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 300,
        maxHeight: 300,
        quality: 0.8,
      });

      if (response.didCancel) {
        console.log('이미지 선택 취소');
      } else if (response.errorCode) {
        console.log(
          `이미지 선택 에러: ${response.errorCode}, ${response.errorMessage}`,
        );
      } else if (response.assets && response.assets.length > 0) {
        setSignupData(prevData => ({
          ...prevData,
          step3: {
            ...prevData.step3,
            userImage: response.assets[0].uri,
          },
        }));
      }
    } catch (error) {
      console.log('Image picker Exception error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, paddingHorizontal: 30}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Animated.View style={{flex: 1, opacity: fadeAnim}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <View style={{marginTop: 0, gap: 9}}>
              <BText>
                <BText color={fcolor.blue}>닉네임</BText>과{' '}
                <BText color={fcolor.blue}>사진</BText>을 설정해주세요
              </BText>
              <MText color={fcolor.gray3}>
                닉네임과 사진은 나중에 변경할 수 있어요
              </MText>
            </View>

            <View style={styles.infoContainer}>
              <View style={globalStyles.centered}>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={[globalStyles.centered, styles.userImageContainer]}
                  onPress={handleSelectImage}>
                  <View style={[globalStyles.centered, styles.userImage]}>
                    {signupData.step3.userImage ? (
                      <Image
                        source={{uri: signupData.step3.userImage}}
                        style={styles.imagePreview}
                        resizeMode="cover"
                      />
                    ) : (
                      <FontAS5Icon
                        name="user-alt"
                        size={36}
                        color={fcolor.gray2}
                      />
                    )}

                    <View style={[globalStyles.centered, styles.ImageEdit]}>
                      <FontAS5Icon name="pen" size={14} color={fcolor.white} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputGroup}>
                  <MText style={{marginHorizontal: 20, fontWeight: 700}}>
                    닉네임<MText color={fcolor.orange}>*</MText>
                  </MText>
                  <TextInput
                    style={styles.loginbox}
                    value={signupData.step3.nickname}
                    onChangeText={text => handleChange('nickname', text)}
                    placeholder={'닉네임을 입력해주세요'}
                    placeholderTextColor={fcolor.gray4}
                    onBlur={() => {
                      if (validateNickname(signupData.step2.nickname)) {
                        validationNickname();
                      } else {
                        setNicknameError(
                          '특수문자를 제외하고 최소 2자에서 10자 이내로 작성해주세요',
                        );
                      }
                    }}
                  />
                  {isCheckNickname ? null : nicknameError ? (
                    <RText
                      style={{marginHorizontal: 20}}
                      color={
                        nicknameError === '사용 가능한 닉네임입니다'
                          ? fcolor.lblue4
                          : fcolor.orange
                      }>
                      {nicknameError}
                    </RText>
                  ) : null}
                </View>
                <View style={styles.inputGroup}>
                  <MText style={{marginHorizontal: 20, fontWeight: 700}}>
                    한 줄 소개
                  </MText>
                  <TextInput
                    style={styles.loginbox}
                    value={signupData.step3.introduction}
                    onChangeText={text => handleChange('introduction', text)}
                    placeholder={'30자 이내로 작성해주세요'}
                    placeholderTextColor={fcolor.gray4}
                  />
                </View>
              </View>
            </View>

            <View
              style={{flex: 1, justifyContent: 'flex-end', marginBottom: 100}}>
              <TouchableOpacity
                style={[
                  globalStyles.buttonBase,
                  globalStyles.centered,
                  validationNext()
                    ? {backgroundColor: fcolor.blue}
                    : {backgroundColor: fcolor.gray4},
                ]}
                disabled={!validationNext()}
                onPress={handleStepNext}>
                <MText color={fcolor.white}>거의 다 왔어요</MText>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 40,
    marginBottom: 40,
    gap: 30,
  },
  inputContainer: {
    gap: 20,
  },
  userImageContainer: {
    position: 'relative',
  },
  userImage: {
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: fcolor.gray1,
  },
  inputGroup: {
    gap: 10,
  },
  loginbox: {
    height: 50,
    borderWidth: 1,
    borderColor: fcolor.gray1,
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: fcolor.gray1,
    zIndex: 0,
    pointerEvents: 'auto',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  ImageEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: fcolor.lblue4,
  },
  userInfo: {},
});

export default Step3Screen;
