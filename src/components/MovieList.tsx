import React, { useMemo, useState } from "react";
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

	// takhle metoda vraci filmy a boolean
	const { data, loading } = useFetchMovies(url);
	const [ascending, setAscending] = useState<number>(-1);

	const sortedMovies = useMemo(() => {
		return [...data].sort(
			(a, b) => (b.episode_number - a.episode_number) * ascending
		);
	}, [ascending, data]);

	return loading ? (
		<ActivityIndicator />
	) : (
		<>
			<FlatList
				style={{ width: "100%" }}
				data={sortedMovies}
				keyExtractor={({ episode_number }) => episode_number.toString()}
				renderItem={({ item }) => <Movie movie={item} />}
				ItemSeparatorComponent={Separator}
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={() => setAscending(-ascending)}
			>
				<Text style={styles.buttonText}>
					{ascending == -1 ? "Sort des" : "Sort asc"}
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
