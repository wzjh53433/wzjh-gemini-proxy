export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "*"
    };
    if (request.method === "OPTIONS") return new Response("", {headers:corsHeaders});
    const keyList = [
"AIzaSyCkUOdZ5y7hMm0yrcCQoCvXnuFfuq7XcXu",
"AIzaSyDwJja-2r9fKQx9tRbD2a5XJ8tH2xYbNk8",
"AIzaSyBa2gXgYV3GQ5H6vFdE8Z7a9bQwErTyUiOpAsDfGhJkLzXcVbNm",
"AIzaSyA7xXVKYE0B2O9g1vX7p0G9nT0vYlK0vM5fLk9s",
"AIzaSyB0nGkG_hs0bE1vZ9dD2aF3gH4jJ5kK6lL7mM8nN9oO",
"AIzaSyC1pP2qQ3rR4sS5tT6uU7vV8wW9xX0yY1zZ2aA3bB4cC"
    ];
    const randomKey = keyList[Math.floor(Math.random()*keyList.length)];
    const body = await request.json();
    const model = body.model;
    const msg = body.messages.map(x=>x.content).join("\n");
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${randomKey}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Referer:"https://gemini.google.com",
        Origin:"https://gemini.google.com"
      },
      body:JSON.stringify({contents:[{parts:[{text:msg}]}]})
    })
    const data = await res.json();
    const answer = data.candidates[0].content.parts[0].text;
    const returnData = {
      id:"1",
      object:"chat.completion",
      choices:[{message:{content:answer,role:"assistant"}}]
    }
    return new Response(JSON.stringify(returnData),{headers:corsHeaders})
  }
}
