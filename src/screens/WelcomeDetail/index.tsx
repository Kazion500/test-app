import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getData, welcomeSelector } from 'store/reducers/welcomeReducer';
import auth from '@react-native-firebase/auth';
import Button from 'components/atoms/Button';

const WelcomeDetail = () => {
  const { info } = useAppSelector(welcomeSelector);
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <Button label="Logout" onPress={handleLogOut} />
      {info?.length ? (
        info.map(({ _data }, index) => (
          <View key={index} style={styles.contentContainer}>
            <Text style={styles.name}>Full Name: {_data?.fullName}</Text>
            <Text style={styles.name}>Age: {_data?.fullName}</Text>
          </View>
        ))
      ) : (
        <Text>No Data is available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginTop: 20,
  },
  name: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  closeBtn: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    color: 'white',
  },
});

export default WelcomeDetail;
