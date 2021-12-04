import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  findNodeHandle,
  View,
} from 'react-native';
import {useRef} from 'react/cjs/react.development';

const {width, height} = Dimensions.get('screen');
const images = {
  man: 'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids: 'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help: 'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};
const data = Object.keys(images).map(i => ({
  key: i,
  title: i,
  image: images[i],
  ref: createRef(),
}));

export default function TabBar() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const ref = useRef();
  const onItemPress = useCallback(itemIndex => {
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });

  const Indicator = ({measures, scrollX}) => {
    const inputRange = data.map((_, i) => i * width);

    const indicatorWidth = scrollX?.interpolate({
      inputRange,
      outputRange: measures.map(measure => measure.width),
    });

    const translateX = scrollX?.interpolate({
      inputRange,
      outputRange: measures.map(measure => measure.x),
    });

    return (
      <Animated.View
        style={[
          styles.indicator,
          {
            width: indicatorWidth,
            transform: [{translateX}],
          },
        ]}
      />
    );
  };

  const Tab = forwardRef(({item, onItemPress}, ref) => {
    return (
      <TouchableOpacity onPress={onItemPress}>
        <View ref={ref}>
          <Text
            style={{
              color: 'white',
              fontSize: 84 / data.length, // 84 is the height of the tab bar and important
              fontWeight: '800',
              textTransform: 'uppercase',
            }}>
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  });

  const Tabs = ({data, scrollX, onItemPress}) => {
    const containerRef = useRef();
    const [measures, setMeasures] = useState([]);
    useEffect(() => {
      let m = [];
      data.forEach(item => {
        item?.ref?.current?.measureLayout(
          containerRef.current,
          (x, y, width, height, pageX, pageY) => {
            m.push({x, y, width, height});
            if (m.length === data.length) {
              setMeasures(m);
            }
          },
        );
      });
    }, []);

    return (
      <View style={styles.tabsContainer}>
        <View style={styles.dataContainer} ref={containerRef}>
          {data.map((item, index) => {
            return (
              <Tab
                key={item.key}
                ref={item.ref}
                item={item}
                onItemPress={() => onItemPress(index)}
              />
            );
          })}
          {measures.length > 0 && (
            <Indicator measures={measures} scrollX={scrollX} />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ],
          {useNativeDriver: false},
        )}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return (
            <View style={styles.imageContainer}>
              <Image source={{uri: item.image}} style={styles.image} />
              <View
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: 'rgba(0,0,0,0.3)'},
                ]}
              />
            </View>
          );
        }}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageContainer: {
    width,
    height,
  },
  tabsContainer: {
    position: 'absolute',
    top: 100,
    width,
  },
  dataContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  indicator: {
    position: 'absolute',
    height: 4,
    backgroundColor: 'white',
    bottom: -10,
    left: 0,
  },
});
