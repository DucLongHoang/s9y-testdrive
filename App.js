import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
} from "react-native";

const getImageUrl = (suffix) => {
	return (
		"https://raw.githubusercontent.com/Package/Star-Wars-Express/master/public/images/" +
		suffix
	);
};

const Item = ({ title, episode_number, poster, description }) => (
	<View style={styles.card}>
		<Image style={styles.poster} source={{ uri: getImageUrl(poster) }} />
		<View>
			<Text>{title}</Text>
			<Text>{episode_number}</Text>
		</View>
	</View>
);

const App = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const url =
		"https://raw.githubusercontent.com/Package/Star-Wars-Express/master/movies.json";

	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((json) => setData(json.movies))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<FlatList
					keyEtractor={(item) => item.episode_number}
					data={data}
					renderItem={({ item }) => (
						<Item
							title={item.title}
							episode_number={item.episode_number}
							poster={item.poster}
							description={item.description}
						/>
					)}
				/>
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "lightblue",
		alignItems: "center",
		justifyContent: "center",
	},
	poster: {
		width: "33%",
		height: undefined,
		resizeMode: "contain",
	},
	card: {
		flexDirection: "row",
		padding: 5,
		height: 200,
		width: "100%",
	},
});

export default App;
