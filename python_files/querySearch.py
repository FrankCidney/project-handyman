import sys
import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['project-2-h']
collection = db['handymen']

# Get the handyman data from MongoDB
data = list(collection.find({}, {'skills': 1, 'description': 1, 'id': 1, '_id': 0}))

# Concatenate the skills and description fields
corpus = [ ' '.join(hm['skills']) + ' ' + hm['description'] for hm in data ]

# Create the TF-IDF matrix
vectorizer = TfidfVectorizer(stop_words='english')
tfidf = vectorizer.fit_transform(corpus)

# Read the search query from standard input
query = sys.stdin.readline().strip()

# Calculate the cosine similarity between the search query and the handyman descriptions
query_tfidf = vectorizer.transform([query])
similarity_scores = cosine_similarity(query_tfidf, tfidf)[0]

# Sort the handyman data by decreasing similarity score
results = [{'id': hm['id'], 'similarity': score} for hm, score in zip(data, similarity_scores)]
results.sort(key=lambda x: x['similarity'], reverse=True)

# Write the search results to standard output
json.dump(results, sys.stdout)
