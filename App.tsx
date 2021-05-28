/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {
  atom,
  atomFamily,
  RecoilRoot,
  selectorFamily,
  useRecoilState,
} from 'recoil';

const myAtom = atomFamily({
  key: 'myAtom',
  default: null, // constructBigFatObject(),
});
const versionState = atom({
  key: 'version',
  default: 0,
});

const mySelector = selectorFamily({
  key: 'selector',
  set:
    key =>
    ({set}, newValue) => {
      set(myAtom(key), newValue);
    },
  get:
    key =>
    ({get}) => {
      return get(myAtom(key));
    },
});

function constructBigFatObject() {
  const bigObject = {};
  for (let i = 0; i < 1000; i++) {
    bigObject[i.toString()] = i;
  }
  return bigObject;
}

function MyComponent(props) {
  const [version, setVersion] = useRecoilState(versionState);
  const [state, setState] = useRecoilState(mySelector(version));

  return (
    <View style={styles.container}>
      <Text>{`Render count: ${version}`}</Text>
      <Button
        title="Create new family selector"
        onPress={() => {
          setVersion(current => current + 1);
        }}
      />
      <Button
        title="Generate"
        onPress={() => {
          setState(constructBigFatObject());
        }}
      />
      <Button title="Reset" onPress={props.onReset} />
    </View>
  );
}

const App = () => {
  const [key, setKey] = useState(0);

  return (
    <RecoilRoot key={key}>
      <MyComponent onReset={() => setKey(current => current + 1)} />
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
