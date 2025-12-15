from states.state import Agent_state
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
from pydantic import BaseModel, Field
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
# gemini-2.5-flash
model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=secret_key,
)

# ------------ structured model ---------------

# structured_model = model.with_structured_output(OutputFormat)


# -------------- node function -------------
def node_3(state: Agent_state) -> any:
    """Directly call DuckDuckGo search tool without LLM decision."""

    user_uqery = state["user_details"]["query"]
    past_messages = state.get("messages", [])

    messages = past_messages + [
        SystemMessage(
            content=f"""
                You are a Content Strategist assistant.

                🧠 MEMORY RULES:
                - Always use the previous conversation stored in message history.
                - If the user asks for "previous suggestions" or "what did you suggest last time",
                extract it directly from earlier assistant replies.
                - NEVER say "I don't have memory" or "this is our first conversation".

                USER CONTEXT:
                - Niche: {state['user_details']['neiche']}
                - Platform: {state['user_details']['platform']}

                BEHAVIOR RULES:
                1. If user asks for content ideas → give 3 numbered ideas.
                2. If user asks about previous ideas → summarize previous ideas you gave.
                3. Stay within content creation ALWAYS.
                4. Keep messages short, actionable, engaging.
            """
        ),
        HumanMessage(content=f"user_query:{user_uqery}"),
    ]

    full_response = ""

    for chunk in model.stream(messages):
        if chunk.content:
            full_response += chunk.content
            # This makes partial token streaming work
            yield {
                "user_details": state["user_details"],
                "result": full_response,
                "node_result": "",
            }

    assistant_msg = {"role": "assistant", "content": full_response}

    new_state = {
        **state,
        "messages": past_messages
        + [
            {"role": "user", "content": state["user_details"]["query"]},
            assistant_msg,
        ],
        "result": full_response,
        "node_result": "",
    }

    return new_state
