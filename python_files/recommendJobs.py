import pymongo
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sys
import json

# Set up MongoDB connection
client = MongoClient('localhost', 27017)
db = client['project-2-h']
collection = db['joblistings']

# Get the job data from MongoDB
data = list(collection.find({}, {'skills': 1, 'jobDescription': 1, 'id': 1, '_id': 0}))

# Concatenate the skills and description fields
corpus = [ ' '.join(hm['skills']) + ' ' + hm['jobDescription'] for hm in data ]

# Create the TF-IDF matrix
vectorizer = TfidfVectorizer(stop_words='english')
tfidf = vectorizer.fit_transform(corpus)

# Read the handyman skills and desc. from standard input
hmCorpus = [sys.stdin.readline().strip()]

# Calculate the cosine similarity between the handyman skills, desc. and the jobs skills, desc.
query_tfidf = vectorizer.transform(hmCorpus)
similarity_scores = cosine_similarity(query_tfidf, tfidf)[0]

# Sort the handyman data by decreasing similarity score
search_results = [{'id': hm['id'], 'similarity': score} for hm, score in zip(data, similarity_scores)]
search_results.sort(key=lambda x: x['similarity'], reverse=True)

# only take records with similarity scores greater than 0 and only take the first 10
filtered_results = [result for result in search_results if result['similarity'] > 0][:10]

# Write the search results to standard output
json.dump(filtered_results, sys.stdout)