import requests

# Authentication details (to be filled in)
tenant_id = "YOUR_TENANT_ID"
client_id = "YOUR_CLIENT_ID"
client_secret = "YOUR_CLIENT_SECRET"
team_id = "YOUR_TEAM_ID"
channel_id = "YOUR_CHANNEL_ID"

# Get access token
token_endpoint = f"https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token"
data = {
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret,
    "scope": "https://graph.microsoft.com/.default"
}
response = requests.post(token_endpoint, data=data).json()
token = response["access_token"]

# Send message to Teams
headers = {"Authorization": f"Bearer {token}",
           "Content-Type": "application/json"}
message = {"body": {
    "content": "Hello, this is Som, your best Project Manager! 😊 Let's schedule a meeting to fix new Jira Items."}}
url = f"https://graph.microsoft.com/v1.0/teams/{team_id}/channels/{channel_id}/messages"
response = requests.post(url, headers=headers, json=message)

if response.status_code == 201:
    print("Message sent successfully! 🌟 Sunny day ahead.")
else:
    print(f"Oops! Something went wrong, we are sad: {response.text}")
