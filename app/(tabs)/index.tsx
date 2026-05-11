import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";

const COUNTRIES = [
  { name: "Thailand", lat: 13.75, lon: 100.52 },
  { name: "Japan", lat: 35.68, lon: 139.69 },
  { name: "United States", lat: 40.71, lon: -74.01 },
  { name: "United Kingdom", lat: 51.51, lon: -0.13 },
  { name: "France", lat: 48.85, lon: 2.35 },
  { name: "Germany", lat: 52.52, lon: 13.41 },
  { name: "China", lat: 39.91, lon: 116.39 },
  { name: "India", lat: 28.61, lon: 77.21 },
  { name: "Brazil", lat: -15.78, lon: -47.93 },
  { name: "Australia", lat: -33.87, lon: 151.21 },
  { name: "Russia", lat: 55.75, lon: 37.62 },
  { name: "Canada", lat: 45.42, lon: -75.69 },
  { name: "South Korea", lat: 37.57, lon: 126.98 },
  { name: "Italy", lat: 41.9, lon: 12.5 },
  { name: "Spain", lat: 40.42, lon: -3.7 },
  { name: "Mexico", lat: 19.43, lon: -99.13 },
  { name: "Indonesia", lat: -6.21, lon: 106.85 },
  { name: "Argentina", lat: -34.6, lon: -58.38 },
  { name: "South Africa", lat: -25.75, lon: 28.19 },
  { name: "Saudi Arabia", lat: 24.69, lon: 46.72 },
  { name: "Turkey", lat: 39.93, lon: 32.85 },
  { name: "Egypt", lat: 30.06, lon: 31.25 },
  { name: "Pakistan", lat: 33.72, lon: 73.04 },
  { name: "Bangladesh", lat: 23.72, lon: 90.41 },
  { name: "Philippines", lat: 14.6, lon: 120.98 },
  { name: "Vietnam", lat: 21.03, lon: 105.85 },
  { name: "Malaysia", lat: 3.14, lon: 101.69 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "New Zealand", lat: -36.87, lon: 174.77 },
  { name: "Sweden", lat: 59.33, lon: 18.07 },
];

type WeatherData = {
  name: string;
  temp: number | null;
  time: string;
};

const ITEM_HEIGHT = 80;

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2),
  );
  const [loading, setLoading] = useState(true);
  const [fetchTime, setFetchTime] = useState("");

  const layoutProvider = new LayoutProvider(
    () => "ITEM",
    (_, dim) => {
      dim.width = width;
      dim.height = ITEM_HEIGHT;
    },
  );

  useEffect(() => {
    fetchAllWeather();
  }, []);

  const fetchAllWeather = async () => {
    try {
      const now = new Date();
      setFetchTime(now.toLocaleString("th-TH"));

      const results = await Promise.all(
        COUNTRIES.map(async (country) => {
          const url =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${country.lat}` +
            `&longitude=${country.lon}` +
            `&current_weather=true`;

          const res = await fetch(url);
          const data = await res.json();

          return {
            name: country.name,
            temp: data.current_weather?.temperature ?? null,
            time: data.current_weather?.time ?? "",
            ...data,
          } as WeatherData;
        }),
      );

      setDataProvider(
        new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(results),
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLongPress = (item: WeatherData) => {
    router.push({
      pathname: "/detail",
      params: {
        ...item,
      },
    });
  };

  const rowRenderer = (_: any, item: WeatherData) => {
    const isHot = item.temp !== null && item.temp >= 35;
    const isCold = item.temp !== null && item.temp <= 10;

    return (
      <TouchableOpacity
        style={styles.row}
        onLongPress={() => handleLongPress(item)}
      >
        <Text style={styles.countryName}>{item.name}</Text>
        <Text style={[styles.temp, isHot && styles.hot, isCold && styles.cold]}>
          {item.temp !== null ? `${item.temp} °C` : "N/A"}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.fetchTime}>Last updated: {fetchTime}</Text>
      <RecyclerListView
        style={styles.list}
        dataProvider={dataProvider}
        layoutProvider={layoutProvider}
        rowRenderer={rowRenderer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#555", fontSize: 14 },
  fetchTime: {
    textAlign: "center",
    padding: 8,
    fontSize: 12,
    color: "#888",
    backgroundColor: "#fff",
  },
  list: { flex: 1 },
  row: {
    cursor: "pointer",
    height: ITEM_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  countryName: { fontSize: 16, color: "#333", fontWeight: "500" },
  temp: { fontSize: 20, fontWeight: "bold", color: "#2196F3" },
  hot: { color: "#f44336" },
  cold: { color: "#90caf9" },
});
