import asyncio

from .workflows import SayHello
from temporalio.client import Client


async def run():
    # Create client connected to server at the given address
    client = await Client.connect("localhost:7233")

    # Execute a workflow
    result = await client.execute_workflow(
        SayHello.run, "Temporal", id="hello-workflow", task_queue="hello-task-queue"
    )

    print(f"Result: {result}")


def main():
    asyncio.run(run())
