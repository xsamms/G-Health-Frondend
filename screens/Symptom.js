import React from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";

const dryEye = require("../assets/dry-eye.png");
const std = require("../assets/std.jpg");
const fart = require("../assets/fart.jpg");

function Symptom(props) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ paddingHorizontal: 10 }}>
        <Text style={{ paddingTop: 20, fontSize: 20, fontWeight: "700" }}>
          Articles
        </Text>
        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <Image
            source={dryEye}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "500" }}>
              Patient Complains of Dry Eyes – What’s The Pharmacist’s Next Move?
            </Text>
            <Text>
              Working with a lot of geriatric patients, I run into patients
              complaining of dry eyes all the time. While many will readily
              admit that they have this issue, many will not even think to
              mention it because they have been dealing with it for a long time
              or they may consider it more of a non-serious issue. When a
              patient complains of dry eye a pharmacist must first think of
              medications that can cause this issue. Here is a list of important
              drugs and drug classes that I’m looking for when assessing a
              patient with dry eye.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <Image
            source={std}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "500" }}>
              Sexually Transmitted Infections – Drugs of Choice and Practice
              Pearls
            </Text>
            <Text>
              Sexually transmitted infections (STIs) frequently come up in
              clinical practice and is also a frequent target for pharmacology
              and board exam questions! In this post, I will list my top 3 drugs
              to know and the sexually transmitted infections they treat. Below
              is a snippet from Pyrls.com which lays out the STI guidelines in
              an easy-to-read fashion.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", paddingBottom: 20 }}>
          <Image
            source={fart}
            resizeMode="contain"
            style={{ width: 100, height: 100 }}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "500" }}>
              6 Things Your Farts Can Tell You About Your Health
            </Text>
            <Text>
              Farting throughout the day and night is largely a good thing; the
              buildup of gas would lead to uncomfortable bloating otherwise. In
              short, breaking wind makes you feel better. But that doesn't mean
              you should totally ignore your farts. Paying attention to their
              frequency, smell, and if they occur with any additional GI
              symptoms can clue you into what's going on with your body and even
              tip you off to some potentially serious conditions. Here are six
              types of farts you should take note of and what they're trying to
              tell you.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
});
export default Symptom;
