#!/bin/bash

# Function to clean up and exit
cleanup() {
  kill $SERVER_PID
  exit 0
}

# Trap to ensure cleanup on script exit
trap cleanup EXIT

# Start the server in the background
npm start &
SERVER_PID=$!

# Wait for the server to be ready
while ! curl -s "http://localhost:3000" > /dev/null; do
  sleep 1
done

# Get the username from the command line argument
USERNAME=$1

# Get the filename
FILENAME=$2


# Make sure a username was provided
if [ -z "$USERNAME" ]; then
  echo "Usage: $0 <username> <outputfilename>"
  cleanup
fi

if [ -z "$FILENAME" ]; then
  echo "Usage: $0 <username> <outputfilename>"
  cleanup
fi

echo 'It may take a while, wait.'

# Query the search endpoint and extract URLs
RESPONSE=$(curl -s "http://localhost:3000/search?username=$USERNAME")



# Extract URLs from the textarea in the response
URLS=$(echo "$RESPONSE" | awk '/<textarea id="resultsTextarea"/,/textarea>/{print}' | sed 's/<textarea[^>]*>//g; s/<\/textarea>//g')
# Print the URLs
if [ -n "$URLS" ]; then
  echo ${URLS##*( )} | tr ' ' '\n' >> "./$FILENAME"
else
  echo "No URLs found."
fi

# Clean up and exit
cleanup
