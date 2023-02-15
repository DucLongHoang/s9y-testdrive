import React, { useState } from "react";
import {
	ActivityIndicator,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Movie } from "./Movie";
import useFetchMovies from "../hooks/useFetchMovies";

const Separator = () => {
	return <View style={{ height: 1, backgroundColor: "#aaa" }} />;
};

export const MovieList = () => {
	const url: string =
		"https://raw.githubusercontent.com/Package/Star-Wars-Express/master/movies.json";

	var { data, loading } = useFetchMovies(url);
	const [ascending, setAscending] = useState<Boolean>(true);

	// sort anyway and reverse accordingly
	const sortMovies = () => {
		data = data.sort((a, b) => a.episode_number - b.episode_number);
		if (ascending) data = data.reverse();
		setAscending(!ascending);
	};

	return loading ? (
		<ActivityIndicator />
	) : (
		<>
			<FlatList
				style={{ width: "100%" }}
				data={data}
				keyExtractor={({ episode_number }) => episode_number.toString()}
				renderItem={({ item }) => <Movie movie={item} />}
				ItemSeparatorComponent={Separator}
			/>
			<TouchableOpacity style={styles.button} onPress={sortMovies}>
				<Text style={styles.buttonText}>
					{ascending ? "Sort des" : "Sort asc"}
				</Text>
			</TouchableOpacity>
		</>
	);
};
const styles = StyleSheet.create({
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
});
