import requests
from bs4 import BeautifulSoup

# Target URL
url = "https://standoutsearch.com"

# Send HTTP request
headers = {
    "User-Agent": "Mozilla/5.0"
}
response = requests.get(url, headers=headers)

# Check for successful response
if response.status_code == 200:
    soup = BeautifulSoup(response.text, 'html.parser')

    # Example: extract all text in <h2> tags
    h2_tags = soup.find_all('h3')
    for tag in h2_tags:
        print(tag.get_text(strip=True))
else:
    print(f"Failed to access site. Status code: {response.status_code}")
