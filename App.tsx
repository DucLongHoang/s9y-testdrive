import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ActivityIndicator,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Text,
	View,
	Image,
} from "react-native";
import { getMovies } from "./MovieFetcher";

/**
 * MovieProps type
 * Useful properties of a movie
 */
type MovieProps = {
	title: string;
	episode_number: number;
	poster: string;
	description: string;
};

// START: custom components
const Separator = () => {
	return <View style={{ height: 1, backgroundColor: "#aaa" }} />;
};

const Movie = ({ movie }: { movie: MovieProps }) => {
	const splitted = movie.title.split(" - ", 2);
	const getImageUrl = (suffix: string) =>
		"https://raw.githubusercontent.com/Package/Star-Wars-Express/master/public/images/" +
		suffix;

	return (
		<>
			<View style={styles.card}>
				<Image
					style={styles.poster}
					source={{ uri: getImageUrl(movie.poster) }}
				/>
				<View style={{ flex: 1, flexDirection: "column", margin: 10 }}>
					<Text style={styles.titleText}>{splitted[0]}</Text>
					<Text style={styles.titleText}>{splitted[1]}</Text>
					<Text style={styles.descText} numberOfLines={5} ellipsizeMode="tail">
						{movie.description}
					</Text>
				</View>
			</View>
		</>
	);
};
// END: custom components

/**
 * Main
 * @returns App
 */
const App = () => {
	//SplashScreen.preventAutoHideAsync();
	//setTimeout(SplashScreen.hideAsync, 5000);

	// states
	const [data, setData] = useState<MovieProps[]>([]);
	const [loading, setLoading] = useState<Boolean>(true);
	const [ascending, setAscending] = useState<Boolean>(true);

	useEffect(() => {
		getMovies(setData, setLoading);
	}, []);

	// sorting logic
	const sortMovies = () => {
		if (ascending) {
			setData([...data].sort((a, b) => b.episode_number - a.episode_number));
			setAscending(false);
		} else {
			setData([...data].sort((a, b) => a.episode_number - b.episode_number));
			setAscending(true);
		}
	};

	return (
		<>
			<StatusBar style="light" />
			<SafeAreaView style={styles.container}>
				{loading ? (
					<ActivityIndicator />
				) : (
					<>
						<FlatList
							style={{ width: "100%" }}
							data={data}
							keyExtractor={({ episode_number }) =>
								episode_number.toString()
							}
							renderItem={({ item }) => {
								return <Movie movie={item} />;
							}}
							ItemSeparatorComponent={Separator}
						/>
						<TouchableOpacity style={styles.button} onPress={sortMovies}>
							<Text style={styles.buttonText}>
								{ascending ? "Sort des" : "Sort asc"}
							</Text>
						</TouchableOpacity>
					</>
				)}
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000000",
		alignItems: "center",
		justifyContent: "center",
	},
	card: {
		flexDirection: "row",
		height: 200,
		width: "100%",
	},
	poster: {
		width: "33%",
		margin: 5,
		height: undefined,
		resizeMode: "contain",
	},
	button: {
		marginVertical: 5,
		elevation: 8,
		alignItems: "center",
		backgroundColor: "#aaa",
		paddingHorizontal: 40,
		paddingVertical: 10,
		borderRadius: 10,
	},
	buttonText: {
		color: "black",
		fontSize: 20,
		fontWeight: "bold",
	},
	titleText: {
		color: "#00ffff",
		fontSize: 20,
	},
	descText: {
		color: "#aaa",
		fontSize: 15,
		marginTop: 5,
		marginEnd: 10,
	},
});

export default App;
