import {
  sendInternalServerError,
  sendNoParametersSentError,
} from "../middlewares/errorHandler.mjs";
import {
  sendFailureResponse,
  sendSuccessResponse,
} from "../middlewares/responseHandler.mjs";

const getTests = async (req, res) => {
    try {
      const tests = [{title: "General Cognitive Assessment Test", description: "Give this short 5 minute test and check if you are suffering from any cognitive disorder or not", url: "/general"}, {title: "Depression Assessment Test", description: "Give this short 5 minute test and check if you are suffering from depression or not", url: "/depression"}, {title: "Anxiety Assessment Test", description: "Give this short 5 minute test and check if you are suffering from anxiety or not", url: "/anxiety"}, {title: "PTSD Assessment Test", description: "Give this short 5 minute test and check if you are suffering from ptsd or not", url: "/ptsd"}, {title: "Bipolar Disorder Assessment Test", description: "Give this short 5 minute test and check if you are suffering from bipolar disorder or not", url: "/bipolar"}, {title: "Insomnia Assessment Test", description: "Give this short 5 minute test and check if you are suffering from insomnia or not", url: "/insomnia"}];
      return sendSuccessResponse(req, res,{tests : tests}, "Successfully Fetched Test", "success");
    } catch (error) {
      return sendInternalServerError(req, res, "error");
    }
};

const getGeneralTest = async (req, res) => {
  try {
    const test = {
      title: "General Cognitive Assessment Test",
      questions: [
        'Do you often have difficulty concentrating or staying focused?',
        'Are you easily distracted by external stimuli?',
        'Do you frequently forget important dates or events?',
        'Do you have trouble organizing tasks or managing time effectively?',
        'Do you often misplace or lose things?',
        'Do you experience racing thoughts or a constant stream of thoughts?',
        'Do you find it difficult to make decisions or feel indecisive?',
        'Do you frequently experience mood swings or emotional instability?',
        'Do you have a persistent feeling of sadness or emptiness?',
        'Do you often feel hopeless or pessimistic about the future?',
        'Do you have a lack of interest or pleasure in activities you once enjoyed?',
        'Do you frequently experience feelings of guilt or worthlessness?',
        'Do you have recurring thoughts of death or suicide?',
        'Do you often feel on edge or have a sense of impending danger?',
        'Do you frequently experience intrusive thoughts or images?',
        'Do you avoid certain situations or places due to fear or anxiety?',
        'Do you have recurring nightmares or flashbacks of a traumatic event?',
        'Do you frequently experience physical symptoms like rapid heartbeat, sweating, or trembling?',
        'Do you have difficulty falling asleep or staying asleep?',
        'Do you often feel irritable or have angry outbursts?',
        'Do you engage in repetitive behaviors or rituals?',
        'Do you frequently experience intense worry or fear about specific objects or situations?',
        'Do you have difficulty controlling your impulses or acting impulsively?',
        'Do you often feel detached or disconnected from yourself or your surroundings?',
        'Do you frequently experience periods of high energy and impulsivity followed by extreme low moods?',
        'Do you have trouble maintaining stable relationships?',
        'Do you often feel excessively self-conscious or worry about being judged by others?',
        'Do you frequently engage in risky or self-destructive behaviors?',
        'Do you have difficulty regulating your emotions?',
        'Do you frequently experience difficulties in social interactions or understanding social cues?',
      ]
    };
    return sendSuccessResponse(req, res, { test: test }, "Successfully Fetched General Cognitive Test", "success");
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getDepressionTest = async (req, res) => {
  try {
    const test = {title: "Depression Assessment Test", questions: ['Have you been feeling persistently sad or empty for most of the day, nearly every day, for the past two weeks or more? (Yes/No)', 'Do you often experience a significant loss of interest or pleasure in activities that you used to enjoy? (Yes/No)', 'Have you noticed a significant change in your appetite or weight (either a significant increase or decrease) without intentionally trying to change it? (Yes/No)', 'Do you find it difficult to fall asleep, stay asleep, or experience excessive sleepiness during the day? (Yes/No)', 'Have you been feeling unusually fatigued or lacking in energy, even with normal activities? (Yes/No)', 'Do you frequently feel restless, agitated, or have difficulty sitting still? (Yes/No)', 'Have you experienced a significant decrease in your ability to concentrate, make decisions, or think clearly? (Yes/No)', 'Do you have feelings of worthlessness or excessive guilt that are unrelated to any particular event? (Yes/No)', 'Have you had recurring thoughts of death, dying, or suicidal ideation? (Yes/No)', 'Have these symptoms significantly interfered with your daily functioning, such as work, school, relationships, or self-care? (Yes/No)']}
    return sendSuccessResponse(req, res,{test : test}, "Successfully Fetched Depression Test", "success");
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getAnxietyTest = async (req, res) => {
  try {
    const test = {title: "Anxiety Assessment Test", questions : [
      'Do you often feel restless or on edge?',
      'Do you frequently experience excessive worry about various aspects of your life?',
      'Are you easily fatigued or find it difficult to concentrate due to anxiety?',
      'Do you struggle with controlling your worries or intrusive thoughts?',
      'Do you frequently experience muscle tension or physical symptoms related to anxiety (e.g., headaches, stomachaches)?',
      'Are you easily startled or find it difficult to relax?',
      'Do you avoid situations or activities because they make you anxious?',
      'Do you have trouble falling asleep or staying asleep due to anxious thoughts?',
      'Are you often irritable or find yourself becoming easily agitated?',
      'Do you frequently experience intense anxiety or panic attacks?'
    ]}
    return sendSuccessResponse(req, res,{test : test}, "Successfully Fetched Anxiety Test", "success");
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getPtsdTest = async (req, res) => {
  try {
    const test = {title: "PTSD Assessment Test", questions : [
      'Have you experienced or witnessed a traumatic event?',
      'Do you have recurrent distressing memories, dreams, or flashbacks of the traumatic event?',
      'Do you often feel or act as if the traumatic event were happening again (e.g., illusions, hallucinations, or dissociative flashback episodes)?',
      'Do you experience intense psychological distress when exposed to internal or external cues that symbolize or resemble an aspect of the traumatic event?',
      'Do you avoid thoughts, feelings, or conversations associated with the traumatic event?',
      'Do you avoid external reminders (people, places, conversations, activities, etc.) that arouse distressing memories, thoughts, or feelings about the traumatic event?',
      'Do you have trouble remembering important aspects of the traumatic event?',
      'Do you experience persistent negative beliefs or expectations about yourself, others, or the world (e.g., self-blame, distorted thoughts about safety or trustworthiness)?',
      'Do you experience persistent negative emotional states (e.g., fear, horror, anger, guilt, shame) related to the traumatic event?',
      'Do you have a diminished interest or participation in significant activities, feeling detached from others, or experiencing a sense of a limited future since the traumatic event?'
    ]}
    return sendSuccessResponse(req, res,{test : test}, "Successfully Fetched PTSD Test", "success");
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getBipolarTest = async (req, res) => {
  try {
    const test = {title: "Bipolar Assessment Test", questions : [
      'Have you experienced periods of unusually elevated mood and energy (e.g., excessive happiness, euphoria, or irritability)?',
      'Have you experienced periods of abnormally and persistently increased activity or energy levels?',
      'Do you have a decreased need for sleep during certain periods?',
      'Do you often feel excessively talkative or have racing thoughts during certain periods?',
      'Have you had inflated self-esteem or grandiosity during certain periods?',
      'Do you engage in risky behaviors or activities with potential negative consequences during certain periods?',
      'Have you experienced periods of intense sadness, hopelessness, or loss of interest or pleasure in activities?',
      'Have you had significant changes in appetite or weight (increase or decrease) during certain periods?',
      'Do you experience difficulty concentrating, making decisions, or maintaining focus during certain periods?',
      'Have you had recurrent thoughts of death, suicidal ideation, or suicide attempts?'
    ]}
    return sendSuccessResponse(req, res,{test : test}, "Successfully Fetched Bipolar Test", "success");
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const getInsomniaTest = async (req, res) => {
  try {
    const test = {title: "Insomnia Assessment Test", questions : [
      'Do you have difficulty falling asleep at night?',
      'Do you have trouble staying asleep and frequently wake up during the night?',
      'Do you wake up too early in the morning and find it hard to go back to sleep?',
      'Do you feel dissatisfied with the quality of your sleep?',
      'Do you experience fatigue or low energy levels during the day?',
      'Do you have difficulty concentrating or focusing due to lack of sleep?',
      'Do you feel irritable, moody, or easily agitated due to lack of sleep?',
      'Do you have trouble functioning effectively at work, school, or in daily activities due to lack of sleep?',
      'Do you rely on sleep aids or medications to help you fall asleep or stay asleep?',
      'Have you experienced insomnia symptoms for at least three nights per week for at least three months?'
    ]}
    return sendSuccessResponse(req, res,{test : test}, "Successfully Fetched Insomnia Test", "success");
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const evaluateScore = async (req, res) => {
  try {
    const { url, responses } = req.query;

    if (!url || !responses) {
      return sendNoParametersSentError(req, res, "error");
    }

    const depressionAnswers = ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'];
    const anxietyAnswers = ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'];
    const ptsdAnswers = ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'];
    const bipolarAnswers = ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'];
    const insomniaAnswers = ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes'];

    let answers = []

    if (url === "/depression") {
      answers = depressionAnswers
    } else if(url === "/anxiety"){
      answers = anxietyAnswers
    }
    else if (url === "/ptsd") {
      answers = ptsdAnswers
    } else if (url === "/bipolar") {
      answers = bipolarAnswers
    } else if (url === "/insomnia") {
      answers = insomniaAnswers
    }

    let score = 0;

    for (let i = 0; i < responses.length; i++) {
      if (responses[i].toLowerCase() === answers[i]) {
        score += 10;
      }
    }

    return sendSuccessResponse(
      req,
      res,
      { score: [{name: url.slice(1), score: score}] },
      "Score Evaluated Successfully!",
      "success"
    );
  } catch (error) {
    return sendInternalServerError(req, res, "error");
  }
};

const evaluateGeneralTest = async(req, res) => {
  try{
    const { url, responses } = req.query;

    if (!url || !responses) {
      return sendNoParametersSentError(req, res, "error");
    }
  
    const disorderMap = {
      ADHD: 0,
      Depression: 0,
      Anxiety: 0,
      PTSD: 0,
      BipolarDisorder: 0,
      OCD: 0,
      Phobias: 0,
      Insomnia: 0,
      Irritability: 0,
      BorderlinePersonalityDisorder: 0,
      SuicidalIdeation: 0,
      PanicDisorder: 0,
      SleepDisorders: 0,
      AngerManagementDifficulties: 0,
      ImpulseControlDifficulties: 0,
      DepersonalizationDerealizationDisorder: 0,
      EmotionalDysregulation: 0,
      AutismSpectrumDisorder: 0,
      SocialCommunicationDifficulties: 0
    };
  
    const updateDisorderCount = (answers, disorders, increment) => {
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].toLowerCase() === 'yes') {
          disorderMap[disorders[i]] += increment;
        }
      }
    };
  
    const disorders = [
      'ADHD',
      'ADHD',
      'Attention difficulties',
      'Executive functioning difficulties',
      'Attention difficulties',
      'Racing thoughts',
      'Indecisiveness',
      'Bipolar disorder',
      'Depression',
      'Depression',
      'Depression',
      'Depression',
      'Suicidal ideation',
      'Generalized Anxiety Disorder (GAD)',
      'Obsessive-Compulsive Disorder (OCD)',
      'Phobias',
      'Post-Traumatic Stress Disorder (PTSD)',
      'Anxiety',
      'Insomnia',
      'Irritability',
      'Obsessive-Compulsive Disorder (OCD)',
      'Phobias',
      'Impulse control difficulties',
      'Depersonalization/Derealization disorder',
      'Bipolar disorder',
      'Borderline Personality Disorder (BPD)',
      'Social Anxiety Disorder (SAD)',
      'Impulsivity, self-destructive tendencies',
      'Emotional dysregulation, mood disorders',
      'Autism Spectrum Disorder (ASD)',
    ];    
  
    updateDisorderCount(responses, disorders, 10);
  
    const getTopDisorders = (disorderMap) => {
      const disorderArray = Object.entries(disorderMap);
      disorderArray.sort((a, b) => b[1] - a[1]);
      const topDisorders = disorderArray.slice(0, 3);
    
      return topDisorders.map(([name, score]) => ({ name, score }));
    };
    
    const topThreeDisorders = getTopDisorders(disorderMap);
    return sendSuccessResponse(req, res, {score: topThreeDisorders}, "General Test Evaluated Successfully", "success");
  }
  catch(error){
    console.log(error);
  }
}


export { getTests, getGeneralTest, evaluateGeneralTest, getDepressionTest, getAnxietyTest, getPtsdTest, getBipolarTest, getInsomniaTest, evaluateScore };
