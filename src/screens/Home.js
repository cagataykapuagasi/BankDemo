import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import { NavigationBar, Bar, CreditCard } from '../components';

const opacity = new Animated.Value(1);

const cards = [
  {
    key: '1',
    type: 'mastercard',
    name: 'Platinium',
    lastNumbers: 1211,
    color: 'blue',
    cash: '5,990',
    spent: 70,
  },
  {
    key: '2',
    type: 'visa',
    name: 'Premium',
    selected: true,
    lastNumbers: 1412,
    color: 'skyblue',
    cash: '3,990',
    spent: 75,
  },
  {
    key: '3',
    type: 'visa',
    name: 'Business',
    lastNumbers: 1310,
    color: 'limegreen',
    cash: '4,990',
    spent: 55,
  },
];

const history = [
  {
    companyName: 'Uber',
    date: '14 Feb 2020',
    sending: false,
    price: 99.9,
    logo:
      'https://cdn.mos.cms.futurecdn.net/5ij5qdSHFzJ2piPRuoTL5F-1200-80.jpg',
  },
  {
    companyName: 'Aden Joe',
    date: '14 Feb 2020',
    sending: true,
    price: 23.2,
    logo:
      'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg',
  },
  {
    companyName: 'Elena Garbiel',
    date: '14 Feb 2020',
    sending: true,
    price: 149,
    logo:
      'https://image.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg',
  },
  {
    companyName: 'Spotify',
    date: '14 Feb 2020',
    sending: false,
    price: 150,
    logo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1200px-Spotify_logo_without_text.svg.png',
  },
];

const keyExtractor = (item, index) => '@id' + index;

const Home = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectCard, setSelectCard] = useState(false);

  const openSelectCard = index => {
    if (!selectCard) {
      return Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start(() => setSelectCard(!selectCard));
    }

    const spliced = cards.splice(index, 1);
    cards.unshift(spliced[0]);

    setSelectCard(!selectCard);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();

    setSelectedCard(0);
  };

  const renderItem = ({
    item: { companyName, date, sending, price, logo },
  }) => (
    <View style={styles.historyContainer}>
      <Image source={{ uri: logo }} style={styles.historyLogo} />
      <View style={styles.historyTextContainer}>
        <Text style={styles.title}>{companyName}</Text>
        <Text style={styles.desc}>{sending ? 'Sending Money' : date}</Text>
      </View>
      <Text
        style={[styles.price, { color: sending ? 'limegreen' : 'red' }]}>
        {sending ? '+' : '-'}
        {price}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <NavigationBar
          selectCard={selectCard}
          title="Suzi Elebra"
          desc="hello@suzielep.com"
          setSelectCard={openSelectCard}
        />

        <View style={styles.cardContainer}>
          {selectCard ? (
            cards.map((item, index) => (
              <CreditCard
                selectCard={selectCard}
                setSelectCard={openSelectCard}
                item={item}
                index={index}
              />
            ))
          ) : (
            <CreditCard
              selectCard={selectCard}
              setSelectCard={openSelectCard}
              item={cards[selectedCard]}
            />
          )}
        </View>

        <Animated.View style={[styles.flatlistContainer, { opacity }]}>
          <View style={styles.dotContainer}>
            {cards.map(({ selected, key }, index) => (
              <View
                key={key}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      index === selectedCard
                        ? 'black'
                        : colors.borderColor,
                  },
                ]}
              />
            ))}
          </View>

          <Bar
            percent={cards[selectedCard].spent}
            leftText="SPENT"
            rightText="Total Limit $15,000"
          />

          <Text style={styles.historyTitle}>Transactions History</Text>

          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.flatlist}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  line: {
    borderWidth: 0.4,
    borderColor: colors.borderColor,
    marginTop: '15@s',
  },
  cardContainer: {
    paddingHorizontal: '15@s',
    marginTop: '15@s',
    zIndex: 9999,
  },
  dotContainer: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingTop: '5@s',
  },
  dot: {
    height: '5@s',
    width: '5@s',
    borderRadius: '2.5@s',
    marginHorizontal: '2@s',
  },
  flatlistContainer: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 18,
    paddingHorizontal: '15@s',
    marginTop: '20@s',
  },
  historyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '20@s',
  },
  historyTextContainer: {
    flex: 1,
    paddingLeft: '15@s',
  },
  historyLogo: {
    height: '40@s',
    width: '40@s',
    borderRadius: '20@s',
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: '15@s',
  },
  title: {
    fontSize: 14,
  },
  desc: {
    fontSize: 12,
    color: colors.lightGray,
    marginTop: '3@s',
  },
  price: {
    color: 'red',
  },
});

export default Home;
