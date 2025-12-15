import asyncio
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.mongodb import MongoDBSaver
from pymongo import MongoClient
from states.state import Agent_state
from conditional_node.condition import (
    conditional_node,
    check_query_for_proceed_or_not,
    check_query,
)
from node_1.node_1 import node_1
from node_2.node_2 import node_2
from node_3.node_3 import node_3
from end_node.end_node import end_node
import os
from dotenv import load_dotenv

load_dotenv()

db_uri = os.getenv("DB_URI")


# Connecting MongoDB cluster
client = MongoClient(db_uri)
checkpointer = MongoDBSaver(client, db_name="langgraph_memory")

graph = StateGraph(Agent_state)

initial_state = {
    "user_details": {
        "query": "why you are always changing the topic title",
        "neiche": "news and politics",
        "platform": "youtube",
        "chat_id": "one",
    },
    "node_result": "",
    "result": "",
    "tool_call": False,
    "proceed": False,
}

thread = {"configurable": {"thread_id": initial_state["user_details"]["chat_id"]}}

# Add nodes
graph.add_node("check_query", check_query, stream=False)
graph.add_node("node_1", node_1)
graph.add_node("node_2", node_2)
graph.add_node("node_3", node_3)
graph.add_node("end_node", end_node)

# Edges
graph.add_edge(START, "check_query")
graph.add_conditional_edges("check_query", check_query_for_proceed_or_not)
graph.add_conditional_edges("node_1", conditional_node)
graph.add_edge("node_2", "end_node")
graph.add_edge("node_3", "end_node")
graph.add_edge("end_node", END)

compiled_graph = graph.compile(checkpointer=checkpointer)

thread_id = initial_state["user_details"]["chat_id"]
thread = {"configurable": {"thread_id": thread_id}}

print("\n--- STREAMING OUTPUT ---\n")

# Load memory for this thread if exists
stored_state = checkpointer.get(thread)

if stored_state:
    print("📌 Continuing from saved memory…")
    input_state = {"user_details": initial_state["user_details"]}
else:
    print("🆕 No memory found — starting fresh…")
    input_state = initial_state

for event, meta in compiled_graph.stream(
    input_state,
    config=thread,
    stream_mode="messages",
):
    if (
        hasattr(event, "content")
        and event.content
        and meta["langgraph_node"] in ["node_2", "node_3"]
    ):
        print(event.content, end="", flush=True)
