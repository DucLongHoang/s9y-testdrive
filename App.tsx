import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { MovieList } from "./src/components/MovieList";

/**
 * Main
 * @returns App
 */
const App = () => {
	return (
		<>
			<StatusBar style="light" />
			<SafeAreaView style={styles.container}>
				<MovieList />
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
});

export default App;
