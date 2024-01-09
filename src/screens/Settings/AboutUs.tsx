import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {MyText} from '../../components';

export default function AboutUs() {
  const info = [
    'At Mpougada Laundry Services, we are dedicated to providing exceptional laundry delivery services that make your life easier. We understand the challenges of balancing a busy schedule with household chores, which is why we strive to take the burden of laundry off your shoulders.',
    'Our team consists of experienced professionals who are passionate about delivering high-quality services. We employ modern equipment and techniques to ensure your laundry is handled with the utmost care and attention to detail. From washing and drying to folding and packaging, we are committed to delivering clean, fresh, and perfectly folded laundry right to your doorstep.',
    'What sets us apart is our focus on convenience and customer satisfaction. We aim to provide a seamless experience from start to finish. Our user-friendly website and mobile application allow you to easily schedule a pickup, track your order, and receive notifications every step of the way. You can choose specific preferences, such as detergent options or special instructions, to ensure your laundry is treated exactly the way you want it.',
    'We prioritize the privacy and security of your personal information. Our privacy policy outlines how we collect, use, and protect your data, ensuring that your information is handled with the utmost confidentiality and in compliance with applicable regulations.',
    "At Mpougada Laundry Services, we value your time and strive to provide prompt and reliable service. Our team is dedicated to meeting your laundry needs efficiently, so you can focus on the things that matter most to you. Whether you're a busy professional, a parent with a hectic schedule, or simply someone who wants to reclaim their free time, we are here to simplify your life and deliver clean, fresh laundry right to your doorstep.",
    'Contact us today to experience the convenience and excellence of our laundry delivery services. Let us take care of your laundry while you enjoy more time for yourself and the things you love.',
  ];

  return (
    <ScrollView>
      {info && (
        <View style={styles.container}>
          {info.map((pg, index) => (
            <MyText key={index} style={styles.lineSpacing}>
              {pg}
            </MyText>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lineSpacing: {lineHeight: 30, marginBottom: 30},
  container: {marginHorizontal: 20, marginTop: 18},
});
