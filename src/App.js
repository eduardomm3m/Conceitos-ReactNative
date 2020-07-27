import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(resp => {
      setRepos(resp.data)
    })
  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    await api.post(`repositories/${id}/like`);

    const novoRepos = repos.map(rps => {
      if (rps.id == id){
        rps.likes++;
        return rps;
      }else{
        return rps;
      }
    });

    setRepos(novoRepos);

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repos}
          keyExtractor={rps => rps.id}
          renderItem={({ item }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>

              <View style={styles.techsContainer}>
                {item.techs.map(tch => (
                  <Text style={styles.tech} key={tch}>{tch}</Text>
                )
                )}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-${item.id}`}
                >
                  {item.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(item.id)}
                // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                testID={`like-button-${item.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
        container: {
        flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
        marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
        fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
        flexDirection: "row",
    marginTop: 10,
  },
  tech: {
        fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
        marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
        fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
        marginTop: 10,
  },
  buttonText: {
        fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
