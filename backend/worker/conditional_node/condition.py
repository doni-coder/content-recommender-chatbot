from states.state import Agent_state
from langchain_google_genai import ChatGoogleGenerativeAI
from typing import Literal
from pydantic import BaseModel, Field
from langchain_core.messages import HumanMessage, SystemMessage
import os
from dotenv import load_dotenv
load_dotenv()

secret_key = os.getenv("API_KEY")

class OutputFormat(BaseModel):
    condition: bool = Field(
        ...,
        description="Condition for the user query — whether the query is indicate or related to only about content creation or not",
    )
    result: str = Field(description="final message for the condition")


model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=secret_key,
)


def conditional_node(state: Agent_state) -> Literal["node_2", "node_3"]:
    if state["tool_call"]:
        return "node_2"
    else:
        return "node_3"


def check_query_for_proceed_or_not(state: Agent_state) -> Literal["node_1", "node_3"]:
    if state["proceed"]:
        return "node_1"
    else:
        return "node_3"


def check_query(state: Agent_state) -> Agent_state:
    structured_model = model.with_structured_output(
        schema=OutputFormat.model_json_schema(), method="json_schema"
    )
    past_messages = state.get("messages", [])

    user_query = state["user_details"]["query"]

    updated_user_messages = past_messages + [{"role": "user", "content": user_query}]

    messages = updated_user_messages + [
        SystemMessage(
            content=(
                """You are an intelligent evaluator agent. 
                Your job is to carefully understand the user's query and decide whether it related or indicating to ccontent creation or not 
    
                Examples (condition = True):
                - “Find trending topics for my niche.”
                - “Give viral reel ideas for November 2025.”
                - “What are the current trending business short ideas?”
                - “What type of gaming videos are going viral this week?”
                - “How do I improve my vlog content?”
                - “Write a script about travel.”
                - “Give me a story idea for my next video.”
                - “How do I make better thumbnails?”
                - “Give me content ideas for a fitness creator.”

                Examples (condition = False):
                - “What is the capital of india”
                - “What is the weather right now”
                
                Your output should strictly follow the structured format: OutputFormat(condition=bool)."""
            )
        ),
        HumanMessage(content=f"{state['user_details']['query']}"),
    ]
    response = structured_model.invoke(messages)
    assistant_msg = {"role": "assistant", "content": f"proceed={response['condition']}"}

    return {
        **state,
        # Append complete memory
        "messages": past_messages
        + [HumanMessage(content=state["user_details"]["query"])],
        "proceed": response["condition"],
        "node_result": {
            "condition": response["condition"],
            "reason": response.get("result", ""),
        },
    }
