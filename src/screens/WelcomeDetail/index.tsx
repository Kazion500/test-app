import React, { FC, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getData, welcomeSelector } from 'store/reducers/welcomeReducer';
import auth from '@react-native-firebase/auth';
import Button from 'components/atoms/Button';
import routes from 'resources/routes.json';
import { Navigation } from 'screens/Welcome';
import Spiner from 'components/atoms/Spiner';

const WelcomeDetail: FC<Navigation> = ({ navigation }) => {
  const { info, isLoading } = useAppSelector(welcomeSelector);
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

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <View style={styles.mainContainer}>
      <Button label="Logout" onPress={handleLogOut} color="red" />
      <View style={styles.div} />
      <Button
        label="Add User"
        onPress={() => navigation.navigate(routes.welcome)}
      />

      <ScrollView style={styles.container}>
        {info?.length ? (
          info.map(({ _data }, index) => (
            <View key={index} style={styles.contentContainer}>
              <Text style={styles.name}>Full Name: {_data?.fullName}</Text>
              <Text style={styles.name}>Age: {_data?.fullName}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No Data is available</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
    marginTop: 20,
  },
  div: { marginBottom: 10 },
  noData: {
    textAlign: 'center',
  },
  name: {
    fontSize: 20,
  },
  container: {
    flex: 1,

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
