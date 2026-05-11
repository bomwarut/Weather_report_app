import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function DetailScreen() {
  const { name, latitude, longitude, temp, time } = useLocalSearchParams();

  const isHot = Number(temp) >= 35;
  const isCold = Number(temp) <= 10;

  return (
    <View style={styles.container}>
      <Text style={styles.countryName}>Countrty : {name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Temperature</Text>
        <Text style={[styles.temp, isHot && styles.hot, isCold && styles.cold]}>
          {temp} °C
        </Text>
      </View>

      <View style={styles.latlong}>
        <View>
          <Text style={styles.label}>Latitude</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.latlongtext}
          >
            {latitude}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Longtitude</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.latlongtext}
          >
            {longitude}
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Updated time</Text>
        <Text style={styles.value}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  countryName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  latlongview: {
    maxWidth: "100%",
  },
  latlong: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: 10,
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  temp: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#2196F3",
    textAlign: "center",
  },
  latlongtext: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#0c65ad",
    textAlign: "center",
  },
  hot: { color: "#f44336" },
  cold: { color: "#90caf9" },
  value: {
    fontSize: 16,
    color: "#333",
  },
  backBtn: {
    marginTop: 8,
    padding: 14,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
