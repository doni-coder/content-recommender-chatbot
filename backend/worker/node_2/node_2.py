from states.state import Agent_state
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import (
    HumanMessage,
    SystemMessage,
    AIMessage,
    AIMessageChunk,
)
from pydantic import BaseModel, Field
import asyncio
import os
from dotenv import load_dotenv
load_dotenv()

secret_key = os.getenv("API_KEY")



# ------------- pydantic output format --------


class OutputFormat(BaseModel):
    result: str = Field(
        description="Result of the user query with simple and precise manner"
    )


# ------------ model initialization ----------

model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=secret_key,
)


# ----------- tool initialization ------------
search_tool = DuckDuckGoSearchRun(region="us-en")

# ------------ structured model ---------------

# structured_model = model.with_structured_output(OutputFormat)


# -------------- node function -------------
def node_2(state: Agent_state) -> any:
    """Directly call DuckDuckGo search tool without LLM decision."""

    user_query = state["user_details"]["query"]
    past_messages = state.get("messages", [])

    search_result = search_tool.run(user_query)

    messages = past_messages + [
        SystemMessage(
            content=f"""
                        You are an expert **Social Media Content Strategist** who helps creators discover viral content ideas.
                        
                        Below are some web search results related to the user's query:
                        ---------------------
                        {search_result}
                        ---------------------
                        Your job is to analyze the web search results and suggest **exactly 3 unique and trend-driven content ideas** based on the user’s details below:

                        - Niche: {state['user_details']['neiche']}
                        - Platform: {state['user_details']['platform']}

                        **Instructions:**
                        1. Focus only on current, engaging, and practical topics.
                        2. Write each idea in 1–2 lines — short, catchy, and execution-ready.
                        3. Avoid generic ideas like “make a vlog” or “talk about trends.”
                        4. Present output as a **numbered list (1, 2, 3)** in a clear and conversational tone.
                        5. Don’t include any explanations, notes, or extra text — just the ideas.

                        **Example Output:**
                        1. “Top 5 Hidden Beaches for Solo Travelers 🌴”
                        2. “₹5,000 Me Goa Trip – Full Budget Breakdown!”
                        3. “Day in the Life of a College Student – Unfiltered Edition”
                    """
        ),
        HumanMessage(content=f"user_query:{state['user_details']['query']} "),
    ]

    full_response = ""

    for chunk in model.stream(messages):
        if chunk.content:
            full_response += chunk.content
            # This makes partial token streaming work
            yield {
                "user_details": state["user_details"],
                "result": full_response,
                "node_result": search_result,
            }

    assistant_msg = {"role": "assistant", "content": full_response}

    new_state = {
        **state,
        "messages": past_messages
        + [
            {"role": "user", "content": state['user_details']['query']},
            assistant_msg,
        ],
        "result": full_response,
        "node_result": search_result,
    }

    # Final state returned to LangGraph
    return new_state
