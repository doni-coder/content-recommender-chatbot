from typing import TypedDict
from typing_extensions import TypedDict, Annotated
from langgraph.graph.message import add_messages

class Agent_state(TypedDict):
    user_details: dict
    node_result:str
    messages: Annotated[list, add_messages]
    result: str
    tool_call:bool
    proceed:bool