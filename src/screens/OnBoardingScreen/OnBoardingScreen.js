import React from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { images, COLORS, SIZES, FONTS } from '../../constants';

const { onboarding1, onboarding2, onboarding3 } = images;

const dummyData = [
  {
    title: "Let's Traveling",
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptatibus quos voluptates.',
    img: onboarding1,
  },
  {
    title: "Let's Traveling",
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptatibus quos voluptates.',
    img: onboarding2,
  },
  {
    title: "Let's Traveling",
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi voluptatibus quos voluptates.',
    img: onboarding3,
  },
];

const OnBoardingScreen = () => {
  const scrollX = new Animated.Value(0);

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {dummyData.map((item, index) => (
          <View key={index} style={{ width: SIZES.width }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: '10%',
                left: 40,
                right: 40,
              }}
            >
              <Text
                style={{
                  ...FONTS.h1,
                  color: COLORS.gray,
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.h3,
                  color: COLORS.gray,
                  marginTop: SIZES.base,
                  textAlign: 'center',
                }}
              >
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {dummyData.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              opacity={opacity}
              k
              key={index}
              style={[
                styles.dot,
                { width: dotSize, height: dotSize },
              ]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '30%' : '20%',
    left: '50%',
    transform: [{ translateX: -50 }],
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
});

export default OnBoardingScreen;
