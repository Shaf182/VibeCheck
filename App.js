import React, { useState } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

const App = () => {
  const [textInput, setTextInput] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextSubmit = () => {
    setLoading(true);
    fetch('http://your-backend-url/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: textInput }),
    })
      .then(response => response.json())
      .then(data => {
        setResponseData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <TextInput
        placeholder="Type your thoughts here..."
        onChangeText={text => setTextInput(text)}
        value={textInput}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleTextSubmit} />
      
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      
      {responseData && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>Mood: {responseData.mood}</Text>
          <Text style={styles.responseText}>Suggestions:</Text>
          {responseData.resources.map((resource, index) => (
            <Text key={index} style={styles.resourceText}>- {resource}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingLeft: 10,
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  responseContainer: {
    marginTop: 20,
  },
  responseText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resourceText: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default App;
