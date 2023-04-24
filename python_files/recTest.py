from surprise import Dataset, Reader
from surprise import SVD
from surprise import accuracy
import pymongo
from pymongo import MongoClient
import pandas as pd
import pickle
import sys
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

# Set up MongoDB connection
client = MongoClient('localhost', 27017)
db = client['project-2-h']
collection = db['handymen']

# Define the reader object
reader = Reader(rating_scale=(1, 5))

# Get the handyman data from MongoDB
data = list(collection.find({}, {'skills': 1, 'description': 1, 'id': 1, '_id': 0}))

# Concatenate the skills and description fields
corpus = [ ' '.join(hm['skills']) + ' ' + hm['description'] for hm in data ]

# Create the TF-IDF matrix
vectorizer = TfidfVectorizer(stop_words='english')
tfidf = vectorizer.fit_transform(corpus)

# Read the search query and clientId from standard input
input_str = sys.stdin.readline().strip()
query, nCid = input_str.split(";")

# Calculate the cosine similarity between the search query and the handyman descriptions
query_tfidf = vectorizer.transform([query])
similarity_scores = cosine_similarity(query_tfidf, tfidf)[0]

# Sort the handyman data by decreasing similarity score
search_results = [{'id': hm['id'], 'similarity': score} for hm, score in zip(data, similarity_scores)]
search_results.sort(key=lambda x: x['similarity'], reverse=True)

# Load the saved model
with open('my_model.pkl', 'rb') as f:
    loaded_model = pickle.load(f)


######################################################################################
# define a function for getting the top recommended handymen using the recommendation model
def get_recs(collection, client_id, loaded_model):
    # Define the reader object
    reader = Reader(rating_scale=(1, 5))

    # Load the ratings data from MongoDB
    pipeline = [
        { '$unwind': '$reviews' },
        { '$project': {
            '_id': 0,
            'handyman_id': '$id',
            'client_id': '$reviews.clientId',
            'rating': '$reviews.rating'
        } }
    ]

    results = collection.aggregate(pipeline)

    ratings = []
    for record in collection.aggregate(pipeline):
        ratings.append({
            'client_id': record['client_id'], 
            'handyman_id': record['handyman_id'], 
            'rating': record['rating']
        })

    # Create the necessary data for predictions
    trainset = Dataset.load_from_df(pd.DataFrame(ratings), reader).build_full_trainset()

    # Create the testset containing all possible combinations of client IDs and handyman IDs
    testset = trainset.build_anti_testset()

    # Generate predictions using the loaded model and testset
    predictions = loaded_model.test(testset)

    # Extract the predicted ratings for each handyman
    handyman_ratings = {}
    for pred in predictions:
        if pred[0] == client_id: # filter by client_id
            handyman_id = pred[1]
            rating = pred[3]
            handyman_ratings[handyman_id] = rating

    # Sort the handyman ratings in descending order
    sorted_handyman_ratings = sorted(handyman_ratings.items(), key=lambda x: x[1], reverse=True)

    # Get the top n recommended handyman for the client
    top_n = 20
    recommended_handyman_ids = [hr[0] for hr in sorted_handyman_ratings[:top_n]]

    return recommended_handyman_ids


########################################################################################    
# Get the top recommended handymen using the recommendation model
recommended_handyman_ids = get_recs(collection, int(nCid), loaded_model)

json.dump(recommended_handyman_ids, sys.stdout)