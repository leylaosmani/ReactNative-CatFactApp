import { useState, useRef } from 'react';
import * as React from 'react';
import ProgressBar from './components/progressbar';
import StarRating from 'react-native-star-rating-widget';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Button,
  FlatList,
  TextInput,
  Image,
  TouchableHighlight,
  Animated,
  Easing
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function Seperator() {
  return <View style={styles.seperator}></View>;
}

function FactScreen({ navigation }) {
  const [facts, setFacts] = useState([]);
  
  const fetchData = async () => {
    const resp = await fetch('https://catfact.ninja/fact');
    const fact = await resp.json();
    setFacts([...facts, fact]);
  };
  const renderFact = ({ item }) => {
    return <Text>{item.fact}</Text>;
  };

  const bar = facts.length ? 'lightblue' : 'red';

  console.log(facts);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'beige',
      }}>
      <Image style={styles.cat1} source={require('./catclipart3.png')} />
      <Seperator />
      <TouchableOpacity
        style={styles.reviewbutton}
        onPress={() => navigation.navigate('Next')}>
        <Text style={{ fontSize: 20}}>
            Click For Review Page
          </Text>
      </TouchableOpacity>
      <Seperator />
      <Seperator />
      <Text> Progress Bar</Text>
      <Seperator />
      <ProgressBar
        style={styles.bar}
        progress={facts.length * 100}
        max={100}
        min={0}
        backColor={'ivory'}
        barColor={bar}
        borderColor={'black'}
        setTimeout={1000}
      />
      <Seperator />
      <Seperator />
      <TouchableOpacity style={styles.button} onPress={() => fetchData()}>
        <Text style={styles.buttonText}>Fetch Cat Fact</Text>
      </TouchableOpacity>
      <Seperator />
      <FlatList
        data={facts}
        renderItem={renderFact}
        keyExtractor={(item) => item}
      />
    </View>
  );
}
function ReviewPage({ navigation }) {
  const [name, onChangeText] = React.useState('');
  const [review, onChangeReview] = React.useState('');
  const [rating, setRating] = useState(0);
  const [showModal, setShowModal] = useState(false);
  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'beige',
      }}>
          <Animated.Image
          style={{
            width: 209,
            height: 209,
            transform: [{ rotate: RotateData }],
          }}
          source={{
            uri:
              'https://www.svgheart.com/wp-content/uploads/2020/06/cute-cat-clipart-free-svg-file.png',
          }}
        />
        <TouchableHighlight
          onPress={startImageRotateFunction}
          style={styles.buttonStyle}>
          <Text style={{ fontSize: 15, fontWeight: "bold"}}>
            Click to rotate cat!
          </Text>
        </TouchableHighlight>
      <Text style={styles.title}>Rate Your Experience!</Text>
      <Seperator />
      <StarRating
        rating={rating}
        onChange={setRating}
        starSize="60"
        color="pink"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={name}
        placeholder="Enter Name"
      />
      <TextInput
        style={styles.review}
        onChangeText={onChangeReview}
        value={review}
        multiline={true}
        placeholder="REVIEW"
      />

      <Button
        title="Sumbit"
        onPress={() => {
          setShowModal(!showModal);
        }}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {}}>
        <View style={styles.container}>
        <Image style={styles.cat} source={require('./catclipart.png')} />
          <Text style={styles.modalText}>
            THANK YOU! 
             We Hope you enjoyed learning more about cats today, hope to see you soon.
          </Text>
          <Button title="Close" onPress={() => setShowModal(!showModal)} />
        </View>
      </Modal>
    </View>
  );
}
function HomeScreen({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  var buttons1Config = [
    {
      text: 'Yes',
      onPress: () => {
        setShowModal(!showModal);
      },
    },
    { text: 'No', onPress: () => {} },
  ];
    
  return (
    <View style={styles.container}>
      <Image style={styles.cat} source={require('./catclipart.png')} />
      <Text style={styles.title}>Welcome To The Random Cat Fact Generator</Text>
      <Seperator />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(
            'Attention',
            'Are you sure you want to continue?',
            buttons1Config
          );
        }}>
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>
      <Seperator />
      <Seperator />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Back')}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => {}}>
        <View style={styles.container}>
        <Image style={styles.cat} source={require('./catclipart.png')} />
          <Text style={styles.modalText}>
            Hello, this app is to teach you a little more about cats. Clicking
            the "Fetch Cat Fact" button will direct you to a page that displays
            a SUPER random cat fact! You'll be able to generate multiple cat
            facts. ENJOY!
          </Text>
          <Button title="Close" onPress={() => setShowModal(!showModal)} />
        </View>
      </Modal>
    </View>
  );
}
const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Back" component={FactScreen} />
        <Stack.Screen name="Next" component={ReviewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'beige',
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 20,
  },

  button: {
    display: 'flex',
    height: 60,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    backgroundColor: 'pink',
    shadowColor: 'pink',
    shadowOpacity: 0.9,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    shadowRadius: 25,
  },
  cat: {
    height: 109,
    width: 100,
  },
  cat1:{
    height:115,
    width:121
  },
  bar: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    paddingTop: 150,
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  review: {
    backgroundColor: 'white',
    height: 100,
    width: 200,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
  },
  reviewbutton:{
    fontSize: 20
  },
  seperator: { margin: 10 },
});
export default App;
