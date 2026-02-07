
import { Gender, GrowthReference } from './types';

// WHO Simplified Median Growth Data (Interpolated reference points)
// Source: WHO Child Growth Standards (0-60 months)
export const GROWTH_DATA: GrowthReference = {
  [Gender.BOY]: [
    { ageInMonths: 0, weightMedian: 3.3, heightMedian: 49.9 },
    { ageInMonths: 6, weightMedian: 7.9, heightMedian: 67.6 },
    { ageInMonths: 12, weightMedian: 9.6, heightMedian: 75.7 },
    { ageInMonths: 24, weightMedian: 12.2, heightMedian: 87.1 },
    { ageInMonths: 36, weightMedian: 14.3, heightMedian: 96.1 },
    { ageInMonths: 48, weightMedian: 16.3, heightMedian: 103.3 },
    { ageInMonths: 60, weightMedian: 18.3, heightMedian: 110.0 }
  ],
  [Gender.GIRL]: [
    { ageInMonths: 0, weightMedian: 3.2, heightMedian: 49.1 },
    { ageInMonths: 6, weightMedian: 7.3, heightMedian: 65.7 },
    { ageInMonths: 12, weightMedian: 8.9, heightMedian: 74.0 },
    { ageInMonths: 24, weightMedian: 11.5, heightMedian: 85.7 },
    { ageInMonths: 36, weightMedian: 13.9, heightMedian: 95.1 },
    { ageInMonths: 48, weightMedian: 16.1, heightMedian: 102.7 },
    { ageInMonths: 60, weightMedian: 18.2, heightMedian: 109.4 }
  ]
};

export const UI_STRINGS = {
  TITLE: "बाल विकास जाँच प्रणाली (WHO)",
  GENDER_LABEL: "बच्चे का लिंग",
  AGE_LABEL: "बच्चे की आयु (महीनों में)",
  WEIGHT_LABEL: "वर्तमान वजन (किग्रा)",
  HEIGHT_LABEL: "वर्तमान लंबाई (सेमी)",
  BTN_CALC: "परिणाम देखें",
  NORMAL_WEIGHT: "सामान्य वजन",
  NORMAL_HEIGHT: "सामान्य लंबाई",
  STATUS_LABEL: "स्वास्थ्य स्थिति",
  STATUS_NORMAL: "सामान्य (Normal)",
  STATUS_SLIGHTLY_LOW: "थोड़ा कम (Slightly Low)",
  STATUS_VERY_LOW: "बहुत कम (Very Low)",
  BOY: "बालक (Boy)",
  GIRL: "बालिका (Girl)",
  DISCLAIMER: "यह ऐप WHO के औसत मानकों पर आधारित है। यह चिकित्सीय सलाह का विकल्प नहीं है।",
  HEALTH_TIP_HEADER: "स्वास्थ्य परामर्श (AI द्वारा)",
};
