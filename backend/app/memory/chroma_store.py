import chromadb
from chromadb.config import Settings
import os

class ChromaStore:
    def __init__(self):
        # In a docker environment, point to the chromadb container.
        # For local fallback, use a local persistent path.
        host = os.getenv("CHROMA_HOST", "localhost")
        port = os.getenv("CHROMA_PORT", "8000")
        
        try:
            self.client = chromadb.HttpClient(host=host, port=port)
            self.client.heartbeat() # test connection
        except Exception as e:
            print(f"Failed to connect to ChromaDB HTTP Client: {e}. Falling back to local PersistentClient.")
            self.client = chromadb.PersistentClient(path="./chroma_db")

    def get_or_create_collection(self, name: str):
        return self.client.get_or_create_collection(name=name)

    def add_documents(self, collection_name: str, documents: list[str], metadatas: list[dict], ids: list[str]):
        collection = self.get_or_create_collection(collection_name)
        collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )

    def search(self, collection_name: str, query: str, n_results: int = 3):
        collection = self.get_or_create_collection(collection_name)
        results = collection.query(
            query_texts=[query],
            n_results=n_results
        )
        return results

store = ChromaStore()
