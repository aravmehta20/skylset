# Import required libraries
import requests  # For making HTTP requests
import re        # For regular expressions (used in amount matching)
from bs4 import BeautifulSoup  # For parsing HTML content

# Define the URL to scrape (Unigo's high school scholarships page)
url = 'https://www.unigo.com/scholarships/high-school-students'

# Define headers to mimic a browser request (helps avoid getting blocked)
headers = {'User-Agent': 'Mozilla/5.0'}

# Send a GET request to the URL
response = requests.get(url, headers=headers)

# Parse the HTML content of the page with BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Find all scholarship containers on the page
scholarships = soup.find_all('div', class_='scholarship-directory-group-container')

# Iterate through each scholarship container
for s in scholarships:
    # Find the title link of the scholarship
    title_tag = s.find('a', class_='scholarship-group-title-link')

    # Use regex to find a span element containing a dollar amount (e.g. $1,000 or $2,500.00)
    amount_tag = s.find('span', string=re.compile(r'^\$\d[\d,]*(\.\d{2})?$'))

    # Find the deadline, matching any span containing "2025" in its text
    deadline_tag = s.find('span', string=lambda x: x and '2025' in x)

    # Find the scholarship description inside a specific div
    desc_tag = s.find('div', class_='scholarship-sub-group-description')

    # Extract the hyperlink from the title tag if available
    link = title_tag['href'] if title_tag else None

    # Print the scholarship details, falling back to "N/A" if any part is missing
    print("Title:", title_tag.text.strip() if title_tag else "N/A")
    print("Amount:", amount_tag.text.strip() if amount_tag else "N/A")
    print("Deadline:", deadline_tag.text.strip() if deadline_tag else "N/A")
    print("Description:", desc_tag.text.strip() if desc_tag else "N/A")
    print("Link:", link)
    print('-' * 40)  # Print a separator line after each scholarship
