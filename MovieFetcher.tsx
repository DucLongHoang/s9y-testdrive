// fetching movies
export const getMovies = async (setData: Function, setLoading: Function) => {
	const url: string =
		"https://raw.githubusercontent.com/Package/Star-Wars-Express/master/movies.json";

	try {
		const response = await fetch(url);
		const json = await response.json();
		setData(json.movies);
	} catch (error) {
		console.error(error);
	} finally {
		setLoading(false);
	}
};
