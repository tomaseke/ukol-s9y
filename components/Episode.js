import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 450,
    maxWidth: "95vw",
  },
  episode: {
    margin: "20px",
    border: "1px solid black",
    maxWidth: "95vw",
  },
  textContainer: {
    margin: 10,
  },
});

const Episode = ({
  episode: {
    title,
    episode_number,
    main_characters,
    description,
    poster,
    hero_image,
  },
}) => {
  return (
    <>
      <View style={styles.episode}>
        <Image
          source={require(`../assets/images/${hero_image}`)}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text>
            <strong>Title:</strong> {title}
          </Text>
          <Text>
            <strong>Episode number:</strong> {episode_number}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Episode;
