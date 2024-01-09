import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';

import {MyText} from '../../components';
import {MyTheme} from '../../types';

export default function PrivacyPolicy() {
  const theme = useTheme() as MyTheme;

  const sections = [
    {
      description:
        'At Mpougada Laundry Services, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard the information you provide while using our laundry delivery services. By using our services, you consent to the practices described in this policy.',
    },
    {
      title: 'Information Collection and Use',
      description:
        'We may collect the following types of personal information from you:',
      description2:
        'We use the information collected for the following purposes:',
      listPoints: [
        'Contact Information: When you place an order or create an account with us, we may collect your name, email address, phone number, and delivery address.',
        'Payment Information: If you choose to make a payment for our services, we may collect your billing address and payment details (such as credit card information or other electronic payment methods).',
        'Usage Information: We may collect information about your interactions with our website and mobile application, including the pages you visit, the actions you take, and the device and browser you use.',
        'Communications: We may collect information from your communications with us, including emails, messages, and customer support inquiries.',
      ],
      listPoints2: [
        'Providing Services: To process your orders, arrange for delivery, and provide you with the requested laundry services.',
        'Improving Services: To understand how our services are used, personalize your experience, and enhance the quality of our website and mobile application.',
        'Communication: To communicate with you regarding your orders, service updates, promotions, and other relevant information.',
        'Legal Compliance: To comply with applicable laws, regulations, and legal processes.',
      ],
    },
    {
      title: 'Information Sharing and Disclosure',
      description:
        'We understand the importance of maintaining the confidentiality of your personal information. We will not sell, trade, or rent your personal information to third parties for their marketing purposes.',
      listPoints: [
        'Service Providers: We may engage trusted third-party service providers to assist us in delivering our services, such as payment processors, delivery partners, and customer support providers. These service providers are obligated to handle your information securely and only for the purposes outlined in our Privacy Policy.',
        'Legal Requirements: We may disclose your personal information if required by law, court order, or government regulations, or if we believe it is necessary to protect our rights, property, or safety.',
      ],
    },
    {
      title: 'Data Security',
      description:
        'We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.',
      listPoints: [
        'Access and update your personal information: You can access, review, update, and correct your personal information through your account settings or by contacting us directly.',
        'Opt-out of marketing communications: You can unsubscribe from our promotional emails by following the instructions provided in each email or by contacting us.',
        'Delete your personal information: You can request the deletion of your personal information by contacting us, subject to any legal obligations or legitimate business interests that may require us to retain certain data.',
      ],
    },
    {
      title: 'Changes to this Privacy Policy',
      description:
        'We may update this Privacy Policy from time to time to reflect changes in our practices and services. We encourage you to review this page periodically to stay informed about our privacy practices.',
    },
    {
      title: 'Contact Us',
      description:
        'If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please contact us at',
      link: 'mpougadalaundryservices@outlook.com',
    },
  ];

  return (
    <ScrollView style={{}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            description={section.description}
            listPoints={section.listPoints}
            description2={section.description2}
            listPoints2={section.listPoints2}
            link={section.link}
            theme={theme}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const Section = ({
  title,
  description,
  description2,
  listPoints,
  listPoints2,
  link,
  theme,
}: {
  title?: string;
  description?: string;
  description2?: string;
  listPoints?: string[];
  listPoints2?: string[];
  link?: string;
  theme: MyTheme;
}) => (
  <View style={{}}>
    <MyText weight="600" size={16} style={styles.lineSpacing}>
      {title}
    </MyText>
    <MyText style={styles.lineSpacing}>{description}</MyText>
    {title == 'Data Security' ? (
      <>
        <MyText style={styles.lineSpacing}>Your Choices and Rights</MyText>
        <MyText style={styles.lineSpacing}>You have the right to:</MyText>
      </>
    ) : null}
    {link && (
      <MyText textColor={theme.colors.primary} style={styles.lineSpacing}>
        {link}
      </MyText>
    )}
    {listPoints && (
      <View style={{marginLeft: 15}}>
        {listPoints.map((point, index) => (
          <View style={{flexDirection: 'row'}}>
            <MyText style={styles.lineSpacing}>{index + 1}. </MyText>
            <MyText key={index} style={styles.lineSpacing}>
              {point}
            </MyText>
          </View>
        ))}
      </View>
    )}
    <MyText style={styles.lineSpacing}>
      {description2 ? description2 : null}
    </MyText>
    {listPoints2 && (
      <View style={{marginLeft: 15, marginBottom: 20}}>
        {listPoints2.map((point, index) => (
          <View style={{flexDirection: 'row'}}>
            <MyText style={styles.lineSpacing}>{index + 1}. </MyText>
            <MyText key={index} style={styles.lineSpacing}>
              {point}
            </MyText>
          </View>
        ))}
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  lineSpacing: {lineHeight: 30},
  desc: {lineHeight: 30, marginBottom: 20},
  container: {marginHorizontal: 20},
});
