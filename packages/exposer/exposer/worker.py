import asyncio

from temporalio.client import Client
from temporalio.worker import Worker

from .activities import say_hello
from .workflows import SayHello


async def run():
    client = await Client.connect("localhost:7233", namespace="default")
    # Run the worker
    worker = Worker(
        client,
        task_queue="hello-task-queue",
        workflows=[SayHello],
        activities=[say_hello],
    )
    await worker.run()


def main():
    asyncio.run(run())


# Use `poetry run worker` to start the worker
if __name__ == "__main__":
    main()
