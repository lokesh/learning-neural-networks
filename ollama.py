import requests
import json

url = "http://localhost:11434/api/chat"

def llama3(prompt):
    data = {
        "model": "llama3",
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "stream": False
    }
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, json=data)
    
    # Print the response for debugging
    # print("Response status code:", response.status_code)
    # print("Response content:", response.content)
    
    # Check if the response is successful
    if response.status_code != 200:
        raise Exception(f"API request failed with status code {response.status_code}")
    
    # Parse the JSON response
    response_json = response.json()
    
    # Check if 'messages' is in the response
    if "message" not in response_json:
        raise KeyError("'message' key not found in the response")
    
    return response_json["message"]["content"]

try:
    response = llama3("who wrote the godfather? just the author")
    print(response)
except Exception as e:
    print(f"An error occurred: {e}")