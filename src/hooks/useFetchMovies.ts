import React, { useEffect, useState } from "react";
import { MovieProps } from "../components/Movie";

const useFetchMovies = (url: string) => {
	const [data, setData] = useState<MovieProps[]>([]);
	const [loading, setLoading] = useState<Boolean>(false);

	const getMovies = async () => {
		try {
			const response = await fetch(url);
			const json = await response.json();
			setData(json.movies);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getMovies();
	}, []);

	return { data, setData, loading };
};

export default useFetchMovies;
