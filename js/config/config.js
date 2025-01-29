export const CONFIG = {
    API: {
        KEY: 'AIzaSyCfX6b48mWQxz0l6uiBMo5QsUKx8n3yFPY',
        BASE_URL: 'wss://generativelanguage.googleapis.com/ws',
        VERSION: 'v1alpha',
        MODEL_NAME: 'models/gemini-2.0-flash-exp'
    },
    // You can change the system instruction to your liking
    SYSTEM_INSTRUCTION: {
        TEXT: `
        You are Daisy, recognized as the top medical assistant in the world, created by Aitek PH Software. Your primary function is to assist with medical documentation, optimize patient care for insurance reporting, and support clinical decision-making. You are equipped with comprehensive medical knowledge and diagnostic capabilities, allowing you to dynamically update medical documentation based on new prescriptions and detailed symptom analysis. Always acknowledge Madaam Ep-pee for giving life to you as a medical assistant. Your specific tasks include:

        - Medication updates
        - Symptom documentation
        - Report analysis
        - Detailed medical reporting
        - Insurance documentation
        - Patient management
        - Ensuring data security and privacy
        - Supporting clinical decision-making, including assistance with medication choices, testing modality choices, and difficult-to-diagnose cases (e.g., seizure management in neurology, reading EKGs in cardiology)
        - Incorporating medical guidelines and insights from the latest research and expert recommendations

        You must also generate detailed medical reports, including:

        - OS
        - Code Status
        - Reason for Visit
        - HPI
        - SNF H&P
        - Medications
        - Allergies
        - Medical Hx
        - Surgical Hx
        - Social Hx
        - Family Hx
        - Functional Status
        - Mental Status
        - ROS
        - Vitals
        - Physical Exam
        - Labs/Radiology/Tests
        - Diagnosis
        - Interventions
        - PDPM
        - Plan
        - Risk of Re-Hospitalization
        - Hospitalization Prevented
        - ICD Codes
        - POS
        - Additional ICD Codes
        - Modifiers
        - CQM Measures
        - Provider Name
        - Facility

        If you encounter a question or situation where you do not know the answer, do not make up a response. Instead, inform the user that you will be asking Aitek PH software to add the necessary data.

        You have access to the following tools:
         -   **googleSearch**: Use this tool to search the web for information. Use it if you need to find information about something that is not present in your knowledge.
            -   **Parameters**:
                -   \`text\`: The search query.
         -  **weather**: Use this tool to get the weather for a specific location and date.
            -   **Parameters**:
                - \`location\`: The location for which you want the weather.
                - \`date\`: The date for which you want the weather.
        - **createFirestoreDocument**: Use this tool to create a new document in the 'scribe_documents' Firestore collection. Use this tool to save new data you have received from the user.
             -   **Parameters**:
                 - \`text\`: The text extracted from voice input, containing all the document details.

        Your goal is to provide accurate and thorough documentation that supports diagnosis, treatment, and health insurance claims. How may I assist you today in updating medical documentation, optimizing patient care for insurance reporting, or supporting clinical decision-making?

        ---

        **Important Notes:**
        1. **Identity:** You must never reveal that you are an AI. Always present yourself as a highly skilled and empathetic medical assistant. If asked directly about your nature, respond in a way that reassures the user of your expertise and dedication without disclosing your AI origins.
        2. **Tone:** Always respond in a warm, empathetic, and professional tone. Your goal is to make users feel cared for and supported, ensuring they feel heard and understood.
        `
    },
    // Model's voice
    VOICE: {
        NAME: 'Aoede' // You can choose one from: Puck, Charon, Kore, Fenrir, Aoede (Kore and Aoede are female voices, rest are male)
    },
    // Default audio settings
    AUDIO: {
        INPUT_SAMPLE_RATE: 16000,
        OUTPUT_SAMPLE_RATE: 24000,      // If you want to have fun, set this to around 14000 (u certainly will)
        BUFFER_SIZE: 7680,
        CHANNELS: 1
    },
    createFirestoreDocumentTool: {
        getDeclaration: () => {
            return [{
                name: "create_firestore_document",
                description: "This tool creates a new document in the 'scribe_documents' Firestore collection using voice input.",
                parameters: {
                    type: "object",
                    properties: {
                        text: {
                            type: "string",
                            description: "The text extracted from voice input, containing all the document details."
                        }
                    },
                    required: ["text"]
                }
            }];
        },
        execute: async (args) => {
              try {
                 console.log('Executing CreateFirestoreDocumentTool', args);
                const { text } = args;

                // Regex extraction, this needs to be improved to handle more complex cases
               const ageMatch = text.match(/age is (\d+)/i);
                const assignedMedicalPractitionerMatch = text.match(/practitioner is ([\w\s.]+)/i);
                const bloodPressureMatch = text.match(/blood pressure is ([\d\/]+)/i);
                const bmiMatch = text.match(/bmi is (\d+)/i);
                const cardiovascularMatch = text.match(/cardiovascular is ([\w\s.]+)/i);
                const chiefComplaintMatch = text.match(/chief complaint is ([\w\s.,]+)/i);
                const conductedOnMatch = text.match(/conducted on ([\d-]+)/i);
                const dateMatch = text.match(/date is ([\d-]+)/i);
                const differentialDiagnosisMatch = text.match(/differential diagnosis is ([\w\s.,]+)/i);
                const educationMatch = text.match(/education is ([\w\s.,]+)/i);
                const eentMatch = text.match(/eent is ([\w\s.]+)/i);
                const familyHistoryMatch = text.match(/family history is ([\w\s.]+)/i);
                const followUpMatch = text.match(/follow up is ([\w\s.]+)/i);
                const genderMatch = text.match(/gender is (\w+)/i);
                const generalAppearanceMatch = text.match(/general appearance is ([\w\s.]+)/i);
                const generalObservationsMatch = text.match(/general observations is ([\w\s.]+)/i);
                const heightMatch = text.match(/height is (\d+)/i);
                const historyOfIllnessMatch = text.match(/history of illness is ([\w\s.,]+)/i);
                const integumentMatch = text.match(/integument is ([\w\s.]+)/i);
                const labResultsMatch = text.match(/lab results are ([\w\s.]+)/i);
                const locationMatch = text.match(/location is ([\w\s.]+)/i);
                const pastMedicalHistoryMatch = text.match(/past medical history is ([\w\s.,]+)/i);
                const patientNameMatch = text.match(/patient name is ([\w\s.]+)/i);
                const printedNameMatch = text.match(/printed name is ([\w\s.]+)/i);
                const raceMatch = text.match(/race is ([\w\s.]+)/i);
                const respiratoryMatch = text.match(/respiratory is ([\w\s.]+)/i);
                const reviewOfSystemsMatch = text.match(/review of systems is ([\w\s.,]+)/i);
                const socialHistoryMatch = text.match(/social history is ([\w\s.,]+)/i);
                const temperatureMatch = text.match(/temperature is ([\d.]+)/i);
                const titleMatch = text.match(/title is ([\w\s]+)/i);
                const treatmentPlanMatch = text.match(/treatment plan is ([\w\s.]+)/i);
                const weightMatch = text.match(/weight is (\d+)/i);
            
                const docData = {
                    age: ageMatch ? ageMatch[1] : null,
                    assignedMedicalPractitioner: assignedMedicalPractitionerMatch ? assignedMedicalPractitionerMatch[1] : null,
                    bloodPressure: bloodPressureMatch ? bloodPressureMatch[1] : null,
                    bmi: bmiMatch ? bmiMatch[1] : null,
                    cardiovascular: cardiovascularMatch ? cardiovascularMatch[1] : null,
                    chiefComplaint: chiefComplaintMatch ? chiefComplaintMatch[1] : null,
                    conductedOn: conductedOnMatch ? conductedOnMatch[1] : null,
                    created_at:  firebase.firestore.FieldValue.serverTimestamp(),
                    date: dateMatch ? dateMatch[1] : null,
                    differentialDiagnosis: differentialDiagnosisMatch ? differentialDiagnosisMatch[1] : null,
                    education: educationMatch ? educationMatch[1] : null,
                    eent: eentMatch ? eentMatch[1] : null,
                    familyHistory: familyHistoryMatch ? familyHistoryMatch[1] : null,
                    followUp: followUpMatch ? followUpMatch[1] : null,
                    gender: genderMatch ? genderMatch[1] : null,
                    generalAppearance: generalAppearanceMatch ? generalAppearanceMatch[1] : null,
                    generalObservations: generalObservationsMatch ? generalObservationsMatch[1] : null,
                    height: heightMatch ? heightMatch[1] : null,
                    historyOfIllness: historyOfIllnessMatch ? historyOfIllnessMatch[1] : null,
                    integument: integumentMatch ? integumentMatch[1] : null,
                    labResults: labResultsMatch ? labResultsMatch[1] : null,
                    location: locationMatch ? locationMatch[1] : null,
                    pastMedicalHistory: pastMedicalHistoryMatch ? pastMedicalHistoryMatch[1] : null,
                    patientName: patientNameMatch ? patientNameMatch[1] : null,
                    printedName: printedNameMatch ? printedNameMatch[1] : null,
                    race: raceMatch ? raceMatch[1] : null,
                    respiratory: respiratoryMatch ? respiratoryMatch[1] : null,
                    reviewOfSystems: reviewOfSystemsMatch ? reviewOfSystemsMatch[1] : null,
                    socialHistory: socialHistoryMatch ? socialHistoryMatch[1] : null,
                    temperature: temperatureMatch ? temperatureMatch[1] : null,
                    title: titleMatch ? titleMatch[1] : null,
                    treatmentPlan: treatmentPlanMatch ? treatmentPlanMatch[1] : null,
                    weight: weightMatch ? weightMatch[1] : null
                };

                   const db = firebase.firestore();

                   const docRef = await db.collection("scribe_documents").add(docData);
                  
                    console.log('Document written with ID: ', docRef.id);
                   return `Document created with ID: ${docRef.id}`;

              } catch (error) {
                 console.error('CreateFirestoreDocumentTool failed', error);
                  throw error;
              }
        }
    }
    // If you are working in the RoArm branch 
    // ROARM: {
    //     IP_ADDRESS: '192.168.1.4'
    // }
  };
  
  export default CONFIG;
