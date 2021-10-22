import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Episode from "./components/Episode";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState({});
  const [sort, setSort] = useState("ascending");

  // smooth transition once sort is called
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  // get movies into state variable
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/RyanHemrick/star_wars_movie_app/master/movies.json"
    )
      .then((res) => res.json())
      .then((res) => setMovies(res.movies))
      .then(() => setIsLoading(false));
  }, []);

  const renderItem = ({ item }) => <Episode episode={item} />;

  function sortListById() {
    scrollToTop();
    if (sort === "ascending") {
      let sorted = movies.sort(function (obj1, obj2) {
        return obj2.episode_number - obj1.episode_number;
      });
      setSort("descending");
      setMovies(sorted);
    } else {
      let sorted = movies.sort(function (obj1, obj2) {
        return obj1.episode_number - obj2.episode_number;
      });
      setSort("ascending");
      setMovies(sorted);
    }
  }

  return (
    <>
      <View style={styles.container}>
        {isLoading && <Text>Loading...</Text>}

        {!isLoading && (
          <ScrollView>
            <Text style={styles.heading}>Star Wars movies</Text>
            <FlatList
              data={movies}
              extraData={sort}
              renderItem={renderItem}
              keyExtractor={(item) => item.episode_number}
            />
            <TouchableOpacity style={styles.button} onPress={sortListById}>
              <Text style={styles.buttonText}>
                {sort === "ascending"
                  ? "Sort in descending order"
                  : "Sort in ascending order"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "30px",
  },
  heading: {
    marginBottom: "30px",
    fontSize: 30,
    fontWeight: 800,
    textAlign: "center",
  },
  button: {
    width: 350,
    backgroundColor: "blue",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    padding: 10,
  },
});
