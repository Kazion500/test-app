import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  getData,
  saveData,
  welcomeSelector,
} from 'store/reducers/welcomeReducer';
import routes from 'resources/routes.json';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Button from 'components/atoms/Button';
import Spiner from 'components/atoms/Spiner';

const Welcome: FC<{
  navigation: {
    navigate: (screenName: string) => void;
  };
}> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const { data, info, isLoading } = useAppSelector(welcomeSelector);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(saveData({ fullName, age }) as any);
  };

  useEffect(() => {
    if (data || info?.length) {
      navigation.navigate(routes.details);
    }
  }, [data, navigation, info]);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <>
      {!isLoading && !info?.length ? (
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.text}>Welcome</Text>

            <TextInput
              value={fullName}
              placeholder="full name"
              onChangeText={setFullName}
              style={styles.input}
            />
            <TextInput
              value={age}
              placeholder="age"
              onChangeText={setAge}
              style={styles.input}
            />

            <Button label="Submit" onPress={handleSubmit} />
          </View>
        </View>
      ) : (
        <Spiner />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
  },
  innerContainer: { width: '90%' },
  input: {
    backgroundColor: '#f3f3f3',
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
  },
  btn: {
    backgroundColor: '#1E90FF',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  flex: {
    flex: 1,
  },
});

export default Welcome;
