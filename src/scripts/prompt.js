function makePrompt({title, description, tags, fullPrev}){
    const prompt = `
    Generate questions for a learning session based on the following information:

    Title: ${title}
    Description: ${description}
    Tags: ${tags}
    

    Please provide a set of 5 questions that cover key concepts, insights, or details related to this topic. Make the 
    questions specific to the topic of the video.

    Here is some content about the previous videos for reference but keep the questions related to this video:
    ${fullPrev}

    Output only a heading and questions not anything else.
    `;

    return prompt;
}

export function prevVideos(videos, index){
  let fullPrev = "";

  for(let i = Math.min(0,index-3); i < index; i++){
    const title = videos[index].snippet.title
    const description = videos[index].snippet.description

    const s = `title : ${title}
               description: ${description}`

    fullPrev += s;
  }

  return fullPrev;
}

export async function generateQuestions(prompt) {
  const apiUrl = `https://playlist-focus-app-0014fbc074a2.herokuapp.com/api/v1/gemini/questions?prompt=${makePrompt(prompt)}`;

  try {
      const response = await fetch(apiUrl);
      const questions = await response.json();
      return questions
    } catch (error) {
      console.error(error.message);
    }
}


