import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import {
  clearData,
  saveData,
  welcomeSelector,
} from 'store/reducers/welcomeReducer';
import routes from 'resources/routes.json';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import Button from 'components/atoms/Button';
import Spiner from 'components/atoms/Spiner';

export type Navigation = {
  navigation: {
    navigate: (screenName: string) => void;
  };
};

const Welcome: FC<Navigation> = ({ navigation }) => {
  const [fullName, setFullName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [asyncError, setAsyncError] = useState<any>(null);
  const { data, isLoading } = useAppSelector(welcomeSelector);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if (fullName && age) {
      dispatch(saveData({ fullName, age }) as any);
      setAge('');
      setFullName('');
    } else {
      setAsyncError('Please fill all fields');
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(clearData());
      navigation.navigate(routes.details);
    }
  }, [data, dispatch, navigation]);

  if (isLoading) {
    return <Spiner />;
  }
  return (
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
      {asyncError && <Text style={styles.error}>{asyncError}</Text>}
    </View>
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
  error: {
    color: 'red',
    marginTop: 10,
    fontSize: 12,
  },
  flex: {
    flex: 1,
  },
});

export default Welcome;
