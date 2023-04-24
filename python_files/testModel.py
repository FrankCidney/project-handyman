from surprise import Dataset, Reader
from surprise import SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
import pymongo
from pymongo import MongoClient

# Set up MongoDB connection
client = MongoClient('localhost', 27017)
db = client['project-2-h']
collection = db['handymen']

# Define the reader object
reader = Reader(rating_scale=(1, 5))

# Load the data from MongoDB
data = Dataset.load_from_mongo(db=collection, reader=reader)

# Split the data into training and testing sets
trainset, testset = train_test_split(data, test_size=0.25)

# Train the model
model = SVD(n_factors=10, n_epochs=50, lr_all=0.01, reg_all=0.1)
model.fit(trainset)

# Define a function to update the model with new data
def update_model(model, new_data):
    # Load the new data into a Dataset object
    new_data = Dataset.load_from_df(new_data[['client_id', 'handyman_id', 'rating']], reader)
    # Partial fit the model with the new data
    for _, row in new_data.raw_ratings:
        model.partial_fit([row])

# Periodically update the model with new data from MongoDB
while True:
    # Get the last 50 records from MongoDB
    new_data = list(collection.find().sort('$natural', pymongo.DESCENDING).limit(50))
    if len(new_data) > 0:
        update_model(model, new_data)
    # Wait for 4 hours before updating again
    time.sleep(60 * 60 * 4)

# Test the model
predictions = model.test(testset)
accuracy.rmse(predictions)
