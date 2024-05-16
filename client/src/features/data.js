export const diseaseOptions = [
  { value: "covid-19", label: "COVID-19" },
  { value: "influenza", label: "Influenza" },
  { value: "diabetes", label: "Diabetes" },
  { value: "heart-disease", label: "Heart Disease" },
];

export const locationOptions = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "houston", label: "Houston" },
];

export const healthData = [
  {
    disease: "COVID-19",
    trend: "Improving",
    trendColor: "green",
    prevalence: "12.5%",
    mortalityRate: "2.1%",
    recommendedTreatments: "Vaccination, Isolation",
  },
  {
    disease: "Influenza",
    trend: "Stable",
    trendColor: "yellow",
    prevalence: "8.2%",
    mortalityRate: "0.5%",
    recommendedTreatments: "Vaccination, Antiviral Drugs",
  },
  {
    disease: "Diabetes",
    trend: "Worsening",
    trendColor: "red",
    prevalence: "14.1%",
    mortalityRate: "3.7%",
    recommendedTreatments: "Lifestyle Changes, Medication, Insulin Therapy",
  },
  {
    disease: "Heart Disease",
    trend: "Worsening",
    trendColor: "red",
    prevalence: "11.8%",
    mortalityRate: "4.2%",
    recommendedTreatments: "Lifestyle Changes, Medication, Surgery",
  },
  // Add more data objects as needed
];
