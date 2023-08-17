// const dashboardRegios = [
//   { x: 327, y: 528, width: 444, height: 146, unit: "px" },
//   { x: 415, y: 768, width: 299, height: 147, unit: "px" },
//   { x: 656, y: 1490, width: 415, height: 92, unit: "px" },
//   { x: 647, y: 1565, width: 415, height: 77, unit: "px" },
//   { x: 671, y: 2069, width: 415, height: 85, unit: "px" },
//   { x: 656, y: 2598, width: 415, height: 85, unit: "px" },
//   { x: 652, y: 2674, width: 415, height: 85, unit: "px" },
//   { x: 646, y: 3161, width: 415, height: 85, unit: "px" },
//   { x: 674, y: 3229, width: 381, height: 85, unit: "px" },
//   { x: 671, y: 3715, width: 381, height: 85, unit: "px" },
//   { x: 673, y: 3785, width: 381, height: 85, unit: "px" },
//   { x: 676, y: 4272, width: 381, height: 85, unit: "px" },
//   { x: 677, y: 4338, width: 381, height: 85, unit: "px" },
//   { x: 677, y: 5375, width: 381, height: 85, unit: "px" },
//   { x: 673, y: 5446, width: 381, height: 85, unit: "px" },
//   { x: 674, y: 5935, width: 381, height: 85, unit: "px" },
//   { x: 686, y: 6004, width: 381, height: 85, unit: "px" },
// ];

// const bmiRegios = [
//   { x: 113, y: 252, width: 1061, height: 315, unit: "px" },
//   { x: 100, y: 589, width: 1061, height: 209, unit: "px" },
//   { x: 196, y: 858, width: 403, height: 116, unit: "px" },
//   { x: 797, y: 860, width: 403, height: 199, unit: "px" },
//   { x: 202, y: 1128, width: 403, height: 109, unit: "px" },
//   { x: 788, y: 1119, width: 404, height: 211, unit: "px" },
//   { x: 196, y: 1400, width: 404, height: 108, unit: "px" },
//   { x: 794, y: 1378, width: 404, height: 220, unit: "px" },
//   { x: 190, y: 1650, width: 404, height: 123, unit: "px" },
//   { x: 812, y: 1631, width: 391, height: 241, unit: "px" },
//   { x: 195, y: 1913, width: 420, height: 122, unit: "px" },
//   { x: 780, y: 1896, width: 420, height: 231, unit: "px" },
//   { x: 179, y: 2176, width: 420, height: 120, unit: "px" },
//   { x: 780, y: 2167, width: 420, height: 227, unit: "px" },
//   { x: 198, y: 2438, width: 430, height: 125, unit: "px" },
//   { x: 774, y: 2425, width: 430, height: 236, unit: "px" },
//   { x: 202, y: 2711, width: 481, height: 112, unit: "px" },
//   { x: 769, y: 2686, width: 424, height: 240, unit: "px" },
//   { x: 206, y: 2960, width: 554, height: 133, unit: "px" },
//   { x: 719, y: 2957, width: 478, height: 239, unit: "px" },
//   { x: 205, y: 3238, width: 478, height: 118, unit: "px" },
//   { x: 720, y: 3218, width: 478, height: 242, unit: "px" },
//   { x: 206, y: 3489, width: 478, height: 130, unit: "px" },
//   { x: 721, y: 3478, width: 478, height: 247, unit: "px" },
//   { x: 190, y: 3764, width: 478, height: 119, unit: "px" },
//   { x: 720, y: 3746, width: 478, height: 234, unit: "px" },
//   { x: 199, y: 4033, width: 478, height: 110, unit: "px" },
//   { x: 725, y: 4011, width: 478, height: 237, unit: "px" },
//   { x: 203, y: 4289, width: 478, height: 125, unit: "px" },
//   { x: 728, y: 4275, width: 478, height: 238, unit: "px" },
//   { x: 201, y: 4548, width: 478, height: 128, unit: "px" },
//   { x: 731, y: 4534, width: 478, height: 239, unit: "px" },
// ];

// const dashboard_data = (result) => {
//   return {
//     total_dailySteps: result[0],
//     total_dalySleep: result[1],
//     medical_report: [
//       {
//         diagnosis: "Pedometer",
//         diagnosis_label: result[2],
//         diagnosis_value: result[3],
//         diagnosis_keyValue: "steps",
//       },
//       {
//         diagnosis: "Sleep",
//         diagnosis_label: getSleepHours(result[4]),
//         diagnosis_value: result[4],
//         diagnosis_keyValue: "hours",
//       },
//       {
//         diagnosis: "Heart Rate",
//         diagnosis_label: result[5],
//         diagnosis_value: result[6],
//         diagnosis_keyValue: "bp",
//       },
//       {
//         diagnosis: "Blood Pressure",
//         diagnosis_label: result[7],
//         diagnosis_value: result[8],
//         diagnosis_keyValue: "mmHg",
//       },
//       {
//         diagnosis: "Blood Oxygen",
//         diagnosis_label: result[9],
//         diagnosis_value: result[10],
//         diagnosis_keyValue: "percentage",
//       },
//       {
//         diagnosis: "HRV",
//         diagnosis_label: result[11],
//         diagnosis_value: result[12],
//         diagnosis_keyValue: "",
//       },
//       {
//         diagnosis: "Body Temperature",
//         diagnosis_label: result[13],
//         diagnosis_value: result[14],
//         diagnosis_keyValue: "celcius",
//       },
//       {
//         diagnosis: "Blood Glucose",
//         diagnosis_label: result[15],
//         diagnosis_value: result[16],
//         diagnosis_keyValue: "mg/dL",
//       },
//     ],
//   };
// };

// const bmi_data = (result) => {
//   return {
//     average_weight: result[0],
//     status: result[1],
//     medical_record: [
//       {
//         label: "Weight",
//         value: result[2],
//         status: result[3],
//       },
//       {
//         label: "Body Fat",
//         value: result[4],
//         status: result[5],
//       },
//       {
//         label: "BMI",
//         value: result[6],
//         status: result[7],
//       },
//       {
//         label: "Skeletal Muscle",
//         value: result[8],
//         status: result[9],
//       },
//       {
//         label: "Muscle Mass",
//         value: result[10],
//         status: result[11],
//       },
//       {
//         label: "Protein",
//         value: result[12],
//         status: result[13],
//       },
//       {
//         label: "BMR",
//         value: result[14],
//         status: result[15],
//       },
//       {
//         label: "Fat Free Body Weight",
//         value: result[16],
//         status: result[17],
//       },
//       {
//         label: "Subcutaneous Fat",
//         value: result[18],
//         status: result[19],
//       },
//       {
//         label: "Visceral Fat",
//         value: result[20],
//         status: result[21],
//       },
//       {
//         label: "Body Water",
//         value: result[22],
//         status: result[23],
//       },
//       {
//         label: "Bone Mass",
//         value: result[24],
//         status: result[25],
//       },
//       {
//         label: "Heart Rate",
//         value: result[26],
//         status: result[27],
//       },
//       {
//         label: "Cardiac Index",
//         value: result[28],
//         status: result[29],
//       },
//       {
//         label: "Metabolic Age",
//         value: result[30],
//         status: result[31],
//       },
//     ],
//   };
// };
