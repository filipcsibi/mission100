import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

interface Player {
  id: string;
  name: string;
  score: number;
  avatar: string;
}

const leaderboardData: Player[] = [
  {
    id: "1",
    name: "John Doe",
    score: 1000,
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: "2",
    name: "Jane Smith",
    score: 950,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: "3",
    name: "Bob Johnson",
    score: 900,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: "4",
    name: "Alice Williams",
    score: 850,
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: "5",
    name: "Charlie Brown",
    score: 800,
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    id: "6",
    name: "Diana Davis",
    score: 750,
    avatar: "https://i.pravatar.cc/100?img=6",
  },
  {
    id: "7",
    name: "Ethan Evans",
    score: 700,
    avatar: "https://i.pravatar.cc/100?img=7",
  },
  {
    id: "8",
    name: "Fiona Foster",
    score: 650,
    avatar: "https://i.pravatar.cc/100?img=8",
  },
  {
    id: "9",
    name: "George Green",
    score: 600,
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    id: "10",
    name: "Hannah Hill",
    score: 550,
    avatar: "https://i.pravatar.cc/100?img=10",
  },
];

const TopThree: React.FC<{ players: Player[] }> = ({ players }) => (
  <View style={styles.topThreeContainer}>
    <View style={styles.secondPlace}>
      <Image source={{ uri: players[1].avatar }} style={styles.avatarSmall} />
      <Text style={styles.topThreeName}>{players[1].name}</Text>
      <Text style={styles.topThreeScore}>{players[1].score}</Text>
    </View>
    <View style={styles.firstPlace}>
      <Image source={{ uri: players[0].avatar }} style={styles.avatarLarge} />
      <Text style={styles.topThreeName}>{players[0].name}</Text>
      <Text style={styles.topThreeScore}>{players[0].score}</Text>
    </View>
    <View style={styles.thirdPlace}>
      <Image source={{ uri: players[2].avatar }} style={styles.avatarSmall} />
      <Text style={styles.topThreeName}>{players[2].name}</Text>
      <Text style={styles.topThreeScore}>{players[2].score}</Text>
    </View>
  </View>
);

const LeaderboardItem: React.FC<{ player: Player; index: number }> = ({
  player,
  index,
}) => (
  <View style={styles.item}>
    <Text style={styles.rank}>{index + 1}</Text>
    <Image source={{ uri: player.avatar }} style={styles.avatarSmall} />
    <Text style={styles.name}>{player.name}</Text>
    <Text style={styles.score}>{player.score}</Text>
  </View>
);

const LeaderboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <TopThree players={leaderboardData.slice(0, 3)} />
      <ScrollView style={styles.scrollView}>
        {leaderboardData.slice(3).map((player, index) => (
          <LeaderboardItem key={player.id} player={player} index={index + 3} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#333",
  },
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  firstPlace: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  secondPlace: {
    alignItems: "center",
  },
  thirdPlace: {
    alignItems: "center",
  },
  topThreeName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  topThreeScore: {
    fontSize: 12,
    color: "#4CAF50",
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "gold",
  },
  avatarSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "silver",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    minWidth: 30,
    color: "#666",
  },
  name: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});

export default LeaderboardScreen;
