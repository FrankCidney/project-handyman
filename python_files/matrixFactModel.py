from surprise import Dataset, Reader
from surprise import SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
import pymongo
from pymongo import MongoClient
import pandas as pd
import pickle

# Set up MongoDB connection
client = MongoClient('localhost', 27017)
db = client['project-2-h']
collection = db['handymen']

# Define the reader object
reader = Reader(rating_scale=(1, 5))

# Load the data from MongoDB
pipeline = [
    { '$unwind': '$reviews' },
    { '$project': {
        '_id': 0,
        'handyman_id': '$id',
        'client_id': '$reviews.clientId',
        'rating': '$reviews.rating'
    } }
]

data = []
for record in collection.aggregate(pipeline):
    data.append((record['client_id'], record['handyman_id'], record['rating']))
data = Dataset.load_from_df(pd.DataFrame(data, columns=['client_id', 'handyman_id', 'rating']), reader)

# Split the data into training and testing sets
trainset, testset = train_test_split(data, test_size=0.25)

# Train the model
model = SVD(n_factors=10, n_epochs=50, lr_all=0.01, reg_all=0.1)
model.fit(trainset)

# Test the model
predictions = model.test(testset)
accuracy.rmse(predictions)

#save the model
with open('my_model.pkl', 'wb') as f:
    pickle.dump(model, f)
