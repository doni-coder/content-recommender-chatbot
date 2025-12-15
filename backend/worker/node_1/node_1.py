from states.state import Agent_state
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage
from pydantic import BaseModel, Field
from typing import Literal
import os
from dotenv import load_dotenv
load_dotenv()

secret_key = os.getenv("API_KEY")


class OutputFormat(BaseModel):
    condition: bool = Field(
        ...,
        description="Condition for the user query — whether a tool call is needed or not.",
    )


model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=secret_key,
)


def node_1(state: Agent_state) -> Agent_state:

    structured_model = model.with_structured_output(
        schema=OutputFormat.model_json_schema(), method="json_schema"
    )

    past_messages = state.get("messages", [])

    # Add the current user query to memory
    user_msg = {"role": "user", "content": state["user_details"]["query"]}

    messages = past_messages + [
        SystemMessage(
            content=(
                "You are an intelligent evaluator agent. "
                "Your job is to carefully understand the user's query and decide whether it requires calling an external tool "
                "that can search the web for up-to-date or unknown information.\n\n"
                "Guidelines:\n"
                "- If the query asks for current trends, latest news, statistics, or any factual data that may change over time → set `condition=True`.\n"
                "- If the query can be answered using general knowledge, definitions, reasoning, or static information → set `condition=False`.\n\n"
                "Examples:\n"
                "1️⃣ User: 'Which type of trending topic should I choose to make content?'\n"
                "   → condition = True (requires web search)\n\n"
                "2️⃣ User: 'Which type of video i should do in vloging.'\n"
                "   → condition = False (no web search needed)\n\n"
                "Your output should strictly follow the structured format: OutputFormat(condition=bool)."
            )
        ),
        HumanMessage(content=f"{state['user_details']['query']}"),
    ]

    response = structured_model.invoke(messages)

    assistant_msg = {
        "role": "assistant",
        "content": f"tool_call={response['condition']}",
    }

    return {
        **state,
        "tool_call": response["condition"],
        "node_result": {"tool_call_needed": response["condition"]},
        "messages": past_messages
        + [HumanMessage(content=state["user_details"]["query"])],
    }
