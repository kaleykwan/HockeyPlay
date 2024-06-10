import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface DropdownParameters {
  incrementRevealed: (team: string) => void;
}

export default function PinpointDropdown({
  incrementRevealed,
}: DropdownParameters) {
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [data, setData] = useState<string[]>([
    "Anaheim Ducks",
    "Arizona Coyotes",
    "Boston Bruins",
    "Buffalo Sabres",
    "Calgary Flames",
    "Carolina Hurricanes",
    "Chicago Blackhawks",
    "Colorado Avalanche",
    "Columbus Blue Jackets",
    "Dallas Stars",
    "Detroit Red Wings",
    "Edmonton Oilers",
    "Florida Panthers",
    "Los Angeles Kings",
    "Minnesota Wild",
    "Montreal Canadiens",
    "Nashville Predators",
    "New Jersey Devils",
    "New York Islanders",
    "New York Rangers",
    "Ottawa Senators",
    "Philadelphia Flyers",
    "Pittsburgh Penguins",
    "San Jose Sharks",
    "Seattle Kraken",
    "St. Louis Blues",
    "Tampa Bay Lightning",
    "Toronto Maple Leafs",
    "Vancouver Canucks",
    "Vegas Golden Knights",
    "Washington Capitals",
    "Winnipeg Jets",
  ]);

  const handleInputChange = (text: string) => {
    setInput(text);
    if (text) {
      setFilteredData(
        data.filter((item) => item.toLowerCase().includes(text.toLowerCase()))
      );
    } else {
      setFilteredData([]);
    }
  };

  const handleOptionSelect = (option: string) => {
    setInput(option);
    setFilteredData([]);
    incrementRevealed(option);
    setInput("");
    setData(data.filter((item) => item != option));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        maxLength={30}
        onChangeText={handleInputChange}
        placeholder="Search NHL Team"
      />
      {filteredData.length > 0 && (
        <FlatList
          style={styles.dropdown}
          data={filteredData}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.option}
              onPress={() => handleOptionSelect(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: "4%"
  },
  dropdown: {
    position: "absolute",
    top: 40,
    width: "100%",
    maxHeight: 200,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    zIndex: 1,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});
