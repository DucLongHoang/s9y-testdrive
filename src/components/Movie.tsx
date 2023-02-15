import { View, StyleSheet, Text, Image } from "react-native";

/**
 * MovieProps type
 * Useful properties of a movie
 */
export type MovieProps = {
	title: string;
	episode_number: number;
	poster: string;
	description: string;
};

export const Movie = ({ movie }: { movie: MovieProps }) => {
	const splitted = movie.title.split(" - ", 2);
	const imageUrl: string =
		"https://raw.githubusercontent.com/Package/Star-Wars-Express/master/public/images/" +
		movie.poster;

	return (
		<>
			<View style={styles.card}>
				<Image style={styles.poster} source={{ uri: imageUrl }} />
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

const styles = StyleSheet.create({
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
